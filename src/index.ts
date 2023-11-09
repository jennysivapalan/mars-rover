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
};

export function start(input: string[]) {
  const plateau = createPlateau(input[0]);
  landAndMoveRovers(input.slice(1), plateau);

  return { plateau: plateau };
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

function landAndMoveRovers(input: string[], plateau: Plateau) {
  for (let i = 0; i < input.length; i = i + 2) {
    const roverLine = input[i];
    const moveLine = input[i + 1];
    const rover = landRover(roverLine, plateau);
    plateau.rovers.push(rover);
    moveRover(rover, moveLine);
  }

  return plateau;
}

export function landRover(line: string, plateau: Plateau) {
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
  const lineAsArray = line.split("");
  if (lineAsArray.length === 0) throw new Error("Invalid move supplied");
  return lineAsArray.map((movement) => move(rover, movement as Move));
}
