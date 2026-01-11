import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save } from 'lucide-react';
import { Task } from '../types';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Omit<Task, 'id'> | Task) => void;
  initialTask?: Task | null;
}

export const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSave, initialTask }) => {
  const [formData, setFormData] = useState({
    title: '',
    dueDate: '',
    dueTime: '',
    description: ''
  });

  useEffect(() => {
    if (initialTask) {
      setFormData({
        title: initialTask.title,
        dueDate: initialTask.dueDate,
        dueTime: initialTask.dueTime,
        description: initialTask.description
      });
    } else {
      setFormData({
        title: '',
        dueDate: '',
        dueTime: '',
        description: ''
      });
    }
  }, [initialTask, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: initialTask?.id || '' 
    } as Task);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-white/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-lg bg-white border border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-black hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold uppercase tracking-wide mb-6 border-b border-black pb-2">
              {initialTask ? 'Edit Quest' : 'New Quest'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider block">Quest Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-3 border border-black bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-black transition-all"
                  placeholder="Enter task title..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider block">Due Date</label>
                  <input
                    type="date"
                    required
                    value={formData.dueDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                    className="w-full p-3 border border-black bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-black transition-all font-mono text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider block">Time</label>
                  <input
                    type="time"
                    required
                    value={formData.dueTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, dueTime: e.target.value }))}
                    className="w-full p-3 border border-black bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-black transition-all font-mono text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider block">Description</label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full p-3 border border-black bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-black transition-all resize-none"
                  placeholder="Describe your quest details..."
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button 
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 bg-black text-white font-bold uppercase hover:bg-gray-800 active:scale-95 transition-all"
                >
                  <Save size={18} />
                  Save Quest
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
