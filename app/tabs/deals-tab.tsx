"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const dealPipelineData = [
  { stage: "Sourcing", count: 45, value: 2800 },
  { stage: "Initial Review", count: 18, value: 1200 },
  { stage: "Due Diligence", count: 8, value: 650 },
  { stage: "Final Review", count: 4, value: 320 },
  { stage: "Closing", count: 2, value: 180 },
]

const recentDeals = [
  {
    company: "DataFlow Analytics",
    sector: "Technology",
    stage: "Due Diligence",
    dealSize: "$95M",
    probability: 75,
    expectedClose: "2024-02-15",
  },
  {
    company: "MedDevice Pro",
    sector: "Healthcare",
    stage: "Final Review",
    dealSize: "$120M",
    probability: 85,
    expectedClose: "2024-01-30",
  },
  {
    company: "RetailTech Solutions",
    sector: "Consumer Goods",
    stage: "Initial Review",
    dealSize: "$65M",
    probability: 45,
    expectedClose: "2024-03-20",
  },
  {
    company: "GreenEnergy Corp",
    sector: "Energy",
    stage: "Closing",
    dealSize: "$150M",
    probability: 95,
    expectedClose: "2024-01-15",
  },
]

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1.5rem",
  },
  card: {
    backgroundColor: "#ecfeff",
    borderRadius: "0.5rem",
    border: "1px solid #d1d5db",
    padding: "1.5rem",
  },
  cardTitle: {
    fontSize: "1.125rem",
    fontWeight: "600",
    color: "#164e63",
    marginBottom: "1.5rem",
    margin: 0,
  },
  metricsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "1.5rem",
    marginBottom: "1.5rem",
  },
  chartContainer: {
    height: "320px",
  },
  dealsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "1.5rem",
  },
  dealCard: {
    backgroundColor: "#ecfeff",
    borderRadius: "0.5rem",
    border: "1px solid #d1d5db",
    padding: "1.5rem",
  },
  dealHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: "1rem",
  },
  dealCompany: {
    fontWeight: "600",
    color: "#164e63",
    margin: 0,
  },
  dealSector: {
    fontSize: "0.875rem",
    color: "#374151",
    margin: "0.25rem 0 0 0",
  },
  stageBadge: {
    padding: "0.25rem 0.75rem",
    borderRadius: "9999px",
    fontSize: "0.75rem",
    fontWeight: "500",
  },
  dealMetrics: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1rem",
  },
  metricLabel: {
    fontSize: "0.75rem",
    color: "#374151",
    margin: 0,
  },
  metricValue: {
    fontWeight: "600",
    color: "#164e63",
    margin: 0,
  },
  pipelineMetric: {
    textAlign: "center" as const,
  },
  pipelineValue: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#164e63",
    margin: 0,
  },
  pipelineTitle: {
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#374151",
    margin: 0,
  },
  pipelineSubtitle: {
    fontSize: "0.75rem",
    color: "#374151",
    margin: 0,
  },
  activityItem: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    padding: "0.75rem 0",
    borderBottom: "1px solid #d1d5db",
  },
  activityDot: {
    width: "0.5rem",
    height: "0.5rem",
    borderRadius: "50%",
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#164e63",
    margin: 0,
  },
  activityTime: {
    fontSize: "0.75rem",
    color: "#374151",
    margin: 0,
  },
}

function DealCard({
  company,
  sector,
  stage,
  dealSize,
  probability,
  expectedClose,
}: {
  company: string
  sector: string
  stage: string
  dealSize: string
  probability: number
  expectedClose: string
}) {
  const getStageStyle = () => {
    switch (stage) {
      case "Closing":
        return { backgroundColor: "#166534", color: "#ffffff" }
      case "Final Review":
        return { backgroundColor: "#166534", color: "#ffffff" }
      case "Due Diligence":
        return { backgroundColor: "#164e63", color: "#ffffff" }
      default:
        return { backgroundColor: "#f0fdf4", color: "#374151" }
    }
  }

  const getProbabilityColor = () => {
    if (probability >= 80) return "#166534"
    if (probability >= 60) return "#166534"
    if (probability >= 40) return "#164e63"
    return "#374151"
  }

  return (
    <div style={styles.dealCard}>
      <div style={styles.dealHeader}>
        <div>
          <h4 style={styles.dealCompany}>{company}</h4>
          <p style={styles.dealSector}>{sector}</p>
        </div>
        <span style={{ ...styles.stageBadge, ...getStageStyle() }}>{stage}</span>
      </div>

      <div style={styles.dealMetrics}>
        <div>
          <p style={styles.metricLabel}>Deal Size</p>
          <p style={styles.metricValue}>{dealSize}</p>
        </div>
        <div>
          <p style={styles.metricLabel}>Probability</p>
          <p style={{ ...styles.metricValue, color: getProbabilityColor() }}>{probability}%</p>
        </div>
        <div>
          <p style={styles.metricLabel}>Expected Close</p>
          <p style={styles.metricValue}>{expectedClose}</p>
        </div>
      </div>
    </div>
  )
}

function PipelineMetric({
  title,
  value,
  subtitle,
}: {
  title: string
  value: string
  subtitle: string
}) {
  return (
    <div style={styles.pipelineMetric}>
      <p style={styles.pipelineValue}>{value}</p>
      <p style={styles.pipelineTitle}>{title}</p>
      <p style={styles.pipelineSubtitle}>{subtitle}</p>
    </div>
  )
}

export default function DealsTab() {
  return (
    <div style={styles.container}>
      {/* Pipeline Overview */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Deal Pipeline Overview</h3>
        <div style={styles.metricsGrid}>
          <PipelineMetric title="Total Deals" value="77" subtitle="Active opportunities" />
          <PipelineMetric title="Pipeline Value" value="$5.2B" subtitle="Total deal value" />
          <PipelineMetric title="Avg Deal Size" value="$67M" subtitle="Mean transaction" />
          <PipelineMetric title="Close Rate" value="23%" subtitle="Historical average" />
          <PipelineMetric title="Time to Close" value="4.2mo" subtitle="Average duration" />
        </div>

        <div style={styles.chartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dealPipelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
              <XAxis dataKey="stage" stroke="#475569" />
              <YAxis stroke="#475569" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="count" fill="#164e63" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Active Deals */}
      <div>
        <h3 style={styles.cardTitle}>Active Deals</h3>
        <div style={styles.dealsGrid}>
          {recentDeals.map((deal, index) => (
            <DealCard key={index} {...deal} />
          ))}
        </div>
      </div>

      {/* Deal Activity */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Recent Activity</h3>
        <div>
          <div style={styles.activityItem}>
            <div style={{ ...styles.activityDot, backgroundColor: "#166534" }}></div>
            <div style={styles.activityContent}>
              <p style={styles.activityText}>Due diligence completed for DataFlow Analytics</p>
              <p style={styles.activityTime}>2 hours ago</p>
            </div>
          </div>
          <div style={styles.activityItem}>
            <div style={{ ...styles.activityDot, backgroundColor: "#164e63" }}></div>
            <div style={styles.activityContent}>
              <p style={styles.activityText}>New deal sourced: CloudTech Innovations</p>
              <p style={styles.activityTime}>5 hours ago</p>
            </div>
          </div>
          <div style={styles.activityItem}>
            <div style={{ ...styles.activityDot, backgroundColor: "#166534" }}></div>
            <div style={styles.activityContent}>
              <p style={styles.activityText}>Term sheet signed with MedDevice Pro</p>
              <p style={styles.activityTime}>1 day ago</p>
            </div>
          </div>
          <div style={styles.activityItem}>
            <div style={{ ...styles.activityDot, backgroundColor: "#374151" }}></div>
            <div style={styles.activityContent}>
              <p style={styles.activityText}>Initial review scheduled for RetailTech Solutions</p>
              <p style={styles.activityTime}>2 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
