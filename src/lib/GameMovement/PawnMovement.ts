import { ChessHexagon } from "../../types/SharedTypes";
import { isValidCoordinates } from "../util/Helpers";
import { isHexEmpty, isHexEnemy, moveDiagonalLeftForward, moveDiagonalRightForward, moveForward } from "./MovementFunctions";

export const getPawnMovements = ({ coords, piece }: ChessHexagon, map: Map<string, ChessHexagon>) => {

    const type = piece?.type;
    const player = piece?.player;

    if (!type || !player) return [];

    const possibleMovements = [];

    // One step forward
    const move1 = moveForward(coords, 1, player);
    if (isValidCoordinates(move1) && isHexEmpty(move1, map)) {
        possibleMovements.push(move1);
    }

    // Two steps forward
    if (piece && piece.hasWalked === false) {
        const move2 = moveForward(coords, 2, player);
        if (isValidCoordinates(move2) && isHexEmpty(move2, map) && isHexEmpty(move1, map)) {
            possibleMovements.push(move2);
        }
    }

    // Capture Right
    const capture1 = moveDiagonalRightForward(coords, 1, player);
    if (isValidCoordinates(capture1) && isHexEnemy(capture1, player, map)) {
        possibleMovements.push(capture1);
    }

    // Capture Left
    const capture2 = moveDiagonalLeftForward(coords, 1, player);
    if (isValidCoordinates(capture2) && isHexEnemy(capture2, player, map)) {
        possibleMovements.push(capture2);
    }

    return possibleMovements;
}