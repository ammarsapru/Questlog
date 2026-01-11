import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Task } from '../types';
import { TaskCard } from './TaskCard';

interface SidebarProps {
  isOpen: boolean;
  tasks: Task[];
  onCompleteTask: (id: string) => void;
  onAddTask: () => void;
  onEditTask: (task: Task) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  tasks, 
  onCompleteTask,
  onAddTask,
  onEditTask
}) => {
  return (
    <motion.aside
      initial={{ width: 320, opacity: 1 }}
      animate={{ 
        width: isOpen ? 320 : 0,
        opacity: isOpen ? 1 : 0
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="h-full border-r border-black overflow-hidden flex-shrink-0 bg-white relative z-10"
    >
      <div className="w-[320px] h-full flex flex-col">
        <div className="p-4 border-b border-black bg-gray-50 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold uppercase tracking-widest">Active Tasks</h2>
            <p className="text-xs text-gray-500 mt-1">{tasks.length} PENDING</p>
          </div>
          <button 
            onClick={onAddTask}
            className="w-8 h-8 flex items-center justify-center border border-black bg-black text-white hover:bg-white hover:text-black transition-colors"
            title="New Quest"
          >
            <Plus size={18} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {tasks.map((task) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onComplete={onCompleteTask}
                onEdit={onEditTask}
              />
            ))}
          </AnimatePresence>
          
          {tasks.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="text-center py-10 text-gray-400 italic"
            >
              All quests completed.
            </motion.div>
          )}
        </div>
      </div>
    </motion.aside>
  );
};
