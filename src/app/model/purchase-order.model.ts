import { Appointment, createEmptyAppointment } from "./appointment.model";
import { BasicUser, createEmptyBasicUser } from "./basic-user.model";
import { CompanyAdmin, createEmptyCompanyAdmin } from "./company-admin.model";

export interface PurchaseOrder{
    id: number,
    companyAdmin : CompanyAdmin,
    customer : BasicUser,
    appointment : Appointment,
    status : string,
}

export const createEmptyPurchaseOrder = (): PurchaseOrder=> ({
    id: 0,
    companyAdmin : createEmptyCompanyAdmin(),
    customer : createEmptyBasicUser(),
    appointment : createEmptyAppointment(),
    status : '',
  });