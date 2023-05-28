import { Author } from "./author";
import { Genre } from "./genre";
import { Rating } from "./rating";

export interface Book {
  id: number;
  title?: string;
  author?: Author;
  publisher?: string;
  genre?: Genre;
  numberOfPages?: number;
  price: number;
  averageRating: number;
  ratings?: Rating[];
}