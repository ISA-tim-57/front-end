export interface JwtToken{
    accessToken : string
    expiresIn : number
}

export const createEmptyJwtToken = (): JwtToken => ({
    accessToken : "",
    expiresIn : 0
  });