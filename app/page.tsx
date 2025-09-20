"use client"

import { useState } from "react"
import PortfolioTab from "./tabs/portfolio-tab"
import DealsTab from "./tabs/deals-tab"
import PerformanceTab from "./tabs/performance-tab"
import AnalyticsTab from "./tabs/analytics-tab"
import ReportsTab from "./tabs/reports-tab"
import DataIngestion from "./components/data-ingestion"

const tabs = [
  { id: "portfolio", label: "Portfolio Overview", component: PortfolioTab },
  { id: "deals", label: "Deal Pipeline", component: DealsTab },
  { id: "performance", label: "Performance", component: PerformanceTab },
  { id: "analytics", label: "Analytics", component: AnalyticsTab },
  { id: "reports", label: "Reports", component: ReportsTab },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("portfolio")

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component || PortfolioTab

  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#ffffff",
      fontFamily: "system-ui, -apple-system, sans-serif",
    },
    header: {
      borderBottom: "1px solid #d1d5db",
      backgroundColor: "#ecfeff",
      padding: "1rem 1.5rem",
    },
    headerContent: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    title: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#164e63",
      margin: 0,
    },
    subtitle: {
      fontSize: "0.875rem",
      color: "#374151",
      margin: "0.25rem 0 0 0",
    },
    headerRight: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
    },
    aumContainer: {
      textAlign: "right" as const,
    },
    aumLabel: {
      fontSize: "0.875rem",
      fontWeight: "500",
      color: "#164e63",
      margin: 0,
    },
    aumValue: {
      fontSize: "1.125rem",
      fontWeight: "bold",
      color: "#164e63",
      margin: 0,
    },
    avatar: {
      height: "2rem",
      width: "2rem",
      borderRadius: "50%",
      backgroundColor: "#164e63",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#ffffff",
      fontSize: "0.75rem",
      fontWeight: "500",
    },
    nav: {
      borderBottom: "1px solid #d1d5db",
      backgroundColor: "#ecfeff",
      padding: "0 1.5rem",
    },
    navTabs: {
      display: "flex",
      gap: "2rem",
    },
    tab: {
      padding: "1rem 0.25rem",
      borderBottom: "2px solid transparent",
      fontWeight: "500",
      fontSize: "0.875rem",
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      transition: "all 0.2s",
    },
    activeTab: {
      borderBottomColor: "#164e63",
      color: "#164e63",
    },
    inactiveTab: {
      color: "#374151",
    },
    main: {
      padding: "1.5rem",
    },
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div>
            <h1 style={styles.title}>Private Equity Dashboard</h1>
            <p style={styles.subtitle}>Fund Management & Investment Analytics</p>
          </div>
          <div style={styles.headerRight}>
            <div style={styles.aumContainer}>
              <p style={styles.aumLabel}>Total AUM</p>
              <p style={styles.aumValue}>$2.4B</p>
            </div>
            <div style={styles.avatar}>
              <span>JD</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav style={styles.nav}>
        <div style={styles.navTabs}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                ...styles.tab,
                ...(activeTab === tab.id ? styles.activeTab : styles.inactiveTab),
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.color = "#164e63"
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.color = "#374151"
                }
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main style={styles.main}>
        <DataIngestion onDataIngested={() => window.location.reload()} />
        <ActiveComponent />
      </main>
    </div>
  )
}
