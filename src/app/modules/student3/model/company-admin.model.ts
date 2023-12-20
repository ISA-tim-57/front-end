import { Address, createEmptyAddress } from "./address.model";
import { Company, createEmptyCompany } from "./company.model";

export interface CompanyAdmin{
    id: number,
    email : string,
    username : string,
    name: string,
    surname : string,
    companyId : number
}

export const createEmptyUser = (): CompanyAdmin => ({
    id: 0,
    email : "",
    username : "",
    name: "",
    surname : "",
    companyId : 0,
  });