// stores/useOptionFlagStore.ts
import { create } from "zustand";

interface OptionFlagState {
  optionFlag: boolean;
  toggleOptionFlag: () => void;
}

export const useOptionFlagStore = create<OptionFlagState>((set) => ({
  optionFlag: false,
  toggleOptionFlag: () => set((state) => ({ optionFlag: !state.optionFlag })),
}));