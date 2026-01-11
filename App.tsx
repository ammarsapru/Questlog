import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { WeeklyView } from './components/WeeklyView';
import { MonthlyView } from './components/MonthlyView';
import { TaskModal } from './components/TaskModal';
import { INITIAL_TASKS } from './constants';
import { Task, ViewMode } from './types';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('weekly');
  
  // Date State
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleCompleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  // Date Navigation Handlers
  const handlePrevDate = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'weekly') {
      newDate.setDate(currentDate.getDate() - 7);
    } else {
      newDate.setMonth(currentDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  const handleNextDate = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'weekly') {
      newDate.setDate(currentDate.getDate() + 7);
    } else {
      newDate.setMonth(currentDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  // Open Modal for New Task
  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  // Open Modal for Editing
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // Save Task (Create or Update)
  const handleSaveTask = (taskData: Omit<Task, 'id'> | Task) => {
    if ('id' in taskData && taskData.id) {
      // Update existing
      setTasks(prev => prev.map(t => (t.id === taskData.id ? (taskData as Task) : t)));
    } else {
      // Create new
      const newTask: Task = {
        ...taskData,
        id: Date.now().toString(), // Simple ID generation
      } as Task;
      setTasks(prev => [...prev, newTask]);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-white text-black overflow-hidden">
      <Header 
        isSidebarOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar}
        viewMode={viewMode}
        setViewMode={setViewMode}
        currentDate={currentDate}
        onPrevDate={handlePrevDate}
        onNextDate={handleNextDate}
      />
      
      <main className="flex-1 flex overflow-hidden">
        <Sidebar 
          isOpen={isSidebarOpen} 
          tasks={tasks} 
          onCompleteTask={handleCompleteTask}
          onAddTask={handleAddTask}
          onEditTask={handleEditTask}
        />
        
        {/* Main Content Area */}
        <section className="flex-1 flex flex-col relative overflow-hidden transition-all duration-300">
           {viewMode === 'weekly' ? (
             <WeeklyView currentDate={currentDate} />
           ) : (
             <MonthlyView currentDate={currentDate} />
           )}
        </section>
      </main>

      {/* Task Modal Overlay */}
      <TaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveTask}
        initialTask={editingTask}
      />
    </div>
  );
};

export default App;
