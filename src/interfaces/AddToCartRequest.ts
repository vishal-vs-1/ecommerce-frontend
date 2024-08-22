// src/interfaces/AddToCartRequest.ts
import { Size } from './ProductResponse';

export interface AddToCartRequest {
  productId: number;
  productName: string;
  quantity: number;
  size: Size;
}
