import { useState } from "react";
import { FileText, Download, TrendingUp, Calendar, BarChart3, PieChart, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";

const ReportsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const reportCategories = [
    { id: "all", name: "All Reports", count: 12 },
    { id: "maternal", name: "Maternal Health", count: 5 },
    { id: "child", name: "Child Health", count: 4 },
    { id: "vaccination", name: "Vaccination", count: 3 }
  ];

  const reports = [
    {
      id: "RPT-001",
      title: "Maternal Health Statistics - January 2024",
      type: "Maternal Health",
      generatedDate: "2024-01-31",
      period: "January 2024",
      summary: "Comprehensive analysis of maternal health indicators including prenatal care attendance, birth outcomes, and postpartum follow-ups.",
      keyMetrics: {
        totalPatients: 156,
        averageAge: 26.8,
        successRate: 94.2,
        riskCases: 8
      },
      status: "completed"
    },
    {
      id: "RPT-002",
      title: "Child Vaccination Coverage Report",
      type: "Vaccination",
      generatedDate: "2024-01-30",
      period: "Q4 2023",
      summary: "Quarterly vaccination coverage analysis showing immunization rates across different age groups and geographical areas.",
      keyMetrics: {
        totalChildren: 423,
        fullyCovered: 387,
        coverageRate: 91.5,
        pendingDoses: 36
      },
      status: "completed"
    },
    {
      id: "RPT-003",
      title: "Nutritional Assessment Summary",
      type: "Child Health",
      generatedDate: "2024-01-29",
      period: "January 2024",
      summary: "Monthly nutritional status assessment of children under 5 years, including growth monitoring and malnutrition indicators.",
      keyMetrics: {
        totalAssessed: 234,
        normalGrowth: 189,
        mildMalnutrition: 32,
        severeCases: 13
      },
      status: "completed"
    },
    {
      id: "RPT-004",
      title: "Family Planning Services Report",
      type: "Maternal Health",
      generatedDate: "2024-01-28",
      period: "Q4 2023",
      summary: "Quarterly report on family planning consultations, contraceptive distribution, and reproductive health education programs.",
      keyMetrics: {
        consultations: 178,
        newAcceptors: 45,
        continuingUsers: 133,
        satisfactionRate: 96.1
      },
      status: "completed"
    },
    {
      id: "RPT-005",
      title: "Antenatal Care Attendance Analysis",
      type: "Maternal Health",
      generatedDate: "2024-01-27",
      period: "December 2023",
      summary: "Analysis of antenatal care visit patterns, including early registration rates and completion of recommended visits.",
      keyMetrics: {
        registrations: 89,
        earlyRegistration: 76,
        completedVisits: 82,
        averageVisits: 6.2
      },
      status: "completed"
    },
    {
      id: "RPT-006",
      title: "Immunization Cold Chain Report",
      type: "Vaccination",
      generatedDate: "2024-01-26",
      period: "January 2024",
      summary: "Monthly cold chain maintenance report ensuring vaccine potency and storage compliance across all health centers.",
      keyMetrics: {
        facilitiesMonitored: 12,
        complianceRate: 100,
        temperatureBreaches: 0,
        vaccinesPreserved: 2840
      },
      status: "completed"
    }
  ];

  const dashboardStats = [
    {
      title: "Total Reports Generated",
      value: "47",
      change: "+12% this month",
      icon: FileText,
      color: "text-primary"
    },
    {
      title: "Maternal Health Coverage",
      value: "94.2%",
      change: "+2.1% from last quarter",
      icon: TrendingUp,
      color: "text-health-success"
    },
    {
      title: "Child Vaccination Rate",
      value: "91.5%",
      change: "+5.3% from target",
      icon: BarChart3,
      color: "text-health-success"
    },
    {
      title: "Data Quality Score",
      value: "98.7%",
      change: "Excellent data integrity",
      icon: PieChart,
      color: "text-health-purple"
    }
  ];

  const filteredReports = reports.filter(report => {
    if (selectedCategory === "all") return true;
    return report.type.toLowerCase().includes(selectedCategory);
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-health-success text-white";
      case "processing": return "bg-health-warning text-white";
      case "pending": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const formatMetrics = (metrics: any) => {
    return Object.entries(metrics).map(([key, value]) => ({
      label: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
      value: String(value)
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Health Reports</h1>
            <p className="text-muted-foreground">Generated health analytics and performance reports</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="soft">
              <Calendar className="h-4 w-4" />
              Schedule Report
            </Button>
            <Button variant="health">
              <FileText className="h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => (
            <Card key={index} className="p-6 shadow-card bg-gradient-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.change}</p>
                </div>
                <div className="bg-primary-soft p-3 rounded-lg">
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <div className="flex flex-wrap gap-2">
            {reportCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "health" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>
          <div className="flex space-x-2">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border rounded-lg bg-background text-foreground text-sm"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid gap-6">
          {filteredReports.map((report) => (
            <Card key={report.id} className="p-6 hover:shadow-card transition-all duration-300 bg-gradient-card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{report.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                    <span className="bg-primary-soft px-2 py-1 rounded text-primary font-medium">
                      {report.type}
                    </span>
                    <span>Period: {report.period}</span>
                    <span>Generated: {new Date(report.generatedDate).toLocaleDateString('en-IN')}</span>
                  </div>
                  <p className="text-muted-foreground text-sm">{report.summary}</p>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Button variant="soft" size="sm">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="border-t pt-4">
                <h4 className="font-medium text-foreground mb-3">Key Metrics</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formatMetrics(report.keyMetrics).map((metric, index) => (
                    <div key={index} className="bg-background p-3 rounded-lg border">
                      <div className="text-lg font-bold text-foreground">{metric.value}</div>
                      <div className="text-xs text-muted-foreground">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="mt-8 p-6 bg-gradient-primary text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">Need a Custom Report?</h3>
              <p className="text-white/90">Generate specific reports based on your requirements with our advanced analytics engine.</p>
            </div>
            <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
              Create Custom Report
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ReportsPage;