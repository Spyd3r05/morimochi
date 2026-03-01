import { motion } from "framer-motion";

interface SpeechBubbleProps {
  text: string;
  className?: string;
}

export function SpeechBubble({ text, className = "" }: SpeechBubbleProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className={`relative bg-white border-2 border-[#8D6E63] rounded-2xl p-3 shadow-[2px_2px_0px_#8D6E63] max-w-[200px] z-20 ${className}`}
    >
      <p className="text-sm font-medium text-[#5D4037] text-center leading-snug">
        {text}
      </p>
      {/* Triangle pointer */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b-2 border-r-2 border-[#8D6E63] rotate-45"></div>
    </motion.div>
  );
}
