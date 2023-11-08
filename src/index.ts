import { Plateau, createSpace } from "../src/plateau";

export type Mars = {
  plateau: Plateau;
};

export function createMars(input: string[]) {
  const firstLineAsArray = input[0].split(" ");
  const plateau = createSpace(
    Number(firstLineAsArray[0]),
    Number(firstLineAsArray[1])
  );
  return {
    plateau: plateau,
  };
}
