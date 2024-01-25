import { Address, createEmptyAddress } from "./address.model";
import { User, createEmptyUser } from "./user.model";

export interface BasicUser{
    user : User,
    name : string,
    surname : string,
    address : Address,
    phone : string,
    profession : string,
    
}

export const createEmptyBasicUser = (): BasicUser => ({
    user : createEmptyUser(),
    name: '',
    surname: '',
    address: createEmptyAddress(),
    phone: '',
    profession: '',

});