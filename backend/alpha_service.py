"""
Alpha Vantage API service with rate limiting and error handling
"""

import httpx
import asyncio
import time
from typing import Optional, Dict, Any, List
from datetime import datetime, date, timedelta
import logging
from dataclasses import dataclass
import os
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

@dataclass
class RateLimit:
    calls_per_minute: int = 5
    last_reset: float = 0
    call_count: int = 0

class AlphaVantageService:
    def __init__(self):
        self.api_key = os.getenv("ALPHAVANTAGE_API_KEY")
        if not self.api_key:
            logger.warning("ALPHAVANTAGE_API_KEY not found. API calls will be mocked.")
            self.api_key = "MOCK_KEY"
        
        self.base_url = "https://www.alphavantage.co/query"
        self.rate_limit = RateLimit()
        self.client = httpx.AsyncClient(timeout=30.0)
        
    async def __aenter__(self):
        return self
        
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        await self.client.aclose()
    
    async def _check_rate_limit(self):
        """Check and enforce rate limiting"""
        now = time.time()
        
        # Reset counter if a minute has passed
        if now - self.rate_limit.last_reset >= 60:
            self.rate_limit.call_count = 0
            self.rate_limit.last_reset = now
        
        # If we've hit the limit, wait
        if self.rate_limit.call_count >= self.rate_limit.calls_per_minute:
            wait_time = 60 - (now - self.rate_limit.last_reset)
            if wait_time > 0:
                logger.warning(f"Rate limit reached. Waiting {wait_time:.2f} seconds...")
                await asyncio.sleep(wait_time)
                self.rate_limit.call_count = 0
                self.rate_limit.last_reset = time.time()
        
        self.rate_limit.call_count += 1
    
    def _get_mock_data(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """Return mock data when API key is not available"""
        function = params.get("function", "")
        symbol = params.get("symbol", "AAPL")
        
        if function == "TIME_SERIES_DAILY_ADJUSTED":
            return {
                "Time Series (Daily)": {
                    "2024-01-15": {
                        "1. open": "150.00",
                        "2. high": "155.00",
                        "3. low": "149.00",
                        "4. close": "154.00",
                        "5. adjusted close": "154.00",
                        "6. volume": "1000000",
                        "7. dividend amount": "0.00"
                    }
                }
            }
        elif function == "OVERVIEW":
            return {
                "Symbol": symbol,
                "Name": f"Mock Company {symbol}",
                "Sector": "Technology",
                "Industry": "Software",
                "Currency": "USD"
            }
        elif function == "TIME_SERIES_MONTHLY_ADJUSTED":
            return {
                "Monthly Adjusted Time Series": {
                    "2024-01-15": {
                        "1. open": "150.00",
                        "2. high": "155.00",
                        "3. low": "149.00",
                        "4. close": "154.00",
                        "5. adjusted close": "154.00",
                        "6. volume": "1000000",
                        "7. dividend amount": "0.50"
                    }
                }
            }
        else:
            return {"Error Message": "Mock data not available for this function"}
    
    async def _make_request(self, params: Dict[str, Any], max_retries: int = 3) -> Dict[str, Any]:
        """Make API request with retry logic and rate limiting"""
        await self._check_rate_limit()
        
        # If using mock key, return mock data
        if self.api_key == "MOCK_KEY":
            return self._get_mock_data(params)
        
        params["apikey"] = self.api_key
        
        for attempt in range(max_retries):
            try:
                response = await self.client.get(self.base_url, params=params)
                response.raise_for_status()
                
                data = response.json()
                
                # Check for API errors
                if "Error Message" in data:
                    raise ValueError(f"Alpha Vantage API Error: {data['Error Message']}")
                
                if "Note" in data:
                    raise ValueError(f"Alpha Vantage API Note: {data['Note']}")
                
                if "Information" in data:
                    raise ValueError(f"Alpha Vantage API Information: {data['Information']}")
                
                return data
                
            except httpx.HTTPStatusError as e:
                if e.response.status_code == 429:  # Rate limited
                    wait_time = (2 ** attempt) * 60  # Exponential backoff
                    logger.warning(f"Rate limited. Waiting {wait_time} seconds before retry {attempt + 1}")
                    await asyncio.sleep(wait_time)
                    continue
                else:
                    logger.error(f"HTTP error {e.response.status_code}: {e.response.text}")
                    raise
                    
            except httpx.RequestError as e:
                logger.error(f"Request error: {e}")
                if attempt == max_retries - 1:
                    raise
                await asyncio.sleep(2 ** attempt)  # Exponential backoff
                
            except Exception as e:
                logger.error(f"Unexpected error: {e}")
                if attempt == max_retries - 1:
                    raise
                await asyncio.sleep(2 ** attempt)
        
        raise Exception("Max retries exceeded")
    
    async def get_daily_adjusted(self, symbol: str, outputsize: str = "full") -> Dict[str, Any]:
        """Get daily adjusted time series data"""
        params = {
            "function": "TIME_SERIES_DAILY_ADJUSTED",
            "symbol": symbol,
            "outputsize": outputsize
        }
        
        try:
            data = await self._make_request(params)
            time_series = data.get("Time Series (Daily)", {})
            
            if not time_series:
                raise ValueError(f"No time series data found for {symbol}")
            
            return time_series
            
        except Exception as e:
            logger.error(f"Failed to get daily adjusted data for {symbol}: {e}")
            raise
    
    async def get_company_overview(self, symbol: str) -> Dict[str, Any]:
        """Get company overview information"""
        params = {
            "function": "OVERVIEW",
            "symbol": symbol
        }
        
        try:
            data = await self._make_request(params)
            
            if not data or "Symbol" not in data:
                raise ValueError(f"No company data found for {symbol}")
            
            return data
            
        except Exception as e:
            logger.error(f"Failed to get company overview for {symbol}: {e}")
            raise
    
    async def get_dividend_data(self, symbol: str) -> Dict[str, Any]:
        """Get dividend data for a symbol"""
        params = {
            "function": "TIME_SERIES_MONTHLY_ADJUSTED",
            "symbol": symbol
        }
        
        try:
            data = await self._make_request(params)
            time_series = data.get("Monthly Adjusted Time Series", {})
            
            if not time_series:
                raise ValueError(f"No dividend data found for {symbol}")
            
            return time_series
            
        except Exception as e:
            logger.error(f"Failed to get dividend data for {symbol}: {e}")
            raise
    
    def parse_daily_data(self, time_series: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Parse daily time series data into structured format"""
        parsed_data = []
        
        for date_str, values in time_series.items():
            try:
                parsed_date = datetime.strptime(date_str, "%Y-%m-%d").date()
                
                parsed_data.append({
                    "date": parsed_date,
                    "adj_close": float(values.get("5. adjusted close", 0)),
                    "dividend": float(values.get("7. dividend amount", 0)),
                    "volume": int(values.get("6. volume", 0)) if values.get("6. volume") else None
                })
            except (ValueError, TypeError) as e:
                logger.warning(f"Failed to parse data for date {date_str}: {e}")
                continue
        
        # Sort by date
        parsed_data.sort(key=lambda x: x["date"])
        return parsed_data
    
    def parse_monthly_data(self, time_series: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Parse monthly time series data for dividend information"""
        parsed_data = []
        
        for date_str, values in time_series.items():
            try:
                parsed_date = datetime.strptime(date_str, "%Y-%m-%d").date()
                
                parsed_data.append({
                    "date": parsed_date,
                    "adj_close": float(values.get("5. adjusted close", 0)),
                    "dividend": float(values.get("7. dividend amount", 0)),
                    "volume": int(values.get("6. volume", 0)) if values.get("6. volume") else None
                })
            except (ValueError, TypeError) as e:
                logger.warning(f"Failed to parse monthly data for date {date_str}: {e}")
                continue
        
        # Sort by date
        parsed_data.sort(key=lambda x: x["date"])
        return parsed_data
    
    async def get_historical_price(self, symbol: str, target_date: date) -> Optional[float]:
        """Get historical price for a specific date, handling weekends/holidays"""
        try:
            time_series = await self.get_daily_adjusted(symbol)
            parsed_data = self.parse_daily_data(time_series)
            
            # Find the closest trading day to target_date
            # Look for dates within 5 days of target_date
            for days_offset in range(6):  # 0 to 5 days
                for offset in [0, -1, 1, -2, 2, -3, 3, -4, 4, -5, 5]:
                    check_date = target_date + timedelta(days=offset)
                    
                    for data_point in parsed_data:
                        if data_point["date"] == check_date:
                            return data_point["adj_close"]
            
            # If no exact match, return the closest available date
            if parsed_data:
                # Find the closest date
                closest_data = min(parsed_data, 
                                 key=lambda x: abs((x["date"] - target_date).days))
                logger.warning(f"No exact price for {symbol} on {target_date}, using {closest_data['date']}")
                return closest_data["adj_close"]
            
            return None
            
        except Exception as e:
            logger.error(f"Failed to get historical price for {symbol} on {target_date}: {e}")
            return None
    
    async def get_latest_price(self, symbol: str) -> Optional[float]:
        """Get the latest available price for a symbol"""
        try:
            time_series = await self.get_daily_adjusted(symbol)
            parsed_data = self.parse_daily_data(time_series)
            
            if parsed_data:
                return parsed_data[-1]["adj_close"]  # Latest price
            
            return None
            
        except Exception as e:
            logger.error(f"Failed to get latest price for {symbol}: {e}")
            return None
    
    async def get_dividend_history(self, symbol: str, start_date: date) -> List[Dict[str, Any]]:
        """Get dividend history since start_date"""
        try:
            time_series = await self.get_dividend_data(symbol)
            parsed_data = self.parse_monthly_data(time_series)
            
            # Filter dividends since start_date
            dividends = []
            for data_point in parsed_data:
                if data_point["date"] >= start_date and data_point["dividend"] > 0:
                    dividends.append(data_point)
            
            return dividends
            
        except Exception as e:
            logger.error(f"Failed to get dividend history for {symbol} since {start_date}: {e}")
            return []
    
    async def validate_ticker(self, symbol: str) -> bool:
        """Validate if a ticker symbol exists and is valid"""
        try:
            await self.get_company_overview(symbol)
            return True
        except Exception as e:
            logger.warning(f"Ticker validation failed for {symbol}: {e}")
            return False