import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onComplete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onComplete, onEdit }) => {
  // States: idle -> checked (icon shows) -> completed (green bg)
  const [status, setStatus] = useState<'idle' | 'checked' | 'completed'>('idle');

  const handleCircleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (status !== 'idle') return;

    // Step 1: Show checkmark instantly (visual feedback handled by hover state until click)
    setStatus('checked');

    // Step 2: Turn green after short delay
    setTimeout(() => {
      setStatus('completed');
    }, 400);

    // Step 3: Slide out after longer delay
    setTimeout(() => {
      onComplete(task.id);
    }, 1800);
  };

  const handleCardClick = () => {
    if (status === 'idle') {
      onEdit(task);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={
        status === 'completed' 
          ? { x: -300, opacity: 0 } 
          : { x: 0, opacity: 1, y: 0 }
      }
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 30,
        x: { duration: 0.6, delay: 1.2 },
        opacity: { duration: 0.6, delay: 1.2 }
      }}
      onClick={handleCardClick}
      className={`
        relative w-full border border-black p-4 mb-3 cursor-pointer group transition-colors duration-500
        ${status === 'completed' ? 'bg-[#2ecc71] border-[#2ecc71]' : 'bg-white hover:bg-gray-50'}
      `}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1 pr-4">
          <h3 className={`font-bold text-lg mb-1 ${status === 'completed' ? 'text-white' : 'text-black'}`}>
            {task.title}
          </h3>
          <p className={`text-xs uppercase tracking-wider ${status === 'completed' ? 'text-white/80' : 'text-gray-500'}`}>
            Due: {task.dueDate}
          </p>
        </div>
        
        {/* Timer/Check Circle */}
        <div 
          onClick={handleCircleClick}
          className={`
            group/circle flex items-center justify-center w-12 h-12 rounded-full border border-black flex-shrink-0 transition-all duration-300 z-10 
            ${status === 'completed' ? '!bg-white !border-transparent !text-[#2ecc71]' : 'bg-white text-black'}
          `}
        >
           {status !== 'idle' ? (
             <motion.div
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               transition={{ type: "spring", stiffness: 500, damping: 20 }}
             >
               <Check size={24} strokeWidth={3} />
             </motion.div>
           ) : (
             <div className="relative w-full h-full flex items-center justify-center">
                {/* Normal State: Time */}
                <span className="text-[11px] font-mono font-bold leading-tight text-center transition-opacity duration-300 group-hover/circle:opacity-0">
                  {task.dueTime}
                </span>
                
                {/* Hover State: Checkmark (Smooth Transition) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 scale-50 group-hover/circle:opacity-100 group-hover/circle:scale-100 transition-all duration-300 ease-out">
                  <Check size={24} strokeWidth={3} className="text-black" />
                </div>
             </div>
           )}
        </div>
      </div>
      
      {/* Hover Effect Border for Card */}
      {status === 'idle' && (
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-black/5 pointer-events-none" />
      )}
    </motion.div>
  );
};
