import React, { useState } from "react";
import { Header } from "../components/Header";
import { Card } from "../components/Card";
import { SpeechBubble } from "../components/SpeechBubble";
import { Check, Plus, Coins, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";
import { useUserStore } from "../store/userStore";
import { ConfirmModal } from "../components/ConfirmModal";

export default function Habits() {
  const { coins, addCoins, habits, addHabit, deleteHabit, toggleHabitDay } = useUserStore();
  const [showReward, setShowReward] = useState(false);
  const [newHabitName, setNewHabitName] = useState("");
  const [habitToDelete, setHabitToDelete] = useState<string | null>(null);

  const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];

  const handleToggle = (habitId: string, dayIndex: number) => {
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return;
    
    const wasDone = habit.days[dayIndex];
    toggleHabitDay(habitId, dayIndex);
    
    if (!wasDone) {
      addCoins(10);
      setShowReward(true);
      setTimeout(() => setShowReward(false), 2000);
    } else {
      // If they uncheck it, remove the coins they earned
      addCoins(-10);
    }
  };

  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newHabitName.trim()) {
      addHabit(newHabitName.trim());
      setNewHabitName("");
    }
  };

  const confirmDelete = () => {
    if (habitToDelete) {
      deleteHabit(habitToDelete);
      setHabitToDelete(null);
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="flex justify-between items-center px-2">
        <Header title="Habit Tracker" subtitle="Stay Consistent" />
        <div className="flex items-center gap-2 bg-[#FFFDF9] border-2 border-[#8D6E63] rounded-full px-3 py-1 shadow-[2px_2px_0px_#8D6E63]">
          <Coins size={16} className="text-[#E65100]" />
          <span className="font-bold text-[#5D4037]">{coins}</span>
        </div>
      </div>

      <Card className="p-4 overflow-x-auto">
        <div className="min-w-[320px]">
          {/* Header Row */}
          <div className="flex mb-4 border-b-2 border-dashed border-[#8D6E63] pb-2">
            <div className="w-24 shrink-0 font-bold text-xs uppercase text-[#8D6E63] tracking-wider">Habit</div>
            <div className="flex-1 flex justify-between px-2">
              {daysOfWeek.map((day, i) => (
                <div key={i} className="w-6 text-center font-bold text-xs text-[#8D6E63]">{day}</div>
              ))}
            </div>
            <div className="w-6 shrink-0"></div>
          </div>

          {/* Habit Rows */}
          <div className="space-y-4">
            {habits.map((habit) => (
              <div key={habit.id} className="flex items-center group">
                <div className="w-24 shrink-0 font-medium text-sm text-[#5D4037] truncate pr-2" title={habit.name}>
                  {habit.name}
                </div>
                <div className="flex-1 flex justify-between px-2">
                  {habit.days.map((isDone, i) => (
                    <motion.button
                      key={i}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleToggle(habit.id, i)}
                      className={cn(
                        "w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors relative",
                        isDone 
                          ? "bg-[#2E7D32] border-[#2E7D32] text-[#FFFDF9]" 
                          : "bg-[#FFFDF9] border-[#D7CCC8] hover:border-[#8D6E63]"
                      )}
                    >
                      {isDone && <Check size={14} strokeWidth={3} />}
                    </motion.button>
                  ))}
                </div>
                <button 
                  onClick={() => setHabitToDelete(habit.id)}
                  className="w-6 shrink-0 flex justify-center text-[#D7CCC8] hover:text-[#C62828] transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <form onSubmit={handleAddHabit} className="flex gap-2">
        <input 
          type="text" 
          value={newHabitName}
          onChange={(e) => setNewHabitName(e.target.value)}
          placeholder="New habit name..."
          className="flex-1 px-4 py-3 rounded-2xl border-2 border-[#D7CCC8] focus:border-[#8D6E63] outline-none text-[#5D4037] placeholder-[#D7CCC8] bg-[#FFFDF9]"
        />
        <button 
          type="submit"
          disabled={!newHabitName.trim()}
          className="px-4 py-3 rounded-2xl bg-[#E8F5E9] border-2 border-[#2E7D32] text-[#2E7D32] font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#C8E6C9] transition-colors"
        >
          <Plus size={20} />
        </button>
      </form>

      {showReward && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50">
          <SpeechBubble text="+10 Coins! Great job!" />
        </div>
      )}

      <ConfirmModal
        isOpen={!!habitToDelete}
        title="Delete Habit?"
        message="Are you sure you want to delete this habit? You'll lose all progress for it."
        onConfirm={confirmDelete}
        onCancel={() => setHabitToDelete(null)}
      />
    </div>
  );
}
