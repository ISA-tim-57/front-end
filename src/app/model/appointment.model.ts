export interface Appointment{
    id: number,
    administratorName : string,
    administratorSurname : string,
    adminUserId : number,
    dateAndTime : string,
    duration : number,
    free : boolean,
    companyId : number,
}

export const createEmptyAppointment = (): Appointment=> ({
    id: 0,
    administratorName : '',
    administratorSurname : '',
    adminUserId : 0,
    dateAndTime : new Date().toISOString(),
    duration : 0,
    free : true,
    companyId : 0
  });