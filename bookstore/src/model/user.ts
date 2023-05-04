import { Address } from "./address";

export interface User {
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
  }