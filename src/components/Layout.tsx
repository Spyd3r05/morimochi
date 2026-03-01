import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { RoomBackground } from "./RoomBackground";
import { useUserStore } from "../store/userStore";

export default function Layout() {
  const location = useLocation();
  const equippedBackground = useUserStore((state) => state.equippedBackground);

  return (
    <div className="min-h-screen text-[#5D4037] font-sans overflow-x-hidden flex flex-col items-center">
      <RoomBackground background={equippedBackground}>
        <div className="w-full max-w-md min-h-screen relative pb-28">
          <main className="relative z-10 w-full h-full px-4 pt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full h-full"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </RoomBackground>
      <BottomNav />
    </div>
  );
}
