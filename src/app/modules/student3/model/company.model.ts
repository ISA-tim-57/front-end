import { Address, createEmptyAddress } from "./address.model";

export interface Company{
    id: number,
    name : string,
    description : string,
    address : Address,
    rating : number,
    workingHoursStart : Date,
    workingHoursEnd : Date
}

export const createEmptyCompany = (): Company => ({
    id: 0,
    name: '',
    description: '',
    address: createEmptyAddress(),
    rating: 0,
    workingHoursStart : new Date(),
    workingHoursEnd : new Date()
  });