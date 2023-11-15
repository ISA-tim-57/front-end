import { Address, createEmptyAddress } from "./address.model";

export interface Company{
    id: number,
    name : string,
    description : string,
    address : Address,
    rating : number,
}

export const createEmptyCompany = (): Company => ({
    id: 0,
    name: '',
    description: '',
    address: createEmptyAddress(),
    rating: 0,
  });