import { Product } from "@prisma/client";

interface CardItem extends Product {
  quantity: number;
}

export interface CardSlice {
  items: CardItem[];
  isLoading: boolean;
  error: Error | null;
}
