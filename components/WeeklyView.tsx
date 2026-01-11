import React, { useMemo } from 'react';
import { DAYS, TIME_SLOTS, SCHEDULE_ITEMS, COURSE_COLORS, START_HOUR } from '../constants';

interface WeeklyViewProps {
  currentDate: Date;
}

export const WeeklyView: React.FC<WeeklyViewProps> = ({ currentDate }) => {
  const SLOT_HEIGHT = 30; // Height per 15-min slot
  const PIXELS_PER_HOUR = SLOT_HEIGHT * 4;

  // Calculate the dates for the current week (Sunday to Saturday)
  const weekDates = useMemo(() => {
    const startOfWeek = new Date(currentDate);
    const day = startOfWeek.getDay(); // 0 is Sunday
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);

    return DAYS.map((dayName, index) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + index);
      return {
        dayName,
        dateString: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      };
    });
  }, [currentDate]);

  return (
    <div className="flex-1 h-full overflow-y-auto relative bg-white">
      {/* Grid Header (Days) */}
      <div className="grid grid-cols-8 border-b border-black sticky top-0 bg-white z-20 shadow-sm">
        <div className="p-2 border-r border-black bg-gray-50 text-xs font-bold uppercase flex items-center justify-center">
          GMT-5
        </div>
        {weekDates.map((item, i) => (
          <div key={item.dayName} className={`p-2 border-r border-black text-center font-bold uppercase ${i === DAYS.length - 1 ? 'border-r-0' : ''}`}>
            {item.dayName}
            <div className="text-xs font-normal text-gray-500">{item.dateString}</div>
          </div>
        ))}
      </div>

      {/* Grid Body */}
      <div className="relative" style={{ height: `${TIME_SLOTS.length * SLOT_HEIGHT}px` }}>
        {/* Time Slots */}
        {TIME_SLOTS.map((slot) => (
          <div 
            key={`${slot.hour}-${slot.minutes}`} 
            className={`grid grid-cols-8 border-b ${slot.minutes === 0 ? 'border-gray-300' : 'border-gray-100'}`}
            style={{ height: `${SLOT_HEIGHT}px` }}
          >
             {/* Time Label */}
            <div className={`border-r border-black px-2 flex items-center justify-end text-[10px] font-mono bg-white/50 ${slot.minutes === 0 ? 'text-black font-bold' : 'text-gray-400'}`}>
              {slot.formatted}
            </div>
            {/* Day columns background */}
            {DAYS.map((_, i) => (
              <div key={i} className={`border-r border-gray-100 ${i === DAYS.length - 1 ? 'border-r-0' : ''}`}></div>
            ))}
          </div>
        ))}

        {/* Absolute Event Positioning */}
        {/* Recurring schedule items are rendered regardless of the specific week */}
        {SCHEDULE_ITEMS.map((item) => {
          const topOffset = (item.startHour - START_HOUR) * PIXELS_PER_HOUR; 
          const height = item.duration * PIXELS_PER_HOUR;
          const colIndex = item.dayIndex + 1; 

          return (
            <div
              key={item.id}
              className={`absolute border border-black p-2 flex flex-col justify-center overflow-hidden hover:z-50 transition-all hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer ${COURSE_COLORS[item.type]}`}
              style={{
                top: `${topOffset}px`,
                height: `${height}px`,
                left: `calc(${(colIndex / 8) * 100}%)`,
                width: `calc(${100 / 8}% - 1px)`,
                marginLeft: '1px'
              }}
            >
              <div className="text-xs font-bold leading-tight">{item.title}</div>
              <div className="text-[10px] opacity-90">{item.startHour.toFixed(2).replace('.',':')} - {(item.startHour + item.duration).toFixed(2).replace('.',':')}</div>
            </div>
          );
        })}
        
        {/* Current Time Indicator Line (Static for demo) */}
        <div 
          className="absolute left-[12.5%] right-0 border-t-2 border-red-500 z-30 pointer-events-none flex items-center"
          style={{ top: `${(13.5 - START_HOUR) * PIXELS_PER_HOUR}px` }} 
        >
            <div className="w-2 h-2 bg-red-500 rounded-full -ml-1"></div>
        </div>
      </div>
    </div>
  );
};
