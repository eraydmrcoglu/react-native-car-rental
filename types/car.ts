export interface Car {
  id: string;
  brand: string;
  model: string;
  price: number;
  images: string[];
  speed: string;
  acceleration: string;
  fuel: "Gasoline" | "Electric" | "Hybrid";
  transmission: "Auto" | "Manual";
  horsepower: string;
  seats: number;
}
