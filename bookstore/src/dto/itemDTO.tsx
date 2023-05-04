import { Book } from "../model/book";

export interface ItemDTO {
    id: number;
    title: string;
    author: string;
    publisher: string;
    genre: string;
    numberOfPages: number;
    price: number;
    quantity: number;
  }