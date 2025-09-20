/**
 * API client for PE Dashboard backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface CompanyIngest {
  name: string;
  ticker: string;
  sector: string;
  currency: string;
  invest_date: string;
  invest_amount: number;
}

export interface IngestResult {
  success: boolean;
  message: string;
  companies_processed: number;
  companies_failed: number;
  errors: string[];
}

export interface DealKPIs {
  deal_id: number;
  company_name: string;
  ticker: string;
  invest_date: string;
  invest_amount: number;
  current_value: number;
  shares: number;
  current_price: number;
  irr: number | null;
  moic: number | null;
  dpi: number | null;
  tvpi: number | null;
  rvpi: number | null;
  total_distributions: number;
  unrealized_gain: number;
  realized_gain: number;
  as_of_date: string;
}

export interface PortfolioKPIs {
  total_invested: number;
  total_current_value: number;
  total_distributions: number;
  portfolio_irr: number | null;
  portfolio_moic: number | null;
  portfolio_dpi: number | null;
  portfolio_tvpi: number | null;
  portfolio_rvpi: number | null;
  total_unrealized_gain: number;
  total_realized_gain: number;
  active_deals: number;
  realized_deals: number;
  as_of_date: string;
}

export interface SectorAnalytics {
  sector: string;
  deal_count: number;
  total_invested: number;
  total_current_value: number;
  avg_irr: number | null;
  avg_moic: number | null;
  total_distributions: number;
  unrealized_gain: number;
  realized_gain: number;
}

export interface Deal {
  id: number;
  company_id: number;
  invest_date: string;
  invest_amount: number;
  shares: number;
  nav_latest: number | null;
  status: string;
  created_at: string;
  updated_at: string | null;
  company?: {
    id: number;
    name: string;
    ticker: string;
    sector: string;
    currency: string;
  };
}

export interface Report {
  id: number;
  title: string;
  description: string;
  report_type: string;
  generated_at: string;
  file_path?: string;
}

class PEDashboardAPI {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, { ...defaultOptions, ...options });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.detail || 
          errorData.message || 
          `HTTP error! status: ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Data Ingestion
  async ingestCompanies(companies: CompanyIngest[]): Promise<IngestResult> {
    return this.request<IngestResult>('/api/v1/ingest/companies', {
      method: 'POST',
      body: JSON.stringify(companies),
    });
  }

  // Core Data Access
  async getDeals(skip: number = 0, limit: number = 100): Promise<Deal[]> {
    return this.request<Deal[]>(`/api/v1/deals?skip=${skip}&limit=${limit}`);
  }

  async getDealKPIs(dealId: number, asOfDate?: string): Promise<DealKPIs> {
    const params = asOfDate ? `?as_of=${asOfDate}` : '';
    return this.request<DealKPIs>(`/api/v1/deals/${dealId}/kpis${params}`);
  }

  async getPortfolioKPIs(asOfDate?: string): Promise<PortfolioKPIs> {
    const params = asOfDate ? `?as_of=${asOfDate}` : '';
    return this.request<PortfolioKPIs>(`/api/v1/portfolio/kpis${params}`);
  }

  async getSectorAnalytics(asOfDate?: string): Promise<SectorAnalytics[]> {
    const params = asOfDate ? `?as_of=${asOfDate}` : '';
    return this.request<SectorAnalytics[]>(`/api/v1/analytics/sectors${params}`);
  }

  async getRecentReports(): Promise<Report[]> {
    return this.request<Report[]>('/api/v1/reports/recent');
  }

  // Data Refresh
  async refreshMarketData(tickers: string[]): Promise<{
    success: boolean;
    updated_tickers: string[];
    errors: string[];
  }> {
    return this.request('/api/v1/refresh/market-data', {
      method: 'POST',
      body: JSON.stringify(tickers),
    });
  }

  async refreshDeal(dealId: number): Promise<{
    success: boolean;
    message: string;
  }> {
    return this.request(`/api/v1/refresh/deal/${dealId}`, {
      method: 'POST',
    });
  }

  // Health Check
  async healthCheck(): Promise<{ status: string; version: string }> {
    return this.request('/health');
  }
}

// Export singleton instance
export const api = new PEDashboardAPI();

// Export sample data for testing
export const sampleCompanies: CompanyIngest[] = [
  {
    name: "Microsoft Corp",
    ticker: "MSFT",
    sector: "Technology",
    currency: "USD",
    invest_date: "2018-01-02",
    invest_amount: 1000000
  },
  {
    name: "Johnson & Johnson",
    ticker: "JNJ",
    sector: "Healthcare",
    currency: "USD",
    invest_date: "2019-03-01",
    invest_amount: 750000
  },
  {
    name: "JPMorgan Chase",
    ticker: "JPM",
    sector: "Financials",
    currency: "USD",
    invest_date: "2020-06-15",
    invest_amount: 500000
  }
];