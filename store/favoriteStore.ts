import { create } from "zustand";

type FavoriteStore = {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

export const useFavoriteStore = create<FavoriteStore>((set, get) => ({
  favorites: [],
  toggleFavorite: (id) => {
    const { favorites } = get();
    const updated = favorites.includes(id)
      ? favorites.filter((fav) => fav !== id)
      : [...favorites, id];
    set({ favorites: updated });
  },
  isFavorite: (id) => get().favorites.includes(id),
}));
