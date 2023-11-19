import { Address, createEmptyAddress } from "./address.model";

export interface User{
    id: number,
    email : string,
    password : string,
    username : string,
    name: string,
    surname : string,
    address : Address,
    phone : string,
    profession : string,
    companyInfo : string,
}

export const createEmptyUser = (): User => ({
    id: 0,
    email : "",
    password : "",
    username : "",
    name: "",
    surname : "",
    address : createEmptyAddress(),
    phone : "",
    profession : "",
    companyInfo : "",
  });