import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MessageSquare, Activity, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface WeeklySummary {
  week: number;
  current_symptoms: string[];
  key_decisions: string[];
  major_event?: string;
  adherence_level: number;
}

interface DeviceStatus {
  status: 'active' | 'inactive' | 'error';
  last_sync: string;
  battery_level?: number;
  detected_issues?: string[];
}

interface MemberQuestions {
  week: number;
  questions: string[];
  ai_summary: string;
}

interface WeeklySnapshotProps {
  selectedWeek: number;
  weeklySummary: WeeklySummary;
  deviceStatus: DeviceStatus;
  memberQuestions: MemberQuestions;
}

export function WeeklySnapshot({ selectedWeek, weeklySummary, deviceStatus, memberQuestions }: WeeklySnapshotProps) {
  const getAdherenceColor = (level: number) => {
    if (level >= 0.9) return 'health-excellent';
    if (level >= 0.8) return 'health-good';
    if (level >= 0.7) return 'health-warning';
    return 'health-critical';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-health-excellent" />;
      case 'error': return <AlertCircle className="h-4 w-4 text-health-critical" />;
      default: return <Clock className="h-4 w-4 text-health-warning" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold text-foreground">Week {selectedWeek} Snapshot</h2>
        </div>
        <Badge 
          variant="outline" 
          className={`bg-${getAdherenceColor(weeklySummary.adherence_level)}/10 text-${getAdherenceColor(weeklySummary.adherence_level)} border-${getAdherenceColor(weeklySummary.adherence_level)}/20`}
        >
          {Math.round(weeklySummary.adherence_level * 100)}% Adherence
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Weekly Summary */}
        <div className="space-y-6">
          {/* Current Symptoms */}
          <Card className="p-6 bg-gradient-to-br from-card to-muted/10 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-health-warning/10">
                <AlertCircle className="h-5 w-5 text-health-warning" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Current Symptoms</h3>
            </div>
            
            <div className="space-y-2">
              {weeklySummary.current_symptoms.length > 0 ? (
                weeklySummary.current_symptoms.map((symptom, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-health-warning mt-2 flex-shrink-0"></span>
                    <p className="text-sm text-foreground">{symptom}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground italic">No symptoms reported this week</p>
              )}
            </div>
          </Card>

          {/* Key Decisions */}
          <Card className="p-6 bg-gradient-to-br from-card to-muted/10 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Activity className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Key Decisions & Interventions</h3>
            </div>
            
            <div className="space-y-3">
              {weeklySummary.key_decisions.map((decision, index) => (
                <div key={index} className="p-3 rounded-lg bg-primary/5 border-l-4 border-primary">
                  <p className="text-sm text-foreground">{decision}</p>
                </div>
              ))}
            </div>

            {weeklySummary.major_event && (
              <div className="mt-4 p-3 rounded-lg bg-health-excellent/10 border border-health-excellent/20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">📋</span>
                  <span className="font-medium text-health-excellent">Major Event</span>
                </div>
                <p className="text-sm text-foreground">{weeklySummary.major_event}</p>
              </div>
            )}
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Device Status */}
          <Card className="p-6 bg-gradient-to-br from-card to-muted/10 shadow-[var(--shadow-soft)]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-chart-primary/10">
                  {getStatusIcon(deviceStatus.status)}
                </div>
                <h3 className="text-lg font-semibold text-foreground">Device Status</h3>
              </div>
              <Badge variant={deviceStatus.status === 'active' ? 'default' : 'destructive'} className="capitalize">
                {deviceStatus.status}
              </Badge>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Last Sync</span>
                <span className="text-sm font-medium text-foreground">{deviceStatus.last_sync}</span>
              </div>
              
              {deviceStatus.battery_level && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Battery Level</span>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${
                          deviceStatus.battery_level > 20 ? 'bg-health-excellent' : 'bg-health-critical'
                        }`}
                        style={{ width: `${deviceStatus.battery_level}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-foreground">{deviceStatus.battery_level}%</span>
                  </div>
                </div>
              )}

              {deviceStatus.detected_issues && deviceStatus.detected_issues.length > 0 && (
                <div className="mt-3 p-3 rounded-lg bg-health-critical/10 border border-health-critical/20">
                  <h4 className="font-medium text-health-critical mb-2">Detected Issues</h4>
                  <ul className="space-y-1">
                    {deviceStatus.detected_issues.map((issue, index) => (
                      <li key={index} className="text-sm text-muted-foreground">• {issue}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Card>

          {/* Q&A Highlights */}
          <Card className="p-6 bg-gradient-to-br from-card to-muted/10 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-chart-secondary/10">
                <MessageSquare className="h-5 w-5 text-chart-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Q&A Highlights</h3>
            </div>

            {memberQuestions.questions.length > 0 ? (
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-chart-secondary/5 border border-chart-secondary/10">
                  <h4 className="font-medium text-chart-secondary mb-2">AI Summary</h4>
                  <p className="text-sm text-foreground">{memberQuestions.ai_summary}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Recent Questions</h4>
                  {memberQuestions.questions.slice(0, 3).map((question, index) => (
                    <div key={index} className="p-2 rounded bg-muted/30">
                      <p className="text-sm text-foreground">"{question}"</p>
                    </div>
                  ))}
                  {memberQuestions.questions.length > 3 && (
                    <p className="text-xs text-muted-foreground">
                      +{memberQuestions.questions.length - 3} more questions this week
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground italic">No questions asked this week</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}