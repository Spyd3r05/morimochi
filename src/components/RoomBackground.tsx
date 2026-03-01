import React from "react";
import { BackgroundId } from "../store/userStore";

interface RoomBackgroundProps {
  background: BackgroundId;
  children: React.ReactNode;
}

export function RoomBackground({ background, children }: RoomBackgroundProps) {
  const getBackgroundStyles = () => {
    switch (background) {
      case 'cozy-study':
        return {
          background: 'linear-gradient(to bottom, #FDFBF7, #EFEBE0)',
          pattern: 'radial-gradient(#D7CCC8 1px, transparent 1px)',
          patternSize: '20px 20px',
        };
      case 'forest-clearing':
        return {
          background: 'linear-gradient(to bottom, #E8F5E9, #C8E6C9)',
          pattern: 'radial-gradient(#A5D6A7 2px, transparent 2px)',
          patternSize: '30px 30px',
        };
      case 'matcha-cafe':
        return {
          background: 'linear-gradient(to bottom, #F1F8E9, #DCEDC8)',
          pattern: 'linear-gradient(45deg, #C5E1A5 25%, transparent 25%, transparent 75%, #C5E1A5 75%, #C5E1A5), linear-gradient(45deg, #C5E1A5 25%, transparent 25%, transparent 75%, #C5E1A5 75%, #C5E1A5)',
          patternSize: '40px 40px',
          patternPosition: '0 0, 20px 20px'
        };
      default:
        return {
          background: '#FDFBF7',
          pattern: 'none',
          patternSize: 'auto',
        };
    }
  };

  const styles = getBackgroundStyles();

  return (
    <>
      <div 
        className="fixed inset-0 w-full h-full -z-10 transition-colors duration-500 pointer-events-none"
        style={{ background: styles.background }}
      >
        <div 
          className="absolute inset-0 opacity-30"
          style={{ 
            backgroundImage: styles.pattern,
            backgroundSize: styles.patternSize,
            backgroundPosition: (styles as any).patternPosition || '0 0'
          }}
        />
        {/* Decorative elements based on room */}
        {background === 'cozy-study' && (
          <>
            <div className="absolute top-10 right-10 w-32 h-32 bg-[#FFE0B2] rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute bottom-20 left-10 w-40 h-40 bg-[#D7CCC8] rounded-full opacity-20 blur-2xl"></div>
          </>
        )}
        {background === 'forest-clearing' && (
          <>
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#81C784] to-transparent opacity-20"></div>
            {/* Sunbeams */}
            <div className="absolute top-[-50px] right-[-50px] w-64 h-[200%] bg-white opacity-10 rotate-45 transform origin-top-right blur-xl"></div>
          </>
        )}
        {background === 'matcha-cafe' && (
          <>
            {/* Awning stripes */}
            <div className="absolute top-0 left-0 w-full h-12 bg-[repeating-linear-gradient(90deg,#8D6E63,#8D6E63_40px,#FDFBF7_40px,#FDFBF7_80px)] opacity-80 shadow-md"></div>
            <div className="absolute top-12 left-0 w-full h-4 bg-[repeating-linear-gradient(90deg,#5D4037,#5D4037_40px,#D7CCC8_40px,#D7CCC8_80px)] opacity-80"></div>
          </>
        )}
      </div>
      {children}
    </>
  );
}
