import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TimelineEvent {
  week: number;
  major_event?: string;
  adherence_level: number;
  icon?: string;
}

interface HealthTimelineProps {
  weeks: TimelineEvent[];
  selectedWeek: number;
  onWeekSelect: (week: number) => void;
}

export function HealthTimeline({ weeks, selectedWeek, onWeekSelect }: HealthTimelineProps) {
  const getAdherenceColor = (level: number) => {
    if (level >= 0.9) return 'health-excellent';
    if (level >= 0.8) return 'health-good';
    if (level >= 0.7) return 'health-warning';
    return 'health-critical';
  };

  const getEventIcon = (event?: string) => {
    if (!event) return null;
    if (event.toLowerCase().includes('surgery') || event.toLowerCase().includes('procedure')) return '🏥';
    if (event.toLowerCase().includes('travel')) return '✈️';
    if (event.toLowerCase().includes('medication') || event.toLowerCase().includes('med')) return '💊';
    if (event.toLowerCase().includes('diet') || event.toLowerCase().includes('nutrition')) return '🥗';
    if (event.toLowerCase().includes('exercise') || event.toLowerCase().includes('workout')) return '💪';
    if (event.toLowerCase().includes('appointment') || event.toLowerCase().includes('visit')) return '👩‍⚕️';
    return '📋';
  };

  return (
    <div className="bg-gradient-to-r from-card to-chart-background p-6 rounded-xl shadow-[var(--shadow-medium)] mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-foreground">Rohan's Healthcare Journey</h2>
        <Badge variant="outline" className="bg-primary text-primary-foreground">
          32 Weeks Complete
        </Badge>
      </div>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute top-8 left-4 right-4 h-0.5 bg-border"></div>
        
        {/* Week markers */}
        <div className="flex justify-between items-start overflow-x-auto pb-4 gap-2">
          {weeks.map((week) => (
            <div
              key={week.week}
              className="relative flex flex-col items-center min-w-[60px] cursor-pointer group transition-all duration-300"
              onClick={() => onWeekSelect(week.week)}
            >
              {/* Event icon */}
              {week.major_event && (
                <div className="absolute -top-6 text-2xl animate-bounce">
                  {getEventIcon(week.major_event)}
                </div>
              )}
              
              {/* Week marker */}
              <div
                className={cn(
                  "w-4 h-4 rounded-full border-2 border-background transition-all duration-300 group-hover:scale-125",
                  selectedWeek === week.week ? "scale-125 shadow-[var(--shadow-medium)]" : "hover:scale-110",
                  `bg-${getAdherenceColor(week.adherence_level)}`
                )}
              />
              
              {/* Week number */}
              <span
                className={cn(
                  "text-xs mt-2 font-medium transition-colors duration-300",
                  selectedWeek === week.week ? "text-primary font-semibold" : "text-muted-foreground"
                )}
              >
                W{week.week}
              </span>
              
              {/* Adherence percentage */}
              <span className="text-xs text-muted-foreground mt-1">
                {Math.round(week.adherence_level * 100)}%
              </span>
            </div>
          ))}
        </div>
        
        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-6 p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-health-excellent"></div>
            <span className="text-sm text-muted-foreground">90-100%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-health-good"></div>
            <span className="text-sm text-muted-foreground">80-89%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-health-warning"></div>
            <span className="text-sm text-muted-foreground">70-79%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-health-critical"></div>
            <span className="text-sm text-muted-foreground">&lt;70%</span>
          </div>
        </div>
      </div>
    </div>
  );
}