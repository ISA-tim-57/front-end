export interface Equipment{
    id: number,
    name : string,
    description : string,
    price : number,
    companyId : number
}

export const createEmptyEquipment = (): Equipment => ({
    id: 0,
    name: '',
    description: '',
    price : 0,
    companyId : 0
  });