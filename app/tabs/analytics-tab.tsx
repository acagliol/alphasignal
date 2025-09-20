"use client"

import type React from "react"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from "recharts"

const sectorAnalysis = [
  { sector: "Technology", count: 8, avgIRR: 24.3, totalValue: 840 },
  { sector: "Healthcare", count: 6, avgIRR: 19.8, totalValue: 600 },
  { sector: "Financial Services", count: 4, avgIRR: 16.2, totalValue: 480 },
  { sector: "Consumer Goods", count: 3, avgIRR: 13.7, totalValue: 288 },
  { sector: "Energy", count: 2, avgIRR: 8.9, totalValue: 192 },
]

const riskReturnData = [
  { risk: 12, return: 18.7, size: 240, name: "Current Portfolio" },
  { risk: 15, return: 22.4, size: 180, name: "Fund I" },
  { risk: 13, return: 19.8, size: 200, name: "Fund II" },
  { risk: 18, return: 25.1, size: 120, name: "High Growth Sector" },
  { risk: 8, return: 12.3, size: 160, name: "Stable Sector" },
]

const marketMetrics = [
  { metric: "Market Cap Growth", value: "+12.4%", trend: "up" },
  { metric: "EBITDA Margin", value: "18.2%", trend: "up" },
  { metric: "Revenue Growth", value: "+8.7%", trend: "up" },
  { metric: "Debt/EBITDA", value: "3.2x", trend: "down" },
]

function AnalyticsCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">{title}</h3>
      {children}
    </div>
  )
}

function MetricItem({ metric, value, trend }: { metric: string; value: string; trend: "up" | "down" }) {
  const trendColor = trend === "up" ? "text-secondary" : "text-destructive"
  const trendIcon = trend === "up" ? "↗" : "↘"

  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
      <span className="text-sm font-medium text-card-foreground">{metric}</span>
      <div className="flex items-center gap-2">
        <span className="font-semibold text-card-foreground">{value}</span>
        <span className={`text-sm ${trendColor}`}>{trendIcon}</span>
      </div>
    </div>
  )
}

function SectorRow({
  sector,
  count,
  avgIRR,
  totalValue,
}: {
  sector: string
  count: number
  avgIRR: number
  totalValue: number
}) {
  return (
    <div className="grid grid-cols-4 gap-4 py-3 border-b border-border last:border-b-0">
      <div className="font-medium text-card-foreground">{sector}</div>
      <div className="text-center text-card-foreground">{count}</div>
      <div className="text-center font-medium text-secondary">{avgIRR.toFixed(1)}%</div>
      <div className="text-right font-medium text-card-foreground">${totalValue}M</div>
    </div>
  )
}

export default function AnalyticsTab() {
  return (
    <div className="space-y-6">
      {/* Top Level Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card rounded-lg border border-border p-6 text-center">
          <div className="text-2xl font-bold text-primary mb-2">94.2%</div>
          <div className="text-sm font-medium text-card-foreground">Success Rate</div>
          <div className="text-xs text-muted-foreground">Positive returns</div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6 text-center">
          <div className="text-2xl font-bold text-secondary mb-2">4.2 years</div>
          <div className="text-sm font-medium text-card-foreground">Avg Hold Period</div>
          <div className="text-xs text-muted-foreground">Investment duration</div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6 text-center">
          <div className="text-2xl font-bold text-accent mb-2">2.3x</div>
          <div className="text-sm font-medium text-card-foreground">Avg Multiple</div>
          <div className="text-xs text-muted-foreground">Money multiple</div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6 text-center">
          <div className="text-2xl font-bold text-primary mb-2">$67M</div>
          <div className="text-sm font-medium text-card-foreground">Avg Deal Size</div>
          <div className="text-xs text-muted-foreground">Investment amount</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sector Performance */}
        <AnalyticsCard title="Sector Performance Analysis">
          <div className="space-y-0">
            <div className="grid grid-cols-4 gap-4 py-2 border-b border-border font-medium text-muted-foreground text-sm">
              <div>Sector</div>
              <div className="text-center">Count</div>
              <div className="text-center">Avg IRR</div>
              <div className="text-right">Value ($M)</div>
            </div>
            {sectorAnalysis.map((sector, index) => (
              <SectorRow key={index} {...sector} />
            ))}
          </div>
        </AnalyticsCard>

        {/* Market Metrics */}
        <AnalyticsCard title="Portfolio Company Metrics">
          <div className="space-y-0">
            {marketMetrics.map((item, index) => (
              <MetricItem key={index} {...item} />
            ))}
          </div>
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              Portfolio companies showing strong operational performance with revenue growth outpacing market averages
              by 3.2 percentage points.
            </p>
          </div>
        </AnalyticsCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sector IRR Comparison */}
        <AnalyticsCard title="Sector IRR Comparison">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorAnalysis} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
                <XAxis type="number" stroke="#475569" />
                <YAxis dataKey="sector" type="category" stroke="#475569" width={100} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="avgIRR" fill="#164e63" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </AnalyticsCard>

        {/* Risk-Return Analysis */}
        <AnalyticsCard title="Risk-Return Analysis">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart data={riskReturnData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
                <XAxis
                  dataKey="risk"
                  stroke="#475569"
                  label={{ value: "Risk (Volatility %)", position: "insideBottom", offset: -10 }}
                />
                <YAxis
                  dataKey="return"
                  stroke="#475569"
                  label={{ value: "Return (IRR %)", angle: -90, position: "insideLeft" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                  }}
                  formatter={(value, name) => [
                    name === "return" ? `${value}%` : `${value}%`,
                    name === "return" ? "IRR" : "Risk",
                  ]}
                />
                <Scatter dataKey="return" fill="#164e63" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </AnalyticsCard>
      </div>

      {/* Investment Thesis Analysis */}
      <AnalyticsCard title="Investment Thesis Performance">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-xl font-bold text-secondary mb-2">Technology Disruption</div>
            <div className="text-sm text-muted-foreground mb-3">8 investments • 24.3% avg IRR</div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-secondary h-2 rounded-full" style={{ width: "85%" }}></div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">85% success rate</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-primary mb-2">Market Consolidation</div>
            <div className="text-sm text-muted-foreground mb-3">6 investments • 18.1% avg IRR</div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: "75%" }}></div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">75% success rate</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-accent mb-2">Operational Excellence</div>
            <div className="text-sm text-muted-foreground mb-3">9 investments • 16.7% avg IRR</div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-accent h-2 rounded-full" style={{ width: "90%" }}></div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">90% success rate</div>
          </div>
        </div>
      </AnalyticsCard>
    </div>
  )
}
