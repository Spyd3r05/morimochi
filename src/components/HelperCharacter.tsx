import { motion } from "framer-motion";
import { OutfitId } from "../store/userStore";

interface HelperCharacterProps {
  outfit: OutfitId;
  action?: "idle" | "happy" | "cheering" | "thinking";
  className?: string;
}

export function HelperCharacter({ outfit, action = "idle", className = "" }: HelperCharacterProps) {
  const isHappy = action === "happy" || action === "cheering";
  
  return (
    <motion.div 
      className={`relative w-32 h-32 ${className}`}
      animate={{ 
        y: action === "cheering" ? [0, -10, 0] : [0, -3, 0],
        rotate: action === "cheering" ? [0, -5, 5, 0] : 0
      }}
      transition={{ 
        repeat: Infinity, 
        duration: action === "cheering" ? 0.5 : 3, 
        ease: "easeInOut" 
      }}
    >
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
        {/* Base Body */}
        <ellipse cx="50" cy="75" rx="20" ry="25" fill="#FFE0B2" />
        
        {/* Outfits */}
        {outfit === "classic-apron" && (
          <>
            {/* Shirt */}
            <path d="M 30 70 Q 50 60 70 70 L 65 100 L 35 100 Z" fill="#FDFBF7" />
            {/* Apron */}
            <path d="M 35 75 Q 50 70 65 75 L 60 100 L 40 100 Z" fill="#8D6E63" />
            {/* Apron Straps */}
            <path d="M 35 75 L 40 65" stroke="#8D6E63" strokeWidth="3" />
            <path d="M 65 75 L 60 65" stroke="#8D6E63" strokeWidth="3" />
            {/* Pocket */}
            <rect x="45" y="85" width="10" height="8" rx="2" fill="#5D4037" opacity="0.5" />
          </>
        )}

        {outfit === "forest-cloak" && (
          <>
            {/* Tunic */}
            <path d="M 30 70 Q 50 60 70 70 L 65 100 L 35 100 Z" fill="#5D4037" />
            {/* Cloak */}
            <path d="M 25 65 Q 50 55 75 65 L 80 95 Q 50 105 20 95 Z" fill="#2E7D32" />
            {/* Leaf Clasp */}
            <circle cx="50" cy="68" r="4" fill="#E8F5E9" />
            <path d="M 50 64 L 50 72 M 46 68 L 54 68" stroke="#2E7D32" strokeWidth="1" />
          </>
        )}

        {outfit === "bear-onesie" && (
          <>
            {/* Onesie Body */}
            <path d="M 25 65 Q 50 55 75 65 L 70 100 L 30 100 Z" fill="#8D6E63" />
            {/* Belly */}
            <ellipse cx="50" cy="85" rx="15" ry="12" fill="#D7CCC8" />
            {/* Bear Hood Ears (drawn behind head) */}
            <circle cx="25" cy="35" r="10" fill="#8D6E63" />
            <circle cx="25" cy="35" r="5" fill="#D7CCC8" />
            <circle cx="75" cy="35" r="10" fill="#8D6E63" />
            <circle cx="75" cy="35" r="5" fill="#D7CCC8" />
          </>
        )}

        {/* Head */}
        <circle cx="50" cy="45" r="28" fill="#FFE0B2" />
        
        {/* Hair - Back */}
        <path d="M 22 45 Q 20 70 30 80 Q 25 60 28 45 Z" fill="#5D4037" />
        <path d="M 78 45 Q 80 70 70 80 Q 75 60 72 45 Z" fill="#5D4037" />

        {/* Hair - Front/Bangs */}
        <path d="M 22 45 Q 50 10 78 45 Q 65 25 50 30 Q 35 25 22 45 Z" fill="#5D4037" />
        <path d="M 50 30 Q 60 40 70 35 Q 60 20 50 30 Z" fill="#5D4037" />
        <path d="M 50 30 Q 40 40 30 35 Q 40 20 50 30 Z" fill="#5D4037" />

        {/* Bear Hood Top (if onesie) */}
        {outfit === "bear-onesie" && (
          <path d="M 20 45 Q 50 5 80 45 Q 75 20 50 15 Q 25 20 20 45 Z" fill="#8D6E63" />
        )}

        {/* Eyes */}
        {isHappy ? (
          <>
            <path d="M 35 48 Q 40 43 45 48" stroke="#5D4037" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 55 48 Q 60 43 65 48" stroke="#5D4037" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </>
        ) : action === "thinking" ? (
          <>
            <circle cx="40" cy="48" r="3" fill="#5D4037" />
            <path d="M 55 48 Q 60 43 65 48" stroke="#5D4037" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </>
        ) : (
          <>
            <circle cx="40" cy="48" r="4" fill="#5D4037" />
            <circle cx="60" cy="48" r="4" fill="#5D4037" />
            {/* Eye Sparkles */}
            <circle cx="41" cy="47" r="1.5" fill="#FFFDF9" />
            <circle cx="61" cy="47" r="1.5" fill="#FFFDF9" />
          </>
        )}

        {/* Blush */}
        <ellipse cx="32" cy="54" rx="4" ry="2" fill="#FFCDD2" opacity="0.8" />
        <ellipse cx="68" cy="54" rx="4" ry="2" fill="#FFCDD2" opacity="0.8" />

        {/* Mouth */}
        {isHappy ? (
          <path d="M 45 56 Q 50 62 55 56" stroke="#5D4037" strokeWidth="2" strokeLinecap="round" fill="none" />
        ) : action === "thinking" ? (
          <circle cx="50" cy="56" r="1.5" fill="#5D4037" />
        ) : (
          <path d="M 47 56 Q 50 58 53 56" stroke="#5D4037" strokeWidth="2" strokeLinecap="round" fill="none" />
        )}

        {/* Arms */}
        {action === "cheering" ? (
          <>
            <path d="M 30 75 Q 20 60 15 50" stroke="#FFE0B2" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M 70 75 Q 80 60 85 50" stroke="#FFE0B2" strokeWidth="6" strokeLinecap="round" fill="none" />
            {/* Sleeves */}
            {outfit === "classic-apron" && (
              <>
                <path d="M 30 75 Q 25 65 20 60" stroke="#FDFBF7" strokeWidth="8" strokeLinecap="round" fill="none" />
                <path d="M 70 75 Q 75 65 80 60" stroke="#FDFBF7" strokeWidth="8" strokeLinecap="round" fill="none" />
              </>
            )}
            {outfit === "forest-cloak" && (
              <>
                <path d="M 30 75 Q 25 65 20 60" stroke="#2E7D32" strokeWidth="8" strokeLinecap="round" fill="none" />
                <path d="M 70 75 Q 75 65 80 60" stroke="#2E7D32" strokeWidth="8" strokeLinecap="round" fill="none" />
              </>
            )}
            {outfit === "bear-onesie" && (
              <>
                <path d="M 30 75 Q 25 65 20 60" stroke="#8D6E63" strokeWidth="8" strokeLinecap="round" fill="none" />
                <path d="M 70 75 Q 75 65 80 60" stroke="#8D6E63" strokeWidth="8" strokeLinecap="round" fill="none" />
              </>
            )}
          </>
        ) : (
          <>
            <path d="M 30 75 Q 20 85 25 95" stroke="#FFE0B2" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M 70 75 Q 80 85 75 95" stroke="#FFE0B2" strokeWidth="6" strokeLinecap="round" fill="none" />
            {/* Sleeves */}
            {outfit === "classic-apron" && (
              <>
                <path d="M 30 75 Q 25 80 23 85" stroke="#FDFBF7" strokeWidth="8" strokeLinecap="round" fill="none" />
                <path d="M 70 75 Q 75 80 77 85" stroke="#FDFBF7" strokeWidth="8" strokeLinecap="round" fill="none" />
              </>
            )}
            {outfit === "forest-cloak" && (
              <>
                <path d="M 30 75 Q 25 80 23 85" stroke="#2E7D32" strokeWidth="8" strokeLinecap="round" fill="none" />
                <path d="M 70 75 Q 75 80 77 85" stroke="#2E7D32" strokeWidth="8" strokeLinecap="round" fill="none" />
              </>
            )}
            {outfit === "bear-onesie" && (
              <>
                <path d="M 30 75 Q 25 80 23 85" stroke="#8D6E63" strokeWidth="8" strokeLinecap="round" fill="none" />
                <path d="M 70 75 Q 75 80 77 85" stroke="#8D6E63" strokeWidth="8" strokeLinecap="round" fill="none" />
              </>
            )}
          </>
        )}
      </svg>
    </motion.div>
  );
}
