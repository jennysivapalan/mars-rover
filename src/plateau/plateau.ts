import { Rover } from "../rover/rover.types";

export type Plateau = { width: number; height: number; rovers: Rover[] };

export function createSpace(width: number, height: number) {
  if (
    width >= 0 &&
    height >= 0 &&
    Number.isInteger(width) &&
    Number.isInteger(height)
  ) {
    const rovers: Rover[] = [];
    return { width: width, height: height, rovers: rovers };
  } else throw new Error("Invalid parameters, try again");
}

export function addRover(plateau: Plateau, rover: Rover) {
  plateau.rovers.push(rover);
  return plateau;
}
