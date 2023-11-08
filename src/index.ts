import { Plateau, createSpace } from "../src/plateau";
import {
  Rover,
  FacingDirection,
  FacingDirections,
  Move,
} from "../src/rover.types";
import { createRover, move } from "../src/rover";

export type Mars = {
  plateau: Plateau;
  rover: Rover;
};

export function start(input: string[]) {
  const plateau = createPlateau(input[0]);
  const rover = landRover(input[1], plateau);
  moveRover(rover, input[2]);
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
  const direction = lineAsArray[2] as FacingDirection;
  if (lineAsArray.length !== 3 || !FacingDirections.includes(direction))
    throw new Error(`Can't create rover, invalid line: ${line}`);
  try {
    return createRover(
      plateau,
      Number(lineAsArray[0]),
      Number(lineAsArray[1]),
      direction
    );
  } catch (error) {
    throw new Error(`Can't create rover - ${error}`);
  }
}

function moveRover(rover: Rover, line: string) {
  move(rover, line as Move);
}
