import { Plateau, createSpace } from "../src/plateau";
import { Rover, FacingDirection } from "../src/rover.types";
import { createRover } from "../src/rover";

export type Mars = {
  plateau: Plateau;
  rover: Rover;
};

export function createMars(input: string[]) {
  const plateau = createPlateau(input[0]);
  const rover = landRover(input[1], plateau);
  return { plateau: plateau, rover: rover };
}

function createPlateau(line: string) {
  const lineAsArray = line.split(" ");
  if (lineAsArray.length > 2)
    throw new Error("Can't create plateau, invalid first line");
  try {
    const plateau = createSpace(Number(lineAsArray[0]), Number(lineAsArray[1]));
    return plateau;
  } catch (error) {
    throw new Error(`Can't create plateau - ${error}`);
  }
}

function landRover(line: string, plateau: Plateau) {
  const lineAsArray = line.split(" ");
  return createRover(
    plateau,
    Number(lineAsArray[0]),
    Number(lineAsArray[1]),
    lineAsArray[2] as FacingDirection
  );
}
