export interface Task {
  id: string;
  title: string;
  dueDate: string; // YYYY-MM-DD
  dueTime: string; // HH:MM
  description: string;
}

export interface ScheduleItem {
  id: string;
  title: string;
  dayIndex: number; // 0 = Sunday, 1 = Monday...
  startHour: number; // 24h format (e.g., 9.5 for 9:30 AM)
  duration: number; // in hours
  type: 'STAT414' | 'ENGL15' | 'MATH232' | 'OTHER';
}

export type ViewMode = 'weekly' | 'monthly';
