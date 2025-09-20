"use client"

const performanceData = [
  { quarter: "Q1 2022", fundValue: 1800, benchmark: 1750, irr: 15.2 },
  { quarter: "Q2 2022", fundValue: 1920, benchmark: 1820, irr: 16.8 },
  { quarter: "Q3 2022", fundValue: 1850, benchmark: 1780, irr: 14.9 },
  { quarter: "Q4 2022", fundValue: 2100, benchmark: 1950, irr: 18.3 },
  { quarter: "Q1 2023", fundValue: 2180, benchmark: 2020, irr: 19.1 },
  { quarter: "Q2 2023", fundValue: 2250, benchmark: 2080, irr: 19.7 },
  { quarter: "Q3 2023", fundValue: 2320, benchmark: 2140, irr: 20.2 },
  { quarter: "Q4 2023", fundValue: 2400, benchmark: 2200, irr: 18.7 },
]

const fundComparison = [
  { fund: "Fund I", vintage: 2018, irr: 22.4, multiple: 2.8, status: "Realized" },
  { fund: "Fund II", vintage: 2020, irr: 19.8, multiple: 2.1, status: "Partially Realized" },
  { fund: "Fund III", vintage: 2022, irr: 18.7, multiple: 1.4, status: "Active" },
  { fund: "Fund IV", vintage: 2024, irr: 12.3, multiple: 1.1, status: "Active" },
]

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
  dualLineChart: {
    display: "flex",
    alignItems: "end",
    height: "250px",
    gap: "1rem",
    padding: "1rem 0",
    borderBottom: "2px solid #d1d5db",
    borderLeft: "2px solid #d1d5db",
    position: "relative" as const,
  },
  chartColumn: {
    flex: 1,
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "0.5rem",
    position: "relative" as const,
  },
  fundLine: {
    width: "3px",
    backgroundColor: "#164e63",
    borderRadius: "2px",
  },
  benchmarkLine: {
    width: "2px",
    backgroundColor: "#166534",
    borderRadius: "1px",
    position: "absolute" as const,
    right: "8px",
  },
  areaChart: {
    display: "flex",
    alignItems: "end",
    height: "250px",
    gap: "0.5rem",
    padding: "1rem 0",
    borderBottom: "2px solid #d1d5db",
    borderLeft: "2px solid #d1d5db",
  },
  areaBar: {
    flex: 1,
    backgroundColor: "#164e63",
    borderRadius: "2px 2px 0 0",
    opacity: 0.7,
    display: "flex",
    alignItems: "end",
    justifyContent: "center",
    color: "white",
    fontSize: "0.625rem",
    fontWeight: "500",
    padding: "0.25rem",
  },
  fundRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
    gap: "1rem",
    padding: "1rem 0",
    borderBottom: "1px solid #d1d5db",
    alignItems: "center",
  },
  fundHeader: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
    gap: "1rem",
    padding: "0.75rem 0",
    borderBottom: "1px solid #d1d5db",
    fontWeight: "500",
    fontSize: "0.875rem",
    color: "#374151",
  },
  statusBadge: {
    padding: "0.25rem 0.5rem",
    borderRadius: "9999px",
    fontSize: "0.75rem",
    fontWeight: "500",
    textAlign: "center" as const,
  },
  realizedStatus: {
    backgroundColor: "#166534",
    color: "white",
  },
  partialStatus: {
    backgroundColor: "#ea580c",
    color: "white",
  },
  activeStatus: {
    backgroundColor: "#164e63",
    color: "white",
  },
  attributionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1.5rem",
  },
  attributionCard: {
    textAlign: "center" as const,
  },
  attributionValue: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
    margin: 0,
  },
  attributionLabel: {
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#164e63",
    margin: 0,
  },
  attributionDesc: {
    fontSize: "0.75rem",
    color: "#374151",
    margin: "0.25rem 0 0 0",
  },
}

function PerformanceMetric({
  title,
  value,
  benchmark,
  change,
}: {
  title: string
  value: string
  benchmark?: string
  change: string
}) {
  const isPositive = change.startsWith("+")

  return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>{title}</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
          <span style={styles.cardValue}>{value}</span>
          <span style={{ ...styles.cardChange, color: isPositive ? "#166534" : "#ea580c" }}>{change}</span>
        </div>
        {benchmark && <p style={{ fontSize: "0.75rem", color: "#374151", margin: 0 }}>Benchmark: {benchmark}</p>}
      </div>
    </div>
  )
}

