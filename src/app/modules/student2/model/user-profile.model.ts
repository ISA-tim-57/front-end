import { Address, createEmptyAddress } from "../../student3/model/address.model";

export interface User {
    id: number,
    email: string,
    password: string,
    username: string,
    name: string,
    surname: string,
    addressDTO: Address
    phone: string,
    profession: string,
    companyInfo: string,
}

export const createEmptyUser = (): User => ({
    id: 0,
    email: '',
    password: '',
    username: '',
    name: '',
    surname: '',
    addressDTO: createEmptyAddress(),
    phone: '',
    profession: '',
    companyInfo: '',
});

