import { User, createEmptyUser } from "./user.model";

export interface SystemAdmin{
user : User,  
}

export const createEmptyCompanyAdmin = (): SystemAdmin => ({
    user : createEmptyUser()
});