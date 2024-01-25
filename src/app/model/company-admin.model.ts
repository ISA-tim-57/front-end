import { User, createEmptyUser } from "./user.model";

export interface CompanyAdmin{
user : User,
name : string,
surname : string,
companyId : number,
    
}

export const createEmptyCompanyAdmin = (): CompanyAdmin => ({
    user : createEmptyUser(),
    name: '',
    surname: '',
    companyId : 0,
});