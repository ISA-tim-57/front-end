import { BasicUser, createEmptyBasicUser } from "./basic-user.model";
import { CompanyAdmin, createEmptyCompanyAdmin } from "./company-admin.model";
import { Company, createEmptyCompany } from "./company.model";

export interface UserReport {
    id: number;
    description: string;
    response: string | null;
    sender: BasicUser;
    reportedCompany: Company;
    reportedCompanyAdmin: CompanyAdmin;
    status: String;
  }


  export const createEmptyReport = (): UserReport => ({
    id: 0,
    description: '',
    response: null,
    sender: createEmptyBasicUser(),
    reportedCompany: createEmptyCompany(),
    reportedCompanyAdmin: createEmptyCompanyAdmin(),
    status: ''
  });