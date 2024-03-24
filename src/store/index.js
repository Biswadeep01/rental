import { create } from "zustand";
import { getAllCars } from "../services/cars";
import { getAvailableCars } from "../services/rentals";

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
  fetchAvailableCars: async ({ pickupDateTime, returnDateTime }) => {
    try {
      const response = await getAvailableCars({
        pickupDateTime,
        returnDateTime,
      });
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
