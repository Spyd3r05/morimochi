import { Header } from "../components/Header";
import { Card } from "../components/Card";
import { HelperCharacter } from "../components/HelperCharacter";
import { Coins, Lock, Check } from "lucide-react";
import { useUserStore, BackgroundId, OutfitId } from "../store/userStore";
import { motion } from "framer-motion";

export default function Rewards() {
  const { 
    coins, 
    equippedBackground, 
    equippedOutfit, 
    unlockedBackgrounds, 
    unlockedOutfits,
    equipBackground,
    equipOutfit,
    unlockBackground,
    unlockOutfit
  } = useUserStore();

  const backgrounds: { id: BackgroundId, name: string, cost: number, color: string }[] = [
    { id: 'cozy-study', name: 'Cozy Study', cost: 0, color: '#FDFBF7' },
    { id: 'forest-clearing', name: 'Forest Clearing', cost: 100, color: '#E8F5E9' },
    { id: 'matcha-cafe', name: 'Matcha Cafe', cost: 200, color: '#F1F8E9' },
  ];

  const outfits: { id: OutfitId, name: string, cost: number }[] = [
    { id: 'classic-apron', name: 'Classic Apron', cost: 0 },
    { id: 'forest-cloak', name: 'Forest Cloak', cost: 150 },
    { id: 'bear-onesie', name: 'Bear Onesie', cost: 300 },
  ];

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="flex justify-between items-center px-2">
        <Header title="Rewards" subtitle="Customize Your Space" />
        <div className="flex items-center gap-2 bg-[#FFFDF9] border-2 border-[#8D6E63] rounded-full px-3 py-1 shadow-[2px_2px_0px_#8D6E63]">
          <Coins size={16} className="text-[#E65100]" />
          <span className="font-bold text-[#5D4037]">{coins}</span>
        </div>
      </div>

      <div className="flex justify-center mb-4">
        <div className="relative bg-white/50 backdrop-blur-sm p-4 rounded-full border-2 border-[#8D6E63] shadow-[4px_4px_0px_#8D6E63]">
          <HelperCharacter outfit={equippedOutfit} action="happy" className="w-40 h-40" />
        </div>
      </div>

      <Card title="Helper Outfits" className="mb-4">
        <div className="grid grid-cols-3 gap-3">
          {outfits.map((outfit) => {
            const isUnlocked = unlockedOutfits.includes(outfit.id);
            const isEquipped = equippedOutfit === outfit.id;
            const canAfford = coins >= outfit.cost;

            return (
              <motion.button
                whileTap={{ scale: 0.95 }}
                key={outfit.id}
                onClick={() => {
                  if (isUnlocked) {
                    equipOutfit(outfit.id);
                  } else if (canAfford) {
                    unlockOutfit(outfit.id, outfit.cost);
                  }
                }}
                className={`relative flex flex-col items-center p-2 rounded-xl border-2 transition-all ${
                  isEquipped ? 'border-[#2E7D32] bg-[#E8F5E9]' : 
                  isUnlocked ? 'border-[#8D6E63] bg-[#FFFDF9]' : 
                  'border-[#D7CCC8] bg-[#FDFBF7] opacity-80'
                }`}
              >
                <div className="w-12 h-12 mb-2">
                  <HelperCharacter outfit={outfit.id} action="idle" className="w-full h-full" />
                </div>
                <span className="text-[10px] font-bold text-center leading-tight mb-1">{outfit.name}</span>
                
                {!isUnlocked ? (
                  <div className={`flex items-center gap-1 text-[10px] font-bold ${canAfford ? 'text-[#E65100]' : 'text-[#8D6E63]'}`}>
                    <Lock size={10} /> {outfit.cost}
                  </div>
                ) : isEquipped ? (
                  <div className="text-[#2E7D32]">
                    <Check size={14} strokeWidth={3} />
                  </div>
                ) : (
                  <div className="text-[10px] font-bold text-[#8D6E63]">Equip</div>
                )}
              </motion.button>
            );
          })}
        </div>
      </Card>

      <Card title="Room Backgrounds">
        <div className="grid grid-cols-1 gap-3">
          {backgrounds.map((bg) => {
            const isUnlocked = unlockedBackgrounds.includes(bg.id);
            const isEquipped = equippedBackground === bg.id;
            const canAfford = coins >= bg.cost;

            return (
              <motion.button
                whileTap={{ scale: 0.98 }}
                key={bg.id}
                onClick={() => {
                  if (isUnlocked) {
                    equipBackground(bg.id);
                  } else if (canAfford) {
                    unlockBackground(bg.id, bg.cost);
                  }
                }}
                className={`relative flex items-center justify-between p-3 rounded-xl border-2 transition-all ${
                  isEquipped ? 'border-[#2E7D32] bg-[#E8F5E9]' : 
                  isUnlocked ? 'border-[#8D6E63] bg-[#FFFDF9]' : 
                  'border-[#D7CCC8] bg-[#FDFBF7] opacity-80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-lg border border-[#D7CCC8]" 
                    style={{ backgroundColor: bg.color }}
                  />
                  <span className="font-bold text-sm text-[#5D4037]">{bg.name}</span>
                </div>
                
                {!isUnlocked ? (
                  <div className={`flex items-center gap-1 text-xs font-bold ${canAfford ? 'text-[#E65100]' : 'text-[#8D6E63]'}`}>
                    <Lock size={12} /> {bg.cost}
                  </div>
                ) : isEquipped ? (
                  <div className="text-[#2E7D32] bg-white rounded-full p-1">
                    <Check size={16} strokeWidth={3} />
                  </div>
                ) : (
                  <div className="text-xs font-bold text-[#8D6E63] bg-white px-2 py-1 rounded-full">Equip</div>
                )}
              </motion.button>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
