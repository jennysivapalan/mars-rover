import { Plateau, createSpace } from "./plateau/plateau";
import {
  Rover,
  FacingDirection,
  FacingDirections,
  Move,
  MOVES,
} from "./rover/rover.types";
import { createRover, move } from "./rover/rover";

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
  const direction = lineAsArray[2];
  if (lineAsArray.length !== 3 || !checkIsFacingDirection(direction))
    throw new Error(`Can't create rover, invalid line: ${line}`);
  try {
    return createRover(
      plateau,
      Number(lineAsArray[0]),
      Number(lineAsArray[1]),
      direction as FacingDirection
    );
  } catch (error) {
    throw new Error(`Can't create rover - ${error}`);
  }
}

function checkIsFacingDirection(value: unknown) {
  return (
    typeof value === "string" &&
    FacingDirections.some((direction) => value === direction)
  );
}

function moveRover(rover: Rover, line: string) {
  const lineAsArray = line.split("");
  if (lineAsArray.length === 0) throw new Error("Invalid move supplied");
  return lineAsArray.map((movement) => {
    if (checkIsMove(movement)) move(rover, movement as Move);
    else throw new Error("Invalid move supplied");
  });
}

function checkIsMove(value: unknown) {
  return typeof value === "string" && MOVES.some((move) => move === value);
}
