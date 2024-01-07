import { Product } from "@prisma/client";

export interface CardItem extends Product {
  quantity: number;
}

export interface CardSlice {
  items: CardItem[];
  isLoading: boolean;
  error: Error | null;
}

export interface BaseOption {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
}

export interface CreateOrderOption extends BaseOption {
  payload: CardItem[];
}

export interface CancelOrderOption extends BaseOption {
  orderId: string;
}
