import { ItemDTO } from "../dto/itemDTO";

export interface MyOrder {
    id: number;
    items: ItemDTO[];
    price: number;
  }