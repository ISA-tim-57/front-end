export interface Appointment{
    id: number,
    administratorName : string,
    administratorSurname : string,
    dateAndTime : Date,
    duration : number,
    free : boolean,
    companyId : number,
}

export const createEmptyAppointment = (): Appointment=> ({
    id: 0,
    administratorName : '',
    administratorSurname : '',
    dateAndTime : new Date(),
    duration : 0,
    free : true,
    companyId : 0
  });