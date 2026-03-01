import React from "react";
import { cn } from "../utils/cn";

export function Card({ children, className, title, icon: Icon, ...props }: { children: React.ReactNode, className?: string, title?: string, icon?: React.ElementType } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("bg-[#FFFDF9] border-2 border-[#8D6E63] rounded-3xl p-5 shadow-[4px_4px_0px_#8D6E63] relative overflow-hidden", className)} {...props}>
      {title && (
        <div className="flex items-center gap-2 mb-4">
          {Icon && <Icon className="text-[#2E7D32]" size={20} />}
          <h2 className="font-bold text-lg tracking-wide uppercase text-[#5D4037]">{title}</h2>
        </div>
      )}
      <div className="relative z-10">
        {children}
      </div>
      {/* Cute corner decoration */}
      <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-[#E8F5E9] rounded-full opacity-50 z-0"></div>
    </div>
  );
}
