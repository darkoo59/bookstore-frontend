export interface Book {
    id: number;
    title?: string;
    author?: string;
    publisher?: string;
    genre?: string;
    numberOfPages?: number;
    price: number;
    averageRating: number;
  }