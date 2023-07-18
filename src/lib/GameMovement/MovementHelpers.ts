import { ChessHexagon, Coords, PlayerColor } from "../../types/SharedTypes";
import { coordinatesToId, isValidCoordinates } from "../util/Helpers";
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


/**
 * Checks if a pawn is en passant
 * @param fromHex 
 * @param map 
 * @param turn 
 * @returns 
 */
export const getPawnEnPassant = (fromHex: ChessHexagon, map: Map<string, ChessHexagon>, turn: number): Coords[] => {

    if (!fromHex.piece || fromHex.piece.type !== "pawn") return [];

    const { q, r, s } = fromHex.coords;

    const playerColor = fromHex.piece.player;

    const checkHexRight = playerColor === "white" ? coordinatesToId({ q: q + 1, r: r, s: s - 1 }) : coordinatesToId({ q: q + 1, r: r - 1, s: s });
    const checkHexLeft = playerColor === "white" ? coordinatesToId({ q: q - 1, r: r + 1, s: s }) : coordinatesToId({ q: q - 1, r: r, s: s + 1 });
    const hexRight = map.get(checkHexRight);
    const hexLeft = map.get(checkHexLeft);

    const result: Coords[] = [];

    if (
        hexRight?.piece?.type === "pawn" &&
        hexRight.piece.player !== playerColor &&
        hexRight.piece.pawnDoubleStepTurn === turn - 0.5
    ) {
        result.push(playerColor === "white" ? { q: q + 1, r: r - 1, s: s } : { q: q + 1, r: r, s: s - 1 });
    }

    if (
        hexLeft?.piece?.type === "pawn" &&
        hexLeft.piece.player !== playerColor &&
        hexLeft.piece.pawnDoubleStepTurn === turn - 0.5
    ) {
        result.push(playerColor === "white" ? { q: q - 1, r: r, s: s + 1 } : { q: q - 1, r: r - 1, s: s });
    }

    return result;
}