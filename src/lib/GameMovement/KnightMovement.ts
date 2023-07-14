import { ChessHexagon } from "../../types/SharedTypes";
import { checkMovementPosition } from "./MovementHelpers";

export const getKnightMovements = (hex: ChessHexagon, map: Map<string, ChessHexagon>) => {

    const possibleMovements = [];
    const c = hex.coords;

    const moves = [
        { q: c.q - 1, r: c.r - 2, s: c.s + 3 },
        { q: c.q - 2, r: c.r - 1, s: c.s + 3 },
        { q: c.q + 1, r: c.r - 3, s: c.s + 2 },
        { q: c.q + 2, r: c.r - 3, s: c.s + 1 },
        { q: c.q - 1, r: c.r + 3, s: c.s - 2 },
        { q: c.q - 2, r: c.r + 3, s: c.s - 1 },
        { q: c.q + 1, r: c.r + 2, s: c.s - 3 },
        { q: c.q + 2, r: c.r + 1, s: c.s - 3 },
        { q: c.q + 3, r: c.r - 1, s: c.s - 2 },
        { q: c.q + 3, r: c.r - 2, s: c.s - 1 },
        { q: c.q - 3, r: c.r + 2, s: c.s + 1 },
        { q: c.q - 3, r: c.r + 1, s: c.s + 2 },
    ]

    for (const move of moves) {
        if (hex.piece && checkMovementPosition(move, hex.piece.player, map)) {
            possibleMovements.push(move);
        }
    }

    return possibleMovements;
}