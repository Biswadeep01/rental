import { create } from "zustand";
import { getAllCars } from "../services/cars";

export const useAppStore = create((set, get) => ({
  car: {},
  cars: [],
  fetchCars: async () => {
    try {
      const response = await getAllCars();
      set(() => ({ cars: response.cars }));
    } catch (err) {
      console.log(err);
    }
  },
  fetchCar: (carId) => {
    try {
      const { cars } = get();
      const targetCar = cars.find((c) => c.id === carId);
      set(() => ({ car: targetCar }));
    } catch (err) {
      console.log(err);
    }
  },
}));
