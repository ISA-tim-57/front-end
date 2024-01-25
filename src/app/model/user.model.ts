export interface User{
    id : number,
    email : string,
    password : string,
    username : string,
     role: string,
    
}

export const createEmptyUser = (): User => ({
    id: 0,
    email: '',
    password: '',
    username: '',
    role: '',
  });