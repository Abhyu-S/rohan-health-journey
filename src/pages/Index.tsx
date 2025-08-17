import { useState } from 'react';
import { HealthTimeline } from '@/components/HealthTimeline';
import { MetricCards } from '@/components/MetricCards';
import { WeeklySnapshot } from '@/components/WeeklySnapshot';
import { DeepDiveChart } from '@/components/DeepDiveChart';
import { healthJourneyData, getCurrentMetrics, getWeeklyData } from '@/data/healthData';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Users, Calendar, TrendingUp } from 'lucide-react';

const Index = () => {
  const [selectedWeek, setSelectedWeek] = useState(32);
  const [showChart, setShowChart] = useState<string | null>(null);
  
  const currentMetrics = getCurrentMetrics();
  const weeklyData = getWeeklyData(selectedWeek);

  const handleShowChart = (metric: string) => {
    setShowChart(metric);
  };

  const getChartData = (metric: string) => {
    if (metric === 'bloodPressure') {
      return {
        title: 'Blood Pressure',
        data: healthJourneyData.bloodPressureData.map(bp => ({
          week: bp.week,
          value: bp.systolic
        })),
        unit: ' mmHg',
        optimalRange: { min: 90, max: 130 }
      };
    }
    
    if (metric === 'adherence') {
      return {
        title: 'Treatment Adherence',
        data: healthJourneyData.adherenceData,
        unit: '%',
        optimalRange: { min: 80, max: 100 }
      };
    }
    
    return {
      title: 'Metric',
      data: [],
      unit: '',
      optimalRange: undefined
    };
  };

  const chartData = showChart ? getChartData(showChart) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-chart-background/30">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Elyx Clinical Dashboard</h1>
                <p className="text-muted-foreground">Healthcare Journey Analytics</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Card className="px-4 py-2 bg-gradient-to-r from-health-excellent/10 to-health-good/10">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-health-excellent" />
                  <span className="font-semibold text-foreground">Member: Rohan</span>
                </div>
              </Card>
              
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                <Calendar className="h-3 w-3 mr-1" />
                8 Months Active
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Key Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 bg-gradient-to-br from-health-excellent/10 to-health-excellent/5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-health-excellent/20">
                <TrendingUp className="h-5 w-5 text-health-excellent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{Math.round(currentMetrics.adherence.level * 100)}%</p>
                <p className="text-sm text-muted-foreground">Current Adherence</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-gradient-to-br from-chart-primary/10 to-chart-primary/5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-chart-primary/20">
                <Activity className="h-5 w-5 text-chart-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {currentMetrics.bloodPressure.systolic}/{currentMetrics.bloodPressure.diastolic}
                </p>
                <p className="text-sm text-muted-foreground">Latest BP (mmHg)</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-gradient-to-br from-health-good/10 to-health-good/5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-health-good/20">
                <Calendar className="h-5 w-5 text-health-good" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">32</p>
                <p className="text-sm text-muted-foreground">Weeks Tracked</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-gradient-to-br from-chart-secondary/10 to-chart-secondary/5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-chart-secondary/20">
                <Users className="h-5 w-5 text-chart-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">8</p>
                <p className="text-sm text-muted-foreground">Key Interventions</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Timeline */}
        <HealthTimeline 
          weeks={healthJourneyData.weeklyTimeline}
          selectedWeek={selectedWeek}
          onWeekSelect={setSelectedWeek}
        />

        {/* Metric Cards */}
        <MetricCards 
          {...currentMetrics}
          onShowChart={handleShowChart}
        />

        {/* Weekly Snapshot */}
        <WeeklySnapshot 
          selectedWeek={selectedWeek}
          {...weeklyData}
        />

        {/* Deep Dive Chart Modal */}
        {showChart && chartData && (
          <DeepDiveChart
            isOpen={!!showChart}
            onClose={() => setShowChart(null)}
            metric={showChart}
            title={chartData.title}
            data={chartData.data}
            unit={chartData.unit}
            optimalRange={chartData.optimalRange}
            interventions={healthJourneyData.interventions}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
