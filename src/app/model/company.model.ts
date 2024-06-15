import { Address, createEmptyAddress } from "./address.model";


export interface Company {
    id: number;
    name: string;
    description: string;
    address: Address;
    rating: number;
    workingHoursStart: string; // Promeni tip na string
    workingHoursEnd: string; // Promeni tip na string
}

const formatTime = (date: Date): string => {
    return date.toTimeString().split(' ')[0]; // Formatira datum u "HH:mm:ss"
};

export const createEmptyCompany = (): Company => ({
    id: 0,
    name: '',
    description: '',
    address: createEmptyAddress(),
    rating: 0,
    workingHoursStart: formatTime(new Date()),
    workingHoursEnd: formatTime(new Date())
});