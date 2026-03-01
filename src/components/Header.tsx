import { Sparkles } from "lucide-react";
import { HelperCharacter } from "./HelperCharacter";
import { useUserStore } from "../store/userStore";

export function Header({ title, subtitle }: { title: string, subtitle?: string }) {
  const { equippedOutfit } = useUserStore();

  return (
    <div className="flex items-center gap-3 mb-6 relative">
      <div className="w-14 h-14 shrink-0 bg-[#FFFDF9] rounded-full border-2 border-[#8D6E63] shadow-[2px_2px_0px_#8D6E63] overflow-hidden flex items-center justify-center relative z-10">
        <HelperCharacter outfit={equippedOutfit} action="idle" className="w-16 h-16 mt-4" />
      </div>
      
      <div className="flex flex-col items-start relative">
        <div className="absolute -top-3 -left-2 text-[#2E7D32] opacity-30">
          <Sparkles size={20} />
        </div>
        <div className="absolute -bottom-1 -right-4 text-[#8D6E63] opacity-30">
          <Sparkles size={14} />
        </div>
        
        <h1 className="text-2xl font-black tracking-tighter uppercase text-[#5D4037] drop-shadow-[1px_1px_0px_#E8F5E9] leading-none">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[10px] font-bold text-[#8D6E63] mt-1 tracking-widest uppercase">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
