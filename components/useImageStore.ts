// useImageStore.ts
import { create } from "zustand";

interface ImageStore {
  logoImage: string;
  setLogoImage: (url: string) => void;
  secondaryImage: string | null;
  setSecondaryImage: (url: string) => void;
}

export const useImageStore = create<ImageStore>((set) => ({
  logoImage: "/Frame.svg", // Default image path
  setLogoImage: (url: string) => set({ logoImage: url }),
 
  secondaryImage: null, // Set secondary image as null initially
  setSecondaryImage: (url: string) => set({ secondaryImage: url }),
}));
