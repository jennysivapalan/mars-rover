import { Plateau, createSpace } from "../src/plateau";

export type Mars = {
  plateau: Plateau;
};

export function createMars(input: string[]) {
  const firstLineAsArray = input[0].split(" ");
  if (firstLineAsArray.length > 2)
    throw new Error("Can't create plateau, invalid first line");
  try {
    const plateau = createSpace(
      Number(firstLineAsArray[0]),
      Number(firstLineAsArray[1])
    );
    return {
      plateau: plateau,
    };
  } catch (error) {
    throw new Error(`Can't create plateau - ${error}`);
  }
}