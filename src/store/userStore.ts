import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type BackgroundId = 'cozy-study' | 'forest-clearing' | 'matcha-cafe';
export type OutfitId = 'classic-apron' | 'forest-cloak' | 'bear-onesie';

export interface Habit {
  id: string;
  name: string;
  days: boolean[];
}

export interface Task {
  id: string;
  text: string;
  done: boolean;
  day: string;
}

interface UserState {
  coins: number;
  equippedBackground: BackgroundId;
  equippedOutfit: OutfitId;
  unlockedBackgrounds: BackgroundId[];
  unlockedOutfits: OutfitId[];
  
  habits: Habit[];
  tasks: Task[];
  mood: "happy" | "neutral" | "sad" | null;
  sleep: number;
  gratitude: string;

  addCoins: (amount: number) => void;
  equipBackground: (bgId: BackgroundId) => void;
  equipOutfit: (outfitId: OutfitId) => void;
  unlockBackground: (bgId: BackgroundId, cost: number) => void;
  unlockOutfit: (outfitId: OutfitId, cost: number) => void;

  addHabit: (name: string) => void;
  deleteHabit: (id: string) => void;
  toggleHabitDay: (id: string, dayIndex: number) => void;

  addTask: (text: string, day: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;

  setMood: (mood: "happy" | "neutral" | "sad" | null) => void;
  setSleep: (hours: number) => void;
  setGratitude: (text: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      coins: 150,
      equippedBackground: 'cozy-study',
      equippedOutfit: 'classic-apron',
      unlockedBackgrounds: ['cozy-study'],
      unlockedOutfits: ['classic-apron'],
      
      habits: [],
      tasks: [],
      mood: "happy",
      sleep: 7,
      gratitude: "A sunny morning and a good cup of coffee.",

      addCoins: (amount) => set((state) => ({ coins: state.coins + amount })),
      
      equipBackground: (bgId) => set({ equippedBackground: bgId }),
      equipOutfit: (outfitId) => set({ equippedOutfit: outfitId }),
      
      unlockBackground: (bgId, cost) => set((state) => {
        if (state.coins >= cost && !state.unlockedBackgrounds.includes(bgId)) {
          return {
            coins: state.coins - cost,
            unlockedBackgrounds: [...state.unlockedBackgrounds, bgId],
          };
        }
        return state;
      }),
      
      unlockOutfit: (outfitId, cost) => set((state) => {
        if (state.coins >= cost && !state.unlockedOutfits.includes(outfitId)) {
          return {
            coins: state.coins - cost,
            unlockedOutfits: [...state.unlockedOutfits, outfitId],
          };
        }
        return state;
      }),

      addHabit: (name) => set((state) => ({
        habits: [...state.habits, { id: Date.now().toString(), name, days: [false, false, false, false, false, false, false] }]
      })),
      deleteHabit: (id) => set((state) => ({
        habits: state.habits.filter(h => h.id !== id)
      })),
      toggleHabitDay: (id, dayIndex) => set((state) => ({
        habits: state.habits.map(h => {
          if (h.id === id) {
            const newDays = [...h.days];
            newDays[dayIndex] = !newDays[dayIndex];
            return { ...h, days: newDays };
          }
          return h;
        })
      })),

      addTask: (text, day) => set((state) => ({
        tasks: [...state.tasks, { id: Date.now().toString(), text, done: false, day }]
      })),
      toggleTask: (id) => set((state) => ({
        tasks: state.tasks.map(t => t.id === id ? { ...t, done: !t.done } : t)
      })),
      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter(t => t.id !== id)
      })),

      setMood: (mood) => set({ mood }),
      setSleep: (sleep) => set({ sleep }),
      setGratitude: (gratitude) => set({ gratitude }),
    }),
    {
      name: 'kawaii-habit-tracker-storage',
      version: 1,
      migrate: (persistedState: unknown) => {
        const stored = persistedState as { state?: Record<string, unknown>; version?: number };
        if (stored?.state && typeof stored.state === 'object') {
          return { ...stored, state: { ...stored.state, tasks: [] } };
        }
        return persistedState;
      },
    }
  )
);
