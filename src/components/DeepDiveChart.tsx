import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, TrendingUp, Target, Info } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, ReferenceArea } from 'recharts';

interface ChartDataPoint {
  week: number;
  value: number;
  intervention?: string;
  decision?: string;
}

interface DeepDiveChartProps {
  isOpen: boolean;
  onClose: () => void;
  metric: string;
  title: string;
  data: ChartDataPoint[];
  unit: string;
  optimalRange?: { min: number; max: number };
  interventions?: Array<{
    week: number;
    title: string;
    description: string;
  }>;
}

export function DeepDiveChart({ 
  isOpen, 
  onClose, 
  metric, 
  title, 
  data, 
  unit, 
  optimalRange, 
  interventions = [] 
}: DeepDiveChartProps) {
  const [hoveredIntervention, setHoveredIntervention] = useState<number | null>(null);

  if (!isOpen) return null;

  const getMetricColor = () => {
    switch (metric) {
      case 'bloodPressure': return '#0066cc';
      case 'adherence': return '#22c55e';
      default: return '#0066cc';
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const intervention = interventions.find(i => i.week === label);
      return (
        <div className="bg-card p-4 rounded-lg shadow-[var(--shadow-medium)] border border-border">
          <p className="font-semibold text-foreground">Week {label}</p>
          <p className="text-chart-primary">
            {title}: {payload[0].value} {unit}
          </p>
          {intervention && (
            <div className="mt-2 p-2 rounded bg-primary/10">
              <p className="font-medium text-primary text-sm">{intervention.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{intervention.description}</p>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const InterventionDot = ({ cx, cy, payload }: any) => {
    const intervention = interventions.find(i => i.week === payload.week);
    if (!intervention) return null;

    return (
      <g>
        <line
          x1={cx}
          y1={0}
          x2={cx}
          y2="100%"
          stroke="#0066cc"
          strokeWidth={2}
          strokeDasharray="5,5"
          opacity={0.6}
        />
        <circle
          cx={cx}
          cy={cy}
          r={6}
          fill="#0066cc"
          stroke="#ffffff"
          strokeWidth={2}
          className="cursor-pointer"
          onMouseEnter={() => setHoveredIntervention(intervention.week)}
          onMouseLeave={() => setHoveredIntervention(null)}
        />
        {hoveredIntervention === intervention.week && (
          <foreignObject x={cx - 100} y={cy - 80} width={200} height={70}>
            <div className="bg-primary text-primary-foreground p-2 rounded text-xs">
              <p className="font-medium">{intervention.title}</p>
              <p>{intervention.description}</p>
            </div>
          </foreignObject>
        )}
      </g>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{title} Trend Analysis</h2>
              <p className="text-muted-foreground">32-week comprehensive view with interventions</p>
            </div>
          </div>
          <Button variant="outline" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6">
          {/* Chart */}
          <div className="mb-6">
            <div style={{ width: '100%', height: '400px' }}>
              <ResponsiveContainer>
                <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3,3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="week" 
                    stroke="#64748b"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `W${value}`}
                  />
                  <YAxis 
                    stroke="#64748b"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `${value}${unit}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  
                  {/* Optimal range shading */}
                  {optimalRange && (
                    <ReferenceArea
                      y1={optimalRange.min}
                      y2={optimalRange.max}
                      fill="#22c55e"
                      fillOpacity={0.1}
                      stroke="#22c55e"
                      strokeOpacity={0.3}
                    />
                  )}
                  
                  {/* Optimal range reference lines */}
                  {optimalRange && (
                    <>
                      <ReferenceLine 
                        y={optimalRange.max} 
                        stroke="#22c55e" 
                        strokeDasharray="5,5" 
                        label={{ value: "Target Max", position: "insideTopRight" }}
                      />
                      <ReferenceLine 
                        y={optimalRange.min} 
                        stroke="#22c55e" 
                        strokeDasharray="5,5"
                        label={{ value: "Target Min", position: "insideBottomRight" }}
                      />
                    </>
                  )}

                  {/* Main data line */}
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={getMetricColor()}
                    strokeWidth={3}
                    dot={<InterventionDot />}
                    activeDot={{ r: 8, fill: getMetricColor() }}
                  />
                  
                  {/* Intervention markers */}
                  {interventions.map((intervention) => (
                    <ReferenceLine
                      key={intervention.week}
                      x={intervention.week}
                      stroke="#0066cc"
                      strokeWidth={2}
                      strokeDasharray="8,4"
                      label={{
                        value: "📋",
                        position: "top",
                        style: { fontSize: '16px' }
                      }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Legend and Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart Legend */}
            <Card className="p-4 bg-muted/20">
              <div className="flex items-center gap-2 mb-4">
                <Info className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">Chart Legend</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-0.5" style={{ backgroundColor: getMetricColor() }}></div>
                  <span className="text-sm text-foreground">{title} Values</span>
                </div>
                
                {optimalRange && (
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-health-excellent/20 border border-health-excellent/30"></div>
                    <span className="text-sm text-foreground">Optimal Range ({optimalRange.min}-{optimalRange.max} {unit})</span>
                  </div>
                )}
                
                <div className="flex items-center gap-3">
                  <div className="w-4 h-0.5 bg-primary" style={{ borderStyle: 'dashed' }}></div>
                  <span className="text-sm text-foreground">Interventions & Decisions</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-sm">📋</span>
                  <span className="text-sm text-foreground">Key Decision Points</span>
                </div>
              </div>
            </Card>

            {/* Interventions Summary */}
            <Card className="p-4 bg-muted/20">
              <div className="flex items-center gap-2 mb-4">
                <Target className="h-5 w-5 text-chart-secondary" />
                <h3 className="font-semibold text-foreground">Key Interventions ({interventions.length})</h3>
              </div>
              
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {interventions.map((intervention, index) => (
                  <div key={index} className="p-3 rounded-lg bg-primary/5 border-l-4 border-primary">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-primary">Week {intervention.week}</span>
                    </div>
                    <h4 className="font-medium text-foreground text-sm">{intervention.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{intervention.description}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
}