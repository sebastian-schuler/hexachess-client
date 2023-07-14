import { ChessHexagon } from "../../../../shared/SharedTypes";
import {  moveBackwards, moveDiagonalLeftBackward, moveDiagonalLeftForward, moveDiagonalRightBackward, moveDiagonalRightForward, moveForward, moveSkipDiagonalLeftBackwards, moveSkipDiagonalLeftForward, moveSkipDiagonalRightBackwards, moveSkipDiagonalRightForward, moveSkipLeft, moveSkipRight } from "./MovementFunctions";
import { getMovementDirection } from "./MovementHelpers";

export const getQueenMovements = (hex: ChessHexagon, map: Map<string, ChessHexagon>) => {

    const possibleMovements = [];

    possibleMovements.push(...getMovementDirection(hex, map, moveForward));
    possibleMovements.push(...getMovementDirection(hex, map, moveBackwards));
    possibleMovements.push(...getMovementDirection(hex, map, moveDiagonalRightForward));
    possibleMovements.push(...getMovementDirection(hex, map, moveDiagonalLeftForward));
    possibleMovements.push(...getMovementDirection(hex, map, moveDiagonalRightBackward));
    possibleMovements.push(...getMovementDirection(hex, map, moveDiagonalLeftBackward));

    possibleMovements.push(...getMovementDirection(hex, map, moveSkipDiagonalLeftForward));
    possibleMovements.push(...getMovementDirection(hex, map, moveSkipDiagonalRightForward));
    possibleMovements.push(...getMovementDirection(hex, map, moveSkipDiagonalLeftBackwards));
    possibleMovements.push(...getMovementDirection(hex, map, moveSkipDiagonalRightBackwards));
    possibleMovements.push(...getMovementDirection(hex, map, moveSkipLeft));
    possibleMovements.push(...getMovementDirection(hex, map, moveSkipRight));

    return possibleMovements;
}