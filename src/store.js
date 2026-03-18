import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set) => ({
      user: null,
      wishlist: [],
      visited: [],
      currency: 'USD',
      language: 'EN',

      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
      
      toggleWishlist: (destId) => set((state) => {
        const isSaved = state.wishlist.includes(destId);
        return {
          wishlist: isSaved 
            ? state.wishlist.filter(id => id !== destId) 
            : [...state.wishlist, destId]
        };
      }),

      addVisited: (destId) => set((state) => ({
        visited: state.visited.includes(destId) ? state.visited : [...state.visited, destId]
      })),

      setCurrency: (currency) => set({ currency }),
      setLanguage: (language) => set({ language }),
    }),
    { name: 'compass-storage' }
  )
);
