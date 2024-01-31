export interface EmailRequest{
    to :string,
    subject : string,
    body : string,
}

export const createEmptyMailrequest = (): EmailRequest => ({
    to : '',
    subject : '',
    body : '',
  });