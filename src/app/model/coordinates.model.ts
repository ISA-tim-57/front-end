export interface Coordinates{
    longitude : number,
    latitude : number,
}

export const createEmptyCoordinates = (): Coordinates => ({
    longitude : 0,
    latitude : 0,
  });