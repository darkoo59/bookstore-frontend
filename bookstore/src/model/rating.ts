import { User } from "./user";

export interface Rating {
  id: number;
  bookId: number;
  rating: number;
  user: User;
}