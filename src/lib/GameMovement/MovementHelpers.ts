import { ChessHexagon, Coords, PlayerColor } from "../../types/SharedTypes";
import { isValidCoordinates } from "../util/Helpers";
import { isHexEmpty, isHexEnemy } from "./MovementFunctions";

/**
 * Check if a movement is valid
 */
export const checkMovementPosition = (move: Coords, player: PlayerColor, map: Map<string, ChessHexagon>): boolean => {
    if (isValidCoordinates(move)) {
        if (isHexEnemy(move, player, map)) {
            return true;
        }
        if (isHexEmpty(move, map)) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

/**
 * Get all the possible movements in a diagonal direction
 */
export const getMovementDirection = ({ coords, piece }: ChessHexagon, map: Map<string, ChessHexagon>, moveFunction: (c: Coords, distance: number, player: PlayerColor) => Coords) => {

    const player = piece?.player;
    if (!player) return [];
    const possibleMovements = [];

    let found = false;
    let distance = 1;

    while (!found) {

        const move = moveFunction(coords, distance, player);

        if (isValidCoordinates(move)) {
            if (isHexEnemy(move, player, map)) {
                possibleMovements.push(move);
                found = true;
                break;
            }
            if (isHexEmpty(move, map)) {
                possibleMovements.push(move);
            } else {
                found = true;
                break;
            }
        } else {
            found = true;
            break;
        }

        distance++;
    }

    return possibleMovements;
}