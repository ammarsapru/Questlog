import { ScheduleItem, Task } from './types';

export const INITIAL_TASKS: Task[] = [
  { 
    id: '1', 
    title: 'Calculus III PSet', 
    dueDate: '2025-01-12', 
    dueTime: '14:30', 
    description: 'Complete problems 1-15 in Chapter 4, focusing on partial derivatives.' 
  },
  { 
    id: '2', 
    title: 'Design Sys Review', 
    dueDate: '2025-01-13', 
    dueTime: '09:45', 
    description: 'Audit the button components and color palette for accessibility.' 
  },
  { 
    id: '3', 
    title: 'Lab Report Writeup', 
    dueDate: '2025-01-15', 
    dueTime: '16:00', 
    description: 'Draft the abstract and methodology sections for the Physics lab.' 
  },
  { 
    id: '4', 
    title: 'Email Professor', 
    dueDate: '2025-01-16', 
    dueTime: '11:15', 
    description: 'Request extension for the midterm project due to schedule conflict.' 
  },
  { 
    id: '5', 
    title: 'Prepare Presentation', 
    dueDate: '2025-01-18', 
    dueTime: '13:00', 
    description: 'Create slides for the group project and practice the speech.' 
  },
];

export const SCHEDULE_ITEMS: ScheduleItem[] = [
  { id: 's1', title: 'STAT 414', dayIndex: 1, startHour: 9, duration: 1.25, type: 'STAT414' },
  { id: 'm1', title: 'MATH 232', dayIndex: 1, startHour: 11, duration: 1.25, type: 'MATH232' },
  { id: 'e1', title: 'ENGL 15', dayIndex: 1, startHour: 14, duration: 1.5, type: 'ENGL15' },
  { id: 's2', title: 'STAT 414', dayIndex: 2, startHour: 9, duration: 1.25, type: 'STAT414' },
  { id: 'study1', title: 'Deep Work', dayIndex: 2, startHour: 13, duration: 2, type: 'OTHER' },
  { id: 's3', title: 'STAT 414', dayIndex: 3, startHour: 9, duration: 1.25, type: 'STAT414' },
  { id: 'm2', title: 'MATH 232', dayIndex: 3, startHour: 11, duration: 1.25, type: 'MATH232' },
  { id: 'e2', title: 'ENGL 15', dayIndex: 3, startHour: 14, duration: 1.5, type: 'ENGL15' },
  { id: 'm3', title: 'MATH 232', dayIndex: 4, startHour: 10, duration: 1.5, type: 'MATH232' },
  { id: 'e3', title: 'ENGL 15', dayIndex: 5, startHour: 14, duration: 1.5, type: 'ENGL15' },
];

export const COURSE_COLORS = {
  STAT414: 'bg-red-500 text-white',
  ENGL15: 'bg-blue-500 text-white',
  MATH232: 'bg-yellow-400 text-black',
  OTHER: 'bg-gray-200 text-black',
};

export const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Time Grid Logic: 6:00 AM to 12:00 PM Midnight (24:00)
export const START_HOUR = 6;
export const END_HOUR = 24;

export const TIME_SLOTS = Array.from({ length: (END_HOUR - START_HOUR) * 4 }, (_, i) => {
  const totalMinutes = i * 15;
  const hour = START_HOUR + Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return {
    hour,
    minutes,
    formatted: `${hour}:${minutes.toString().padStart(2, '0')}`
  };
});
