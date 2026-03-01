import React, { useState } from "react";
import { Header } from "../components/Header";
import { Card } from "../components/Card";
import { Calendar as CalendarIcon, CheckSquare, Coins, Plus, Trash2 } from "lucide-react";
import { useUserStore } from "../store/userStore";
import { ConfirmModal } from "../components/ConfirmModal";

export default function Planner() {
  const { coins, tasks, addTask, toggleTask, deleteTask, addCoins } = useUserStore();
  const [newTaskText, setNewTaskText] = useState("");
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const todayName = days[new Date().getDay()];

  // Get tasks for today
  const todaysTasks = tasks.filter(t => t.day === todayName);

  const handleToggleTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    toggleTask(taskId);

    if (!task.done) {
      addCoins(5); // Reward for completing a task
    } else {
      addCoins(-5); // Remove reward if unchecked
    }
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskText.trim()) {
      addTask(newTaskText.trim(), todayName);
      setNewTaskText("");
    }
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete);
      setTaskToDelete(null);
    }
  };


  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="flex justify-between items-center px-2">
        <Header title="Weekly Planner" subtitle="Plan Your Week" />
        <div className="flex items-center gap-2 bg-[#FFFDF9] border-2 border-[#8D6E63] rounded-full px-3 py-1 shadow-[2px_2px_0px_#8D6E63]">
          <Coins size={16} className="text-[#E65100]" />
          <span className="font-bold text-[#5D4037]">{coins}</span>
        </div>
      </div>

      <Card title={`${todayName}'s Priorities`} icon={CalendarIcon}>
        <div className="space-y-3 mb-4">
          {todaysTasks.length === 0 && (
            <p className="text-sm text-[#8D6E63] text-center py-2">No priorities set for today.</p>
          )}
          {todaysTasks.map(task => (
            <div 
              key={task.id} 
              className="flex items-center gap-3 p-3 rounded-2xl bg-[#FDFBF7] border border-[#D7CCC8] hover:border-[#8D6E63] transition-colors group"
            >
              <button 
                onClick={() => handleToggleTask(task.id)}
                className={`w-6 h-6 shrink-0 rounded-md border-2 flex items-center justify-center transition-colors ${task.done ? 'bg-[#2E7D32] border-[#2E7D32] text-[#FFFDF9]' : 'bg-[#FFFDF9] border-[#D7CCC8]'}`}
              >
                {task.done && <CheckSquare size={14} strokeWidth={3} />}
              </button>
              <span 
                onClick={() => handleToggleTask(task.id)}
                className={`flex-1 text-sm font-medium cursor-pointer ${task.done ? 'text-[#8D6E63] line-through' : 'text-[#5D4037]'}`}
              >
                {task.text}
              </span>
              <button 
                onClick={() => setTaskToDelete(task.id)}
                className="text-[#D7CCC8] hover:text-[#C62828] transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        <form onSubmit={handleAddTask} className="flex gap-2">
          <input 
            type="text" 
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Add a priority..."
            className="flex-1 px-3 py-2 text-sm rounded-xl border-2 border-[#D7CCC8] focus:border-[#8D6E63] outline-none text-[#5D4037] placeholder-[#D7CCC8] bg-[#FFFDF9]"
          />
          <button 
            type="submit"
            disabled={!newTaskText.trim()}
            className="px-3 py-2 rounded-xl bg-[#E8F5E9] border-2 border-[#2E7D32] text-[#2E7D32] font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#C8E6C9] transition-colors"
          >
            <Plus size={16} />
          </button>
        </form>
      </Card>

      <ConfirmModal
        isOpen={!!taskToDelete}
        title="Delete Priority?"
        message="Are you sure you want to delete this priority?"
        onConfirm={confirmDelete}
        onCancel={() => setTaskToDelete(null)}
      />
    </div>
  );
}
