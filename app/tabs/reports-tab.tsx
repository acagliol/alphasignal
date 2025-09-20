"use client"

const reports = [
  {
    title: "Quarterly Performance Report",
    description: "Comprehensive analysis of fund performance for Q4 2023",
    date: "2024-01-15",
    type: "Performance",
    status: "Published",
  },
  {
    title: "Portfolio Company Update",
    description: "Detailed updates on all active portfolio companies",
    date: "2024-01-10",
    type: "Portfolio",
    status: "Published",
  },
  {
    title: "Market Analysis & Outlook",
    description: "Industry trends and market outlook for 2024",
    date: "2024-01-08",
    type: "Market",
    status: "Published",
  },
  {
    title: "ESG Impact Assessment",
    description: "Environmental, social, and governance impact metrics",
    date: "2024-01-05",
    type: "ESG",
    status: "Draft",
  },
  {
    title: "Risk Management Review",
    description: "Annual risk assessment and mitigation strategies",
    date: "2023-12-20",
    type: "Risk",
    status: "Published",
  },
]

const upcomingReports = [
  {
    title: "Annual Investor Letter",
    dueDate: "2024-02-01",
    assignee: "Investment Team",
    priority: "High",
  },
  {
    title: "Fund III Performance Update",
    dueDate: "2024-01-25",
    assignee: "Portfolio Management",
    priority: "Medium",
  },
  {
    title: "Deal Pipeline Summary",
    dueDate: "2024-01-30",
    assignee: "Business Development",
    priority: "Medium",
  },
]

function ReportCard({
  title,
  description,
  date,
  type,
  status,
}: {
  title: string
  description: string
  date: string
  type: string
  status: string
}) {
  const statusColor =
    status === "Published" ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"
  const typeColor =
    type === "Performance"
      ? "text-primary"
      : type === "Portfolio"
        ? "text-secondary"
        : type === "Market"
          ? "text-accent"
          : type === "ESG"
            ? "text-chart-4"
            : "text-destructive"

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-card-foreground mb-1">{title}</h4>
          <p className="text-sm text-muted-foreground mb-2">{description}</p>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-muted-foreground">{date}</span>
            <span className={`font-medium ${typeColor}`}>{type}</span>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>{status}</span>
      </div>
      <div className="flex gap-2">
        <button className="px-3 py-1 bg-primary text-primary-foreground text-xs rounded hover:bg-primary/90 transition-colors">
          View
        </button>
        <button className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded hover:bg-muted/80 transition-colors">
          Download
        </button>
      </div>
    </div>
  )
}

function UpcomingReportRow({
  title,
  dueDate,
  assignee,
  priority,
}: {
  title: string
  dueDate: string
  assignee: string
  priority: string
}) {
  const priorityColor =
    priority === "High" ? "text-destructive" : priority === "Medium" ? "text-accent" : "text-muted-foreground"

  return (
    <div className="grid grid-cols-4 gap-4 py-4 border-b border-border last:border-b-0">
      <div>
        <p className="font-medium text-card-foreground">{title}</p>
      </div>
      <div>
        <p className="text-card-foreground">{dueDate}</p>
      </div>
      <div>
        <p className="text-card-foreground">{assignee}</p>
      </div>
      <div>
        <span className={`font-medium ${priorityColor}`}>{priority}</span>
      </div>
    </div>
  )
}

function QuickAction({
  title,
  description,
  icon,
}: {
  title: string
  description: string
  icon: string
}) {
  return (
    <button className="bg-card rounded-lg border border-border p-6 text-left hover:bg-muted/50 transition-colors">
      <div className="text-2xl mb-3">{icon}</div>
      <h4 className="font-semibold text-card-foreground mb-1">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </button>
  )
}

export default function ReportsTab() {
  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickAction title="Generate Report" description="Create a new custom report" icon="📊" />
          <QuickAction title="Schedule Report" description="Set up automated reporting" icon="⏰" />
          <QuickAction title="Export Data" description="Download portfolio data" icon="📥" />
        </div>
      </div>

      {/* Recent Reports */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports.map((report, index) => (
            <ReportCard key={index} {...report} />
          ))}
        </div>
      </div>

      {/* Upcoming Reports */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Upcoming Reports</h3>
        <div className="space-y-0">
          <div className="grid grid-cols-4 gap-4 py-3 border-b border-border font-medium text-muted-foreground text-sm">
            <div>Report</div>
            <div>Due Date</div>
            <div>Assignee</div>
            <div>Priority</div>
          </div>
          {upcomingReports.map((report, index) => (
            <UpcomingReportRow key={index} {...report} />
          ))}
        </div>
      </div>

      {/* Report Templates */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Report Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
            <h4 className="font-medium text-card-foreground mb-2">Investor Update</h4>
            <p className="text-sm text-muted-foreground mb-3">Quarterly performance and portfolio updates</p>
            <button className="text-xs text-primary hover:underline">Use Template</button>
          </div>
          <div className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
            <h4 className="font-medium text-card-foreground mb-2">Deal Summary</h4>
            <p className="text-sm text-muted-foreground mb-3">Investment thesis and transaction details</p>
            <button className="text-xs text-primary hover:underline">Use Template</button>
          </div>
          <div className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
            <h4 className="font-medium text-card-foreground mb-2">Portfolio Review</h4>
            <p className="text-sm text-muted-foreground mb-3">Company performance and value creation</p>
            <button className="text-xs text-primary hover:underline">Use Template</button>
          </div>
          <div className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
            <h4 className="font-medium text-card-foreground mb-2">Market Analysis</h4>
            <p className="text-sm text-muted-foreground mb-3">Industry trends and competitive landscape</p>
            <button className="text-xs text-primary hover:underline">Use Template</button>
          </div>
          <div className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
            <h4 className="font-medium text-card-foreground mb-2">Risk Assessment</h4>
            <p className="text-sm text-muted-foreground mb-3">Portfolio risk analysis and mitigation</p>
            <button className="text-xs text-primary hover:underline">Use Template</button>
          </div>
          <div className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
            <h4 className="font-medium text-card-foreground mb-2">ESG Report</h4>
            <p className="text-sm text-muted-foreground mb-3">Sustainability and impact metrics</p>
            <button className="text-xs text-primary hover:underline">Use Template</button>
          </div>
        </div>
      </div>
    </div>
  )
}