function CustomDualLineChart({ data }: { data: typeof performanceData }) {
  const maxValue = Math.max(...data.map((d) => Math.max(d.fundValue, d.benchmark)))
  const minValue = Math.min(...data.map((d) => Math.min(d.fundValue, d.benchmark)))
  const range = maxValue - minValue

  return (
    <div style={styles.dualLineChart}>
      {data.map((item, index) => {
        const fundHeight = ((item.fundValue - minValue) / range) * 200 + 20
        const benchmarkHeight = ((item.benchmark - minValue) / range) * 200 + 20
        return (
          <div key={item.quarter} style={styles.chartColumn}>
            <div style={{ ...styles.fundLine, height: `${fundHeight}px` }} />
            <div style={{ ...styles.benchmarkLine, height: `${benchmarkHeight}px` }} />
            <span style={{ fontSize: "0.75rem", color: "#374151", fontWeight: "500" }}>
              {item.quarter.split(" ")[0]}
            </span>
          </div>
        )
      })}
      <div style={{ position: "absolute", top: "10px", right: "10px", fontSize: "0.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
          <div style={{ width: "12px", height: "3px", backgroundColor: "#164e63" }} />
          <span>Fund</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{ width: "12px", height: "2px", backgroundColor: "#166534" }} />
          <span>Benchmark</span>
        </div>
      </div>
    </div>
  )
}

function CustomAreaChart({ data }: { data: typeof performanceData }) {
  const maxValue = Math.max(...data.map((d) => d.irr))
  const minValue = Math.min(...data.map((d) => d.irr))
  const range = maxValue - minValue

  return (
    <div style={styles.areaChart}>
      {data.map((item, index) => {
        const height = ((item.irr - minValue) / range) * 200 + 20
        return (
          <div key={item.quarter} style={{ ...styles.areaBar, height: `${height}px` }}>
            {item.irr.toFixed(1)}%
          </div>
        )
      })}
    </div>
  )
}

function FundRow({
  fund,
  vintage,
  irr,
  multiple,
  status,
}: {
  fund: string
  vintage: number
  irr: number
  multiple: number
  status: string
}) {
  const statusStyle =
    status === "Realized"
      ? styles.realizedStatus
      : status === "Partially Realized"
        ? styles.partialStatus
        : styles.activeStatus

  return (
    <div style={styles.fundRow}>
      <div>
        <p style={{ fontWeight: "500", color: "#164e63", margin: 0 }}>{fund}</p>
      </div>
      <div>
        <p style={{ color: "#164e63", margin: 0 }}>{vintage}</p>
      </div>
      <div>
        <p style={{ fontWeight: "500", color: "#164e63", margin: 0 }}>{irr.toFixed(1)}%</p>
      </div>
      <div>
        <p style={{ fontWeight: "500", color: "#164e63", margin: 0 }}>{multiple.toFixed(1)}x</p>
      </div>
      <div>
        <span style={{ ...styles.statusBadge, ...statusStyle }}>{status}</span>
      </div>
    </div>
  )
}

export default function PerformanceTab() {
  return (
    <div style={styles.container}>
      {/* Key Performance Metrics */}
      <div style={styles.metricsGrid}>
        <PerformanceMetric title="Net IRR" value="18.7%" benchmark="15.2%" change="+0.3%" />
        <PerformanceMetric title="Total Value Multiple" value="2.1x" benchmark="1.8x" change="+0.1x" />
        <PerformanceMetric title="Distributed to Paid-In" value="1.4x" benchmark="1.2x" change="+0.2x" />
        <PerformanceMetric title="Residual Value" value="$1.2B" change="+5.8%" />
      </div>

      <div style={styles.chartsGrid}>
        {/* Performance vs Benchmark */}
        <div style={styles.card}>
          <h3 style={styles.chartTitle}>Performance vs Benchmark</h3>
          <div style={styles.chartContainer}>
            <CustomDualLineChart data={performanceData} />
          </div>
        </div>

        {/* IRR Trend */}
        <div style={styles.card}>
          <h3 style={styles.chartTitle}>IRR Trend</h3>
          <div style={styles.chartContainer}>
            <CustomAreaChart data={performanceData} />
          </div>
        </div>
      </div>

      {/* Fund Comparison */}
      <div style={styles.card}>
        <h3 style={styles.chartTitle}>Fund Performance Comparison</h3>
        <div>
          <div style={styles.fundHeader}>
            <div>Fund</div>
            <div>Vintage Year</div>
            <div>Net IRR</div>
            <div>Multiple</div>
            <div>Status</div>
          </div>
          {fundComparison.map((fund, index) => (
            <FundRow key={index} {...fund} />
          ))}
        </div>
      </div>

      {/* Performance Attribution */}
      <div style={styles.card}>
        <h3 style={styles.chartTitle}>Performance Attribution</h3>
        <div style={styles.attributionGrid}>
          <div style={styles.attributionCard}>
            <div style={{ ...styles.attributionValue, color: "#166534" }}>+8.2%</div>
            <div style={styles.attributionLabel}>Operational Improvements</div>
            <div style={styles.attributionDesc}>Portfolio company growth</div>
          </div>
          <div style={styles.attributionCard}>
            <div style={{ ...styles.attributionValue, color: "#164e63" }}>+6.1%</div>
            <div style={styles.attributionLabel}>Multiple Expansion</div>
            <div style={styles.attributionDesc}>Market valuation increases</div>
          </div>
          <div style={styles.attributionCard}>
            <div style={{ ...styles.attributionValue, color: "#ea580c" }}>+4.4%</div>
            <div style={styles.attributionLabel}>Financial Engineering</div>
            <div style={styles.attributionDesc}>Leverage optimization</div>
          </div>
        </div>
      </div>
    </div>
  )
}
