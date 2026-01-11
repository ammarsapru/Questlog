import React, { useMemo } from 'react';
import { DAYS } from '../constants';

interface MonthlyViewProps {
  currentDate: Date;
}

export const MonthlyView: React.FC<MonthlyViewProps> = ({ currentDate }) => {
  
  const gridDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // First day of the month
    const firstDayOfMonth = new Date(year, month, 1);
    // Number of days in the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Day index of the first day (0 = Sunday, etc.)
    const startDayIndex = firstDayOfMonth.getDay();

    const days = [];

    // Fill previous month padding
    for (let i = 0; i < startDayIndex; i++) {
        days.push({ dayNum: null, isCurrentMonth: false });
    }

    // Fill current month days
    for (let i = 1; i <= daysInMonth; i++) {
        days.push({ dayNum: i, isCurrentMonth: true });
    }

    // Fill next month padding to complete the grid (up to 35 or 42 cells)
    // We'll target 35 (5 rows) or 42 (6 rows) depending on needs. 
    // Standard calendar often needs 6 rows to cover all possibilities (e.g. 1st is Saturday, 31 days).
    const remaining = 42 - days.length;
    for (let i = 0; i < remaining; i++) {
        days.push({ dayNum: null, isCurrentMonth: false });
    }
    
    return days;
  }, [currentDate]);

  return (
    <div className="flex-1 h-full bg-white flex flex-col overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-7 border-b border-black">
            {DAYS.map((day) => (
                <div key={day} className="p-3 text-center border-r border-black last:border-r-0 font-bold uppercase text-sm">
                    {day}
                </div>
            ))}
        </div>
        
        {/* Calendar Grid */}
        <div className="flex-1 grid grid-cols-7 grid-rows-6">
            {gridDays.map((cell, i) => {
                const isRightEdge = (i + 1) % 7 === 0;
                const isBottomEdge = i >= 35; // Last row

                return (
                    <div 
                        key={i} 
                        className={`
                            border-b border-r border-black p-2 relative group hover:bg-gray-50 transition-colors
                            ${isRightEdge ? 'border-r-0' : ''}
                            ${isBottomEdge ? 'border-b-0' : ''}
                        `}
                    >
                        {cell.isCurrentMonth && (
                            <>
                                <span className={`text-sm font-medium ${cell.dayNum === currentDate.getDate() && new Date().getMonth() === currentDate.getMonth() && new Date().getFullYear() === currentDate.getFullYear() ? 'bg-black text-white w-6 h-6 rounded-full flex items-center justify-center' : ''}`}>
                                    {cell.dayNum}
                                </span>
                                
                                {/* Mock Recurring Events Visuals based on week day */}
                                {/* Logic: Map i % 7 to match schedule items? For now keeping abstract dots */}
                                <div className="mt-2 space-y-1">
                                    {(i % 7 === 1 || i % 7 === 2 || i % 7 === 3) && cell.dayNum! % 2 !== 0 && (
                                        <div className="h-1.5 w-full bg-red-500/80 rounded-none"></div>
                                    )}
                                    {(i % 7 === 1 || i % 7 === 3 || i % 7 === 5) && cell.dayNum! % 3 === 0 && (
                                        <div className="h-1.5 w-full bg-blue-500/80 rounded-none"></div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                );
            })}
        </div>
    </div>
  );
};
