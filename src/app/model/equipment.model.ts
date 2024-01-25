export interface Equipment{
    id: number,
    name : string,
    description : string,
    price : number,
    count : number,
    companyId : number
}

export const createEmptyEquipment = (): Equipment => ({
    id: 0,
    name: '',
    description: '',
    price : 0,
    count : 0,
    companyId : 0
  });