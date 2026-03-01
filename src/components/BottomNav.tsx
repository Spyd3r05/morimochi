import { Link, useLocation } from "react-router-dom";
import { Home, CheckSquare, Calendar, Heart, Gift } from "lucide-react";
import { cn } from "../utils/cn";

export default function BottomNav() {
  const location = useLocation();

  const links = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/habits", icon: CheckSquare, label: "Habits" },
    { to: "/planner", icon: Calendar, label: "Planner" },
    { to: "/wellness", icon: Heart, label: "Wellness" },
    { to: "/rewards", icon: Gift, label: "Rewards" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#FDFBF7] border-t-2 border-[#8D6E63] pb-safe pt-2 px-2 z-50 rounded-t-3xl shadow-[0_-4px_20px_rgba(141,110,99,0.15)]">
      <div className="flex justify-between items-center max-w-md mx-auto h-16">
        {links.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                "flex flex-col items-center justify-center w-14 h-full transition-all duration-300",
                isActive ? "text-[#2E7D32] -translate-y-1" : "text-[#8D6E63] hover:text-[#5D4037]"
              )}
            >
              <div
                className={cn(
                  "p-2 rounded-2xl transition-all duration-300",
                  isActive ? "bg-[#E8F5E9] shadow-sm" : "bg-transparent"
                )}
              >
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className="text-[9px] font-bold mt-1 tracking-wider uppercase">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
