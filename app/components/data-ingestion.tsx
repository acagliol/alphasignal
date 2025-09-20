"use client"

import { useState } from "react"
import { api, sampleCompanies, CompanyIngest } from "../lib/api"

interface DataIngestionProps {
  onDataIngested?: () => void
}

export default function DataIngestion({ onDataIngested }: DataIngestionProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleIngestSampleData = async () => {
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await api.ingestCompanies(sampleCompanies)
      
      if (response.success) {
        setResult(`Successfully processed ${response.companies_processed} companies. ${response.companies_failed} failed.`)
        if (response.errors.length > 0) {
          setResult(prev => prev + ` Errors: ${response.errors.join(', ')}`)
        }
        onDataIngested?.()
      } else {
        setError(`Failed to process companies: ${response.message}`)
      }
    } catch (err) {
      setError(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCustomIngest = async (companies: CompanyIngest[]) => {
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await api.ingestCompanies(companies)
      
      if (response.success) {
        setResult(`Successfully processed ${response.companies_processed} companies. ${response.companies_failed} failed.`)
        if (response.errors.length > 0) {
          setResult(prev => prev + ` Errors: ${response.errors.join(', ')}`)
        }
        onDataIngested?.()
      } else {
        setError(`Failed to process companies: ${response.message}`)
      }
    } catch (err) {
      setError(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{
      backgroundColor: "#ecfeff",
      borderRadius: "0.5rem",
      border: "1px solid #d1d5db",
      padding: "1.5rem",
      marginBottom: "1.5rem"
    }}>
      <h3 style={{
        fontSize: "1.125rem",
        fontWeight: "600",
        color: "#164e63",
        marginBottom: "1rem",
        margin: 0
      }}>
        Data Ingestion
      </h3>
      
      <p style={{
        fontSize: "0.875rem",
        color: "#374151",
        marginBottom: "1.5rem",
        margin: 0
      }}>
        Ingest sample portfolio data to populate the dashboard with real Alpha Vantage market data.
      </p>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <button
          onClick={handleIngestSampleData}
          disabled={isLoading}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: isLoading ? "#9ca3af" : "#164e63",
            color: "white",
            border: "none",
            borderRadius: "0.375rem",
            cursor: isLoading ? "not-allowed" : "pointer",
            fontSize: "0.875rem",
            fontWeight: "500"
          }}
        >
          {isLoading ? "Processing..." : "Ingest Sample Data"}
        </button>
      </div>

      {result && (
        <div style={{
          padding: "0.75rem",
          backgroundColor: "#d1fae5",
          border: "1px solid #10b981",
          borderRadius: "0.375rem",
          marginBottom: "1rem"
        }}>
          <p style={{ margin: 0, fontSize: "0.875rem", color: "#065f46" }}>
            {result}
          </p>
        </div>
      )}

      {error && (
        <div style={{
          padding: "0.75rem",
          backgroundColor: "#fee2e2",
          border: "1px solid #ef4444",
          borderRadius: "0.375rem",
          marginBottom: "1rem"
        }}>
          <p style={{ margin: 0, fontSize: "0.875rem", color: "#991b1b" }}>
            {error}
          </p>
        </div>
      )}

      <div style={{
        fontSize: "0.75rem",
        color: "#6b7280",
        marginTop: "1rem"
      }}>
        <p style={{ margin: 0, marginBottom: "0.5rem" }}>
          <strong>Sample Data Includes:</strong>
        </p>
        <ul style={{ margin: 0, paddingLeft: "1rem" }}>
          <li>Microsoft Corp (MSFT) - $1M invested on 2018-01-02</li>
          <li>Johnson & Johnson (JNJ) - $750K invested on 2019-03-01</li>
          <li>JPMorgan Chase (JPM) - $500K invested on 2020-06-15</li>
        </ul>
        <p style={{ margin: "0.5rem 0 0 0" }}>
          <strong>Note:</strong> You need a valid Alpha Vantage API key in the backend .env file.
        </p>
      </div>
    </div>
  )
}