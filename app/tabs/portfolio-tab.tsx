"use client"

const portfolioData = [
  { month: "Jan", value: 2100, growth: 5.2 },
  { month: "Feb", value: 2180, growth: 3.8 },
  { month: "Mar", value: 2250, growth: 3.2 },
  { month: "Apr", value: 2320, growth: 3.1 },
  { month: "May", value: 2380, growth: 2.6 },
  { month: "Jun", value: 2400, growth: 0.8 },
]

const allocationData = [
  { name: "Technology", value: 35, amount: 840 },
  { name: "Healthcare", value: 25, amount: 600 },
  { name: "Financial Services", value: 20, amount: 480 },
  { name: "Consumer Goods", value: 12, amount: 288 },
  { name: "Energy", value: 8, amount: 192 },
]

const COLORS = ["#164e63", "#166534", "#ea580c", "#475569", "#f97316"]

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1.5rem",
  },
  metricsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1.5rem",
  },
  chartsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: "1.5rem",
  },
  card: {
    backgroundColor: "#ecfeff",
    borderRadius: "0.5rem",
    border: "1px solid #d1d5db",
    padding: "1.5rem",
  },
  cardTitle: {
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#374151",
    marginBottom: "0.5rem",
    margin: 0,
  },
  cardValue: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#164e63",
    margin: 0,
  },
  cardChange: {
    fontSize: "0.875rem",
    fontWeight: "500",
    margin: 0,
  },
  positiveChange: {
    color: "#166534",
  },
  negativeChange: {
    color: "#ea580c",
  },
  neutralChange: {
    color: "#374151",
  },
  chartTitle: {
    fontSize: "1.125rem",
    fontWeight: "600",
    color: "#164e63",
    marginBottom: "1rem",
    margin: 0,
  },
  chartContainer: {
    height: "320px",
    position: "relative" as const,
  },
  lineChart: {
    display: "flex",
    alignItems: "end",
    height: "250px",
    gap: "1rem",
    padding: "1rem 0",
    borderBottom: "2px solid #d1d5db",
    borderLeft: "2px solid #d1d5db",
  },
  chartBar: {
    flex: 1,
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "0.5rem",
  },
  chartPoint: {
    width: "8px",
    height: "8px",
    backgroundColor: "#164e63",
    borderRadius: "50%",
    position: "relative" as const,
  },
  chartLine: {
    width: "2px",
    backgroundColor: "#164e63",
  },
  chartLabel: {
    fontSize: "0.75rem",
    color: "#374151",
    fontWeight: "500",
  },
  pieChart: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1rem",
  },
  pieItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  pieColor: {
    width: "16px",
    height: "16px",
    borderRadius: "2px",
  },
  pieBar: {
    height: "20px",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 0.5rem",
    color: "white",
    fontSize: "0.75rem",
    fontWeight: "500",
    minWidth: "120px",
  },
  companyRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem 0",
    borderBottom: "1px solid #d1d5db",
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontWeight: "500",
    color: "#164e63",
    margin: 0,
  },
  companySector: {
    fontSize: "0.875rem",
    color: "#374151",
    margin: "0.25rem 0 0 0",
  },
  companyMetrics: {
    display: "flex",
    gap: "2rem",
    textAlign: "right" as const,
  },
  metricLabel: {
    fontSize: "0.875rem",
    color: "#374151",
    margin: 0,
  },
  metricValue: {
    fontWeight: "500",
    color: "#164e63",
    margin: 0,
  },
  irrValue: {
    fontWeight: "500",
    color: "#166534",
    margin: 0,
  },
}

function MetricCard({
  title,
  value,
  change,
  changeType,
}: {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
}) {
  const changeStyle =
    changeType === "positive"
      ? styles.positiveChange
      : changeType === "negative"
        ? styles.negativeChange
        : styles.neutralChange

  return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>{title}</h3>
      <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
        <span style={styles.cardValue}>{value}</span>
        <span style={{ ...styles.cardChange, ...changeStyle }}>{change}</span>
      </div>
    </div>
  )
}

function CustomLineChart({ data }: { data: typeof portfolioData }) {
  const maxValue = Math.max(...data.map((d) => d.value))
  const minValue = Math.min(...data.map((d) => d.value))
  const range = maxValue - minValue

  return (
    <div style={styles.lineChart}>
      {data.map((item, index) => {
        const height = ((item.value - minValue) / range) * 200 + 20
        return (
          <div key={item.month} style={styles.chartBar}>
            <div style={{ ...styles.chartLine, height: `${height}px` }} />
            <div style={styles.chartPoint} />
            <span style={styles.chartLabel}>{item.month}</span>
            <span style={{ ...styles.chartLabel, fontSize: "0.625rem" }}>${(item.value / 1000).toFixed(1)}B</span>
          </div>
        )
      })}
    </div>
  )
}

function CustomPieChart({ data }: { data: typeof allocationData }) {
  return (
    <div style={styles.pieChart}>
      {data.map((item, index) => (
        <div key={item.name} style={styles.pieItem}>
          <div style={{ ...styles.pieColor, backgroundColor: COLORS[index] }} />
          <div style={{ flex: 1 }}>
            <div style={{ ...styles.pieBar, backgroundColor: COLORS[index], width: `${item.value * 3}%` }}>
              <span>{item.name}</span>
              <span>{item.value}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function PortfolioCompany({
  name,
  sector,
  investment,
  currentValue,
  irr,
}: {
  name: string
  sector: string
  investment: string
  currentValue: string
  irr: string
}) {
  return (
    <div style={styles.companyRow}>
      <div style={styles.companyInfo}>
        <h4 style={styles.companyName}>{name}</h4>
        <p style={styles.companySector}>{sector}</p>
      </div>
      <div style={styles.companyMetrics}>
        <div>
          <p style={styles.metricLabel}>Investment</p>
          <p style={styles.metricValue}>{investment}</p>
        </div>
        <div>
          <p style={styles.metricLabel}>Current Value</p>
          <p style={styles.metricValue}>{currentValue}</p>
        </div>
        <div>
          <p style={styles.metricLabel}>IRR</p>
          <p style={styles.irrValue}>{irr}</p>
        </div>
      </div>
    </div>
  )
}

export default function PortfolioTab() {
  return (
    <div style={styles.container}>
      {/* Key Metrics */}
      <div style={styles.metricsGrid}>
        <MetricCard title="Total Portfolio Value" value="$2.4B" change="+3.2%" changeType="positive" />
        <MetricCard title="Unrealized Gains" value="$480M" change="+12.5%" changeType="positive" />
        <MetricCard title="Portfolio IRR" value="18.7%" change="+0.3%" changeType="positive" />
        <MetricCard title="Active Investments" value="23" change="+2" changeType="positive" />
      </div>

      <div style={styles.chartsGrid}>
        {/* Portfolio Value Trend */}
        <div style={styles.card}>
          <h3 style={styles.chartTitle}>Portfolio Value Trend</h3>
          <div style={styles.chartContainer}>
            <CustomLineChart data={portfolioData} />
          </div>
        </div>

        {/* Sector Allocation */}
        <div style={styles.card}>
          <h3 style={styles.chartTitle}>Sector Allocation</h3>
          <div style={styles.chartContainer}>
            <CustomPieChart data={allocationData} />
          </div>
        </div>
      </div>

      {/* Portfolio Companies */}
      <div style={styles.card}>
        <h3 style={styles.chartTitle}>Top Portfolio Companies</h3>
        <div>
          <PortfolioCompany
            name="TechCorp Solutions"
            sector="Technology"
            investment="$85M"
            currentValue="$142M"
            irr="24.3%"
          />
          <PortfolioCompany
            name="HealthTech Innovations"
            sector="Healthcare"
            investment="$65M"
            currentValue="$98M"
            irr="19.8%"
          />
          <PortfolioCompany
            name="FinServ Partners"
            sector="Financial Services"
            investment="$120M"
            currentValue="$165M"
            irr="16.2%"
          />
          <PortfolioCompany
            name="Consumer Brands Co"
            sector="Consumer Goods"
            investment="$45M"
            currentValue="$58M"
            irr="13.7%"
          />
          <PortfolioCompany
            name="Energy Solutions Ltd"
            sector="Energy"
            investment="$75M"
            currentValue="$89M"
            irr="8.9%"
          />
        </div>
      </div>
    </div>
  )
}
