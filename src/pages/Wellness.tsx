import { Header } from "../components/Header";
import { Card } from "../components/Card";
import { Heart, Moon, Smile, Frown, Meh, Coffee, Coins } from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "../store/userStore";

export default function Wellness() {
  const { coins, mood, sleep, gratitude, setMood, setSleep, setGratitude } = useUserStore();

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="flex justify-between items-center px-2">
        <Header title="Health & Wellness" subtitle="Take Care of You" />
        <div className="flex items-center gap-2 bg-[#FFFDF9] border-2 border-[#8D6E63] rounded-full px-3 py-1 shadow-[2px_2px_0px_#8D6E63]">
          <Coins size={16} className="text-[#E65100]" />
          <span className="font-bold text-[#5D4037]">{coins}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Sleep Tracker */}
        <Card className="flex flex-col items-center text-center p-4" title="Sleep Log" icon={Moon}>
          <div className="flex items-center gap-2 mb-4">
            <button 
              onClick={() => setSleep(Math.max(0, sleep - 1))}
              className="w-8 h-8 rounded-full bg-[#FDFBF7] border border-[#D7CCC8] flex items-center justify-center text-[#8D6E63] hover:bg-[#E8F5E9] hover:text-[#2E7D32]"
            >
              -
            </button>
            <span className="text-3xl font-black text-[#5D4037] w-12">{sleep}h</span>
            <button 
              onClick={() => setSleep(Math.min(24, sleep + 1))}
              className="w-8 h-8 rounded-full bg-[#FDFBF7] border border-[#D7CCC8] flex items-center justify-center text-[#8D6E63] hover:bg-[#E8F5E9] hover:text-[#2E7D32]"
            >
              +
            </button>
          </div>
          <div className="flex gap-1 justify-center">
            {[...Array(8)].map((_, i) => (
              <div 
                key={i} 
                className={`w-2 h-6 rounded-full transition-colors ${i < sleep ? 'bg-[#2E7D32]' : 'bg-[#D7CCC8]'}`}
              />
            ))}
          </div>
        </Card>

        {/* Mood Tracker */}
        <Card className="flex flex-col items-center text-center p-4" title="Mood" icon={Heart}>
          <div className="flex justify-between w-full mt-2">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => setMood("sad")}
              className={`p-2 rounded-2xl transition-colors ${mood === 'sad' ? 'bg-[#FFCDD2] text-[#C62828]' : 'text-[#8D6E63] hover:bg-[#FDFBF7]'}`}
            >
              <Frown size={28} />
            </motion.button>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => setMood("neutral")}
              className={`p-2 rounded-2xl transition-colors ${mood === 'neutral' ? 'bg-[#FFE0B2] text-[#E65100]' : 'text-[#8D6E63] hover:bg-[#FDFBF7]'}`}
            >
              <Meh size={28} />
            </motion.button>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => setMood("happy")}
              className={`p-2 rounded-2xl transition-colors ${mood === 'happy' ? 'bg-[#E8F5E9] text-[#2E7D32]' : 'text-[#8D6E63] hover:bg-[#FDFBF7]'}`}
            >
              <Smile size={28} />
            </motion.button>
          </div>
        </Card>
      </div>

      {/* Gratitude Journal */}
      <Card title="Gratitude Journal" icon={Coffee}>
        <div className="bg-[#FDFBF7] border border-[#D7CCC8] rounded-2xl p-4 min-h-[120px] relative">
          <p className="text-sm font-bold text-[#8D6E63] mb-2 uppercase tracking-wider">I am grateful for...</p>
          <textarea 
            className="w-full bg-transparent border-none outline-none resize-none text-[#5D4037] placeholder-[#D7CCC8] text-sm leading-relaxed relative z-10"
            placeholder="Write something nice here..."
            rows={3}
            value={gratitude}
            onChange={(e) => setGratitude(e.target.value)}
          />
          {/* Decorative lines */}
          <div className="absolute top-12 left-4 right-4 h-px bg-[#D7CCC8] opacity-50 z-0"></div>
          <div className="absolute top-20 left-4 right-4 h-px bg-[#D7CCC8] opacity-50 z-0"></div>
          <div className="absolute top-28 left-4 right-4 h-px bg-[#D7CCC8] opacity-50 z-0"></div>
        </div>
      </Card>
    </div>
  );
}
