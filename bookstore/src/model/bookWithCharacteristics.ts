import { Book } from "./book";

export interface BookWithCharacteristics {
  book: Book;
  new: boolean;
  popular: boolean;
  goodRated: boolean;
  badRated: boolean;
  suggested: boolean;
}