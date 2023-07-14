import { ChessHexagon } from "../../types/SharedTypes";
import { moveBackwards, moveDiagonalLeftBackward, moveDiagonalLeftForward, moveDiagonalRightBackward, moveDiagonalRightForward, moveForward } from "./MovementFunctions";
import { getMovementDirection } from "./MovementHelpers";

export const getRookMovements = (hex: ChessHexagon, map: Map<string, ChessHexagon>) => {

    const possibleMovements = [];

    possibleMovements.push(...getMovementDirection(hex, map, moveForward));
    possibleMovements.push(...getMovementDirection(hex, map, moveBackwards));
    possibleMovements.push(...getMovementDirection(hex, map, moveDiagonalRightForward));
    possibleMovements.push(...getMovementDirection(hex, map, moveDiagonalLeftForward));
    possibleMovements.push(...getMovementDirection(hex, map, moveDiagonalRightBackward));
    possibleMovements.push(...getMovementDirection(hex, map, moveDiagonalLeftBackward));

    return possibleMovements;
}