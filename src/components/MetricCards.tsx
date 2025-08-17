import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Activity, Heart, Watch } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricData {
  week: number;
  value: number;
}

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend: 'up' | 'down' | 'stable';
  trendValue?: string;
  sparklineData: MetricData[];
  status: 'excellent' | 'good' | 'warning' | 'critical';
  onSeeDetails: () => void;
  icon: React.ReactNode;
  optimalRange?: string;
}

function MetricCard({
  title,
  value,
  unit,
  trend,
  trendValue,
  sparklineData,
  status,
  onSeeDetails,
  icon,
  optimalRange
}: MetricCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'health-excellent';
      case 'good': return 'health-good';
      case 'warning': return 'health-warning';
      case 'critical': return 'health-critical';
      default: return 'health-neutral';
    }
  };

  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-health-excellent" />;
    if (trend === 'down') return <TrendingDown className="h-4 w-4 text-health-critical" />;
    return <div className="h-4 w-4 rounded-full bg-health-neutral" />;
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-muted/20 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-all duration-300 border-l-4" style={{ borderLeftColor: `hsl(var(--${getStatusColor(status)}))` }}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={cn("p-2 rounded-lg", `bg-${getStatusColor(status)}/10`)}>
            {icon}
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{title}</h3>
            {optimalRange && (
              <p className="text-xs text-muted-foreground">Optimal: {optimalRange}</p>
            )}
          </div>
        </div>
        <Badge variant={status === 'excellent' || status === 'good' ? 'default' : 'destructive'} className="capitalize">
          {status}
        </Badge>
      </div>

      <div className="flex items-end justify-between mb-4">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-foreground">{value}</span>
            {unit && <span className="text-muted-foreground">{unit}</span>}
          </div>
          {trendValue && (
            <div className="flex items-center gap-1 mt-1">
              {getTrendIcon()}
              <span className={cn(
                "text-sm font-medium",
                trend === 'up' ? "text-health-excellent" : trend === 'down' ? "text-health-critical" : "text-health-neutral"
              )}>
                {trendValue}
              </span>
            </div>
          )}
        </div>
        
        {/* Sparkline */}
        <div className="w-24 h-12">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparklineData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={`hsl(var(--${getStatusColor(status)}))`}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <Button 
        variant="outline" 
        size="sm" 
        onClick={onSeeDetails}
        className="w-full hover:bg-primary/5 transition-colors duration-200"
      >
        See Details
      </Button>
    </Card>
  );
}

interface MetricCardsProps {
  bloodPressure: {
    systolic: number;
    diastolic: number;
    data: MetricData[];
    status: 'excellent' | 'good' | 'warning' | 'critical';
  };
  adherence: {
    level: number;
    data: MetricData[];
    status: 'excellent' | 'good' | 'warning' | 'critical';
  };
  wearableStatus: {
    status: 'active' | 'inactive' | 'error';
    lastUpdate: string;
    issues?: string[];
  };
  onShowChart: (metric: string) => void;
}

export function MetricCards({ bloodPressure, adherence, wearableStatus, onShowChart }: MetricCardsProps) {
  const getWearableStatusIcon = () => {
    switch (wearableStatus.status) {
      case 'active': return '✅';
      case 'error': return '⚠️';
      default: return '⏸️';
    }
  };

  const getWearableStatusColor = () => {
    switch (wearableStatus.status) {
      case 'active': return 'excellent';
      case 'error': return 'critical';
      default: return 'warning';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {/* Blood Pressure Card */}
      <MetricCard
        title="Blood Pressure"
        value={`${bloodPressure.systolic}/${bloodPressure.diastolic}`}
        unit="mmHg"
        trend={bloodPressure.systolic > 140 ? 'up' : 'stable'}
        trendValue={bloodPressure.systolic > 140 ? 'Elevated' : 'Normal'}
        sparklineData={bloodPressure.data}
        status={bloodPressure.status}
        onSeeDetails={() => onShowChart('bloodPressure')}
        icon={<Heart className={cn("h-5 w-5", `text-${bloodPressure.status === 'excellent' || bloodPressure.status === 'good' ? 'health-excellent' : 'health-warning'}`)} />}
        optimalRange="<120/80"
      />

      {/* Adherence Card */}
      <MetricCard
        title="Treatment Adherence"
        value={Math.round(adherence.level * 100)}
        unit="%"
        trend={adherence.level >= 0.9 ? 'up' : adherence.level >= 0.7 ? 'stable' : 'down'}
        trendValue={adherence.level >= 0.9 ? 'Excellent' : adherence.level >= 0.7 ? 'Good' : 'Needs attention'}
        sparklineData={adherence.data}
        status={adherence.status}
        onSeeDetails={() => onShowChart('adherence')}
        icon={<Activity className={cn("h-5 w-5", `text-${adherence.status === 'excellent' || adherence.status === 'good' ? 'health-excellent' : 'health-warning'}`)} />}
        optimalRange=">90%"
      />

      {/* Wearable Status Card */}
      <Card className="p-6 bg-gradient-to-br from-card to-muted/20 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-all duration-300 border-l-4" style={{ borderLeftColor: `hsl(var(--health-${getWearableStatusColor()}))` }}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={cn("p-2 rounded-lg", `bg-health-${getWearableStatusColor()}/10`)}>
              <Watch className={cn("h-5 w-5", `text-health-${getWearableStatusColor()}`)} />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Wearable Device</h3>
              <p className="text-xs text-muted-foreground">Last sync: {wearableStatus.lastUpdate}</p>
            </div>
          </div>
          <div className="text-2xl">{getWearableStatusIcon()}</div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Status</span>
            <Badge variant={wearableStatus.status === 'active' ? 'default' : 'destructive'} className="capitalize">
              {wearableStatus.status}
            </Badge>
          </div>
          
          {wearableStatus.issues && wearableStatus.issues.length > 0 && (
            <div className="mt-3">
              <p className="text-sm font-medium text-health-critical mb-1">Issues Detected:</p>
              <ul className="space-y-1">
                {wearableStatus.issues.map((issue, index) => (
                  <li key={index} className="text-xs text-muted-foreground">• {issue}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}