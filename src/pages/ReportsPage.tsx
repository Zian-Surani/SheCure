import { useState } from "react";
import { FileText, Download, TrendingUp, Calendar, BarChart3, PieChart, Filter, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";

const ReportsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const [showReportDetails, setShowReportDetails] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const { toast } = useToast();
  const { t } = useLanguage();

  const generateReport = async () => {
    setLoading(true);
    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Report Generated Successfully",
        description: "Your health report has been generated and is ready for download.",
      });
    } catch (error) {
      toast({
        title: "Error generating report",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const scheduleReport = async () => {
    setLoading(true);
    try {
      // Simulate scheduling
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Report Scheduled",
        description: "Your report has been scheduled for weekly generation.",
      });
    } catch (error) {
      toast({
        title: "Error scheduling report",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = (reportId: string, title: string) => {
    // Create a simple CSV content for demonstration
    const csvContent = `Report: ${title}\nGenerated: ${new Date().toLocaleDateString()}\n\nSample Data:\nPatient Name,Age,Status\nPriya Sharma,28,Active\nKavya Reddy,32,Critical\nAadhya Patel,5,Active`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportId}-${title.replace(/\s+/g, '-')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Download Started",
      description: `${title} is being downloaded.`,
    });
  };

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
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{t('nav.reports')}</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Generated health analytics and performance reports</p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <Button variant="soft" onClick={scheduleReport} disabled={loading} className="w-full sm:w-auto">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Calendar className="h-4 w-4" />}
              <span className="ml-1">{t('common.scheduleReport')}</span>
            </Button>
            <Button variant="health" onClick={generateReport} disabled={loading} className="w-full sm:w-auto">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
              <span className="ml-1">{t('common.generateReport')}</span>
            </Button>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {dashboardStats.map((stat, index) => (
            <Card key={index} className="p-4 sm:p-6 shadow-card bg-gradient-card">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium truncate">{stat.title}</p>
                  <p className="text-xl sm:text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1 truncate">{stat.change}</p>
                </div>
                <div className="bg-primary-soft p-2 sm:p-3 rounded-lg flex-shrink-0">
                  <stat.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.color}`} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 mb-6 sm:mb-8">
          <div className="flex flex-wrap gap-2">
            {reportCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "health" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex-1 sm:flex-none text-xs sm:text-sm"
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border rounded-lg bg-background text-foreground text-sm flex-1 sm:flex-none"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline ml-1">More Filters</span>
            </Button>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid gap-4 sm:gap-6">
          {filteredReports.map((report) => (
            <Card key={report.id} className="p-4 sm:p-6 hover:shadow-card transition-all duration-300 bg-gradient-card">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground">{report.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${getStatusColor(report.status)}`}>
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-3">
                    <span className="bg-primary-soft px-2 py-1 rounded text-primary font-medium w-fit">
                      {report.type}
                    </span>
                    <span>Period: {report.period}</span>
                    <span className="hidden sm:inline">Generated: {new Date(report.generatedDate).toLocaleDateString('en-IN')}</span>
                  </div>
                  <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2">{report.summary}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="soft" size="sm" onClick={() => downloadReport(report.id, report.title)} className="w-full sm:w-auto">
                    <Download className="h-4 w-4" />
                    <span className="sm:hidden md:inline ml-1">Download</span>
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => {
                    setSelectedReport(report);
                    setShowReportDetails(true);
                  }} className="w-full sm:w-auto">
                    <span className="text-xs sm:text-sm">View Details</span>
                  </Button>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="border-t pt-4">
                <h4 className="font-medium text-foreground mb-3 text-sm sm:text-base">Key Metrics</h4>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  {formatMetrics(report.keyMetrics).map((metric, index) => (
                    <div key={index} className="bg-background p-2 sm:p-3 rounded-lg border">
                      <div className="text-sm sm:text-lg font-bold text-foreground">{metric.value}</div>
                      <div className="text-xs text-muted-foreground line-clamp-1">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-primary text-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Need a Custom Report?</h3>
              <p className="text-white/90 text-sm sm:text-base">Generate specific reports based on your requirements with our advanced analytics engine.</p>
            </div>
            <Button variant="secondary" className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto">
              Create Custom Report
            </Button>
          </div>
        </Card>

        {/* Report Details Dialog */}
        <Dialog open={showReportDetails} onOpenChange={setShowReportDetails}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Report Details</DialogTitle>
            </DialogHeader>
            {selectedReport && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Report Information</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Title:</span> {selectedReport.title}</p>
                      <p><span className="font-medium">Type:</span> {selectedReport.type}</p>
                      <p><span className="font-medium">Period:</span> {selectedReport.period}</p>
                      <p><span className="font-medium">Generated:</span> {new Date(selectedReport.generatedDate).toLocaleDateString('en-IN')}</p>
                      <p><span className="font-medium">Status:</span> 
                        <span className={`ml-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedReport.status)}`}>
                          {selectedReport.status}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Summary</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {selectedReport.summary}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-4">Key Metrics</h4>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {formatMetrics(selectedReport.keyMetrics).map((metric, index) => (
                      <Card key={index} className="p-4 bg-gradient-card">
                        <div className="text-xl sm:text-2xl font-bold text-primary">{metric.value}</div>
                        <div className="text-xs sm:text-sm text-muted-foreground">{metric.label}</div>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-4">
                  <Button variant="health" size="sm" onClick={() => downloadReport(selectedReport.id, selectedReport.title)} className="flex-1 sm:flex-none">
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                  <Button variant="soft" size="sm" className="flex-1 sm:flex-none">
                    Schedule Similar Report
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setShowReportDetails(false)} className="flex-1 sm:flex-none">
                    Close
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ReportsPage;