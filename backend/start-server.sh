#!/bin/bash

echo "🚀 Starting PE Dashboard Backend..."

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "�� Creating virtual environment..."
    python3 -m venv venv
fi

# Install dependencies
echo "�� Installing dependencies..."
./venv/bin/python -m pip install -r requirements.txt

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "⚙️ Creating .env file..."
    cat > .env << 'ENVEOF'
# Alpha Vantage API Configuration
ALPHAVANTAGE_API_KEY=your_alpha_vantage_api_key_here
API_RATE_LIMIT=5

# Database Configuration
DATABASE_URL=sqlite:///./pe_dashboard.db

# JWT Configuration
SECRET_KEY=your-secret-key-here-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
ENVEOF
    echo "⚠️  Please update the .env file with your Alpha Vantage API key!"
fi

# Start the server
echo "🌐 Starting FastAPI server on http://localhost:8000"
echo "📊 API documentation available at http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

./venv/bin/python -c "
import uvicorn
uvicorn.run('main:app', host='0.0.0.0', port=8000, reload=True)
"
