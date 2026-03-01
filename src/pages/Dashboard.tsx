import { Header } from "../components/Header";
import { Card } from "../components/Card";
import { HelperCharacter } from "../components/HelperCharacter";
import { SpeechBubble } from "../components/SpeechBubble";
import { CheckCircle2, Star, Target, Coffee, Coins } from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "../store/userStore";

export default function Dashboard() {
  const { coins, equippedOutfit, habits, tasks } = useUserStore();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  // Calculate today's index (0 = Monday, 6 = Sunday)
  // JS getDay() returns 0 for Sunday, 1 for Monday
  const todayIndex = (new Date().getDay() + 6) % 7;
  
  const habitsDoneToday = habits.filter(h => h.days[todayIndex]).length;
  const totalHabits = habits.length;
  
  // Calculate dynamic streak (max 7 days)
  const currentWeekStreak = [0, 1, 2, 3, 4, 5, 6].filter(dayIndex => 
    habits.some(h => h.days[dayIndex])
  ).length;

  const pendingTasks = tasks.filter(t => !t.done).map(t => t.text);
  const displayTasks = pendingTasks.length > 0 ? pendingTasks.slice(0, 3) : ["All caught up for today!"];

  const isEndOfWeek = todayIndex === 6; // Sunday
  const showCongrats = isEndOfWeek && currentWeekStreak >= 5;

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="flex justify-between items-center px-2">
        <Header title="My Planner" subtitle={today} />
        <div className="flex items-center gap-2 bg-[#FFFDF9] border-2 border-[#8D6E63] rounded-full px-3 py-1 shadow-[2px_2px_0px_#8D6E63]">
          <Coins size={16} className="text-[#E65100]" />
          <span className="font-bold text-[#5D4037]">{coins}</span>
        </div>
      </div>

      {/* Hero Section */}
      <motion.div 
        initial={{ y: 0 }}
        animate={{ y: [-5, 5, -5] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="relative bg-[#FFFDF9] border-2 border-[#8D6E63] rounded-3xl p-6 shadow-[4px_4px_0px_#8D6E63] flex flex-col items-center text-center overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#E8F5E9] rounded-bl-full opacity-40 -z-0"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#FFE0B2] rounded-tr-full opacity-40 -z-0"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          {showCongrats ? (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="flex flex-col items-center"
            >
              <SpeechBubble text="Congratulations! You had an amazing week! 🎉" className="mb-2" />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <HelperCharacter outfit={equippedOutfit} action="happy" className="w-36 h-36 mb-2 drop-shadow-lg" />
              </motion.div>
            </motion.div>
          ) : (
            <>
              <SpeechBubble text="You're doing great! Keep up the amazing streak!" className="mb-2" />
              <HelperCharacter outfit={equippedOutfit} action="cheering" className="w-32 h-32 mb-2" />
            </>
          )}
        </div>
        
        <h2 className="text-xl font-bold text-[#5D4037] mb-2 z-10">
          {showCongrats ? "Weekly Goal Met!" : "Ready for a great day?"}
        </h2>
        <p className="text-sm text-[#8D6E63] font-medium z-10">
          {showCongrats ? "You've built some great habits this week!" : "\"Stay consistent & keep growing!\""}
        </p>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="flex flex-col items-center justify-center text-center p-4">
          <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center mb-2 text-[#2E7D32]">
            <Target size={20} />
          </div>
          <p className="text-2xl font-black text-[#5D4037]">{habitsDoneToday}/{totalHabits}</p>
          <p className="text-[10px] font-bold tracking-wider uppercase text-[#8D6E63]">Habits Done</p>
        </Card>
        <Card className="flex flex-col items-center justify-center text-center p-4">
          <div className="w-10 h-10 rounded-full bg-[#FFE0B2] flex items-center justify-center mb-2 text-[#E65100]">
            <Star size={20} />
          </div>
          <p className="text-2xl font-black text-[#5D4037]">{currentWeekStreak}</p>
          <p className="text-[10px] font-bold tracking-wider uppercase text-[#8D6E63]">Day Streak</p>
        </Card>
      </div>

      {/* Focus for the day */}
      <Card title="Focus for Today" icon={Coffee}>
        <ul className="space-y-3">
          {displayTasks.map((task, i) => (
            <motion.li 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 p-3 rounded-2xl bg-[#FDFBF7] border border-[#D7CCC8] hover:border-[#8D6E63] transition-colors cursor-pointer group"
            >
              <div className="text-[#D7CCC8] group-hover:text-[#2E7D32] transition-colors">
                <CheckCircle2 size={20} />
              </div>
              <span className="text-sm font-medium text-[#5D4037]">{task}</span>
            </motion.li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
