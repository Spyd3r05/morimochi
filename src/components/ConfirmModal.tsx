import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }: ConfirmModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={onCancel}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, x: '-50%' }}
            animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }}
            exit={{ opacity: 0, scale: 0.9, y: 20, x: '-50%' }}
            className="fixed top-1/2 left-1/2 w-[90%] max-w-sm bg-[#FFFDF9] rounded-3xl p-6 shadow-xl border-2 border-[#8D6E63] z-50 flex flex-col items-center text-center"
          >
            <div className="w-12 h-12 rounded-full bg-[#FFEBEE] flex items-center justify-center mb-4 text-[#C62828]">
              <AlertTriangle size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#5D4037] mb-2">{title}</h3>
            <p className="text-sm text-[#8D6E63] mb-6">{message}</p>
            
            <div className="flex gap-3 w-full">
              <button
                onClick={onCancel}
                className="flex-1 py-3 rounded-2xl border-2 border-[#D7CCC8] text-[#8D6E63] font-bold hover:bg-[#FDFBF7] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 py-3 rounded-2xl bg-[#FFEBEE] border-2 border-[#C62828] text-[#C62828] font-bold hover:bg-[#FFCDD2] transition-colors"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
