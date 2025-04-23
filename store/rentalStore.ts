import { create } from "zustand";
import { Car } from "../types/car";

type Rental = {
  car: Car;
  startDate: Date;
  endDate: Date;
};

type RentalStore = {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  rentals: Rental[];
  addRental: (rental: Rental) => void;
  removeRental: (index: number) => void;
};

export const useRentalStore = create<RentalStore>((set) => ({
  startDate: null,
  endDate: null,
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
  rentals: [],
  addRental: (rental) =>
    set((state) => ({ rentals: [...state.rentals, rental] })),
  removeRental: (index: number) =>
    set((state) => ({
      rentals: state.rentals.filter((_, i) => i !== index),
    })),
}));
