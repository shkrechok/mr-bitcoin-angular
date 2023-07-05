import { from } from "rxjs";

export interface User {
  _id?: string;
  name?: string;
  email?: string;
  phone?: string;
  imgUrl?: string;
  moves?: Move[];
  coins?: number;
  
}

export interface Move {
  _id?: string,
  toId?: string,
  fromId?: string,
  from?: string,
  to?: string,
  at: number,
  amount?: number
}