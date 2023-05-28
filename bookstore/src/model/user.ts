import { Address } from "./address";
import { Genre } from "./genre";

export interface User {
  id?: number;
  email?: string;
  password?: string;
  firstname?: string;
  lastname?: string;
  address?: Address;
  gender?: number;
  phone?: string;
  nationalId?: string;
  occupation?: string;
  information?: string;
  genres?: Genre[]
}