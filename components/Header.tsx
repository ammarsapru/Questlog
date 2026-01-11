import React, { useState, useEffect } from 'react';
import { Menu, Calendar, LayoutGrid, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { ViewMode } from '../types';

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  currentDate: Date;
  onPrevDate: () => void;
  onNextDate: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  isSidebarOpen, 
  toggleSidebar, 
  viewMode, 
  setViewMode,
  currentDate,
  onPrevDate,
  onNextDate
}) => {
  const [time, setTime] = useState(new Date());
  const [isHoveringDate, setIsHoveringDate] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Helper to get week range text
  const getWeekRangeText = () => {
    const startOfWeek = new Date(currentDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day; // Adjust to Sunday
    startOfWeek.setDate(diff);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const format = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `${format(startOfWeek)} — ${format(endOfWeek)}`;
  };

  // Helper to get Week Number
  const getWeekNumber = (d: Date) => {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return weekNo.toString().padStart(2, '0');
  };

  const getMonthText = () => {
    return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <header className="h-16 border-b border-black flex items-center bg-white flex-shrink-0 z-50 relative">
      {/* Left Partition: Logo & Sidebar Toggle */}
      <div className="w-[320px] flex items-center h-full border-r border-black px-4 flex-shrink-0">
        <button 
          onClick={toggleSidebar}
          className="mr-4 p-2 hover:bg-black hover:text-white transition-colors border border-transparent hover:border-black active:scale-95 duration-100"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-2xl font-bold tracking-tighter uppercase">QuestLog</h1>
      </div>

      {/* Center Partition: Date & View Controls */}
      <div className="flex-1 flex justify-between items-center px-6">
        {/* Navigation Region */}
        <div 
          className="flex items-center justify-center relative group cursor-pointer select-none px-12 py-2"
          onMouseEnter={() => setIsHoveringDate(true)}
          onMouseLeave={() => setIsHoveringDate(false)}
        >
            {/* Left Arrow */}
            <button 
              onClick={(e) => { e.stopPropagation(); onPrevDate(); }}
              className={`
                p-1 hover:bg-gray-200 rounded-full transition-all duration-300 absolute left-2
                ${isHoveringDate ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}
              `}
            >
              <ChevronLeft size={20} className="text-gray-500" />
            </button>

            {/* Date Display */}
            <div className="flex items-center">
              <div className="text-xl font-medium tracking-tight w-48 text-center">
                  {viewMode === 'weekly' ? getWeekRangeText() : getMonthText()}
              </div>
              
              {viewMode === 'weekly' && (
                <>
                  <div className="h-6 w-px bg-black rotate-12 mx-2"></div>
                  <div className="text-sm text-gray-500 uppercase font-bold tracking-widest">
                      Week {getWeekNumber(currentDate)}
                  </div>
                </>
              )}
            </div>

            {/* Right Arrow */}
            <button 
              onClick={(e) => { e.stopPropagation(); onNextDate(); }}
              className={`
                p-1 hover:bg-gray-200 rounded-full transition-all duration-300 absolute right-2
                ${isHoveringDate ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}
              `}
            >
              <ChevronRight size={20} className="text-gray-500" />
            </button>
        </div>

        {/* View Toggles */}
        <div className="flex gap-2">
            <button 
                onClick={() => setViewMode('weekly')}
                className={`
                    flex items-center gap-2 px-4 py-2 text-sm font-bold uppercase border border-black transition-all
                    ${viewMode === 'weekly' ? 'bg-black text-white shadow-[4px_4px_0px_0px_rgba(100,100,100,0.5)]' : 'bg-white text-black hover:bg-gray-100'}
                `}
            >
                <LayoutGrid size={16} /> Week
            </button>
            <button 
                onClick={() => setViewMode('monthly')}
                className={`
                    flex items-center gap-2 px-4 py-2 text-sm font-bold uppercase border border-black transition-all
                    ${viewMode === 'monthly' ? 'bg-black text-white shadow-[4px_4px_0px_0px_rgba(100,100,100,0.5)]' : 'bg-white text-black hover:bg-gray-100'}
                `}
            >
                <Calendar size={16} /> Month
            </button>
        </div>
      </div>

      {/* Right Partition: Clock */}
      <div className="w-48 h-full border-l border-black flex items-center justify-center bg-black text-white px-4">
        <Clock size={18} className="mr-3 animate-pulse" />
        <span className="text-xl font-mono font-bold tracking-widest">
            {formatTime(time)}
        </span>
      </div>
    </header>
  );
};
