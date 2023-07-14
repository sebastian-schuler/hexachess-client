import { ChessHexagon } from "../../types/SharedTypes";
import { moveSkipDiagonalLeftBackwards, moveSkipDiagonalLeftForward, moveSkipDiagonalRightBackwards, moveSkipDiagonalRightForward, moveSkipLeft, moveSkipRight } from "./MovementFunctions";
import { getMovementDirection } from "./MovementHelpers";

export const getBishopMovements = (hex: ChessHexagon, map: Map<string, ChessHexagon>) => {

    const possibleMovements = [];

    possibleMovements.push(...getMovementDirection(hex, map, moveSkipDiagonalLeftForward));
    possibleMovements.push(...getMovementDirection(hex, map, moveSkipDiagonalRightForward));
    possibleMovements.push(...getMovementDirection(hex, map, moveSkipDiagonalLeftBackwards));
    possibleMovements.push(...getMovementDirection(hex, map, moveSkipDiagonalRightBackwards));
    possibleMovements.push(...getMovementDirection(hex, map, moveSkipLeft));
    possibleMovements.push(...getMovementDirection(hex, map, moveSkipRight));

    return possibleMovements;
}
