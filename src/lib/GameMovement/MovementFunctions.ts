import { ChessHexagon, Coords, PlayerColor } from "../../types/SharedTypes";
import { coordinatesToId } from "../Helpers";

/**
 * Check if a hex has an enemy piece
 */
export const isHexEnemy = (c: Coords, currentPlayer: PlayerColor, map: Map<string, ChessHexagon>) => {
    const hex = map.get(coordinatesToId(c.q, c.r, c.s));
    if (!hex) return false;
    if (!hex.piece) return false;
    if (hex.piece.player !== currentPlayer) return true;
}


/**
 * Check if a hex is empty
 */
export const isHexEmpty = (c: Coords, map: Map<string, ChessHexagon>) => {
    const hex = map.get(coordinatesToId(c.q, c.r, c.s));
    if (!hex) return false;
    if (hex.piece) return false;
    return true;
}

/**
 * Move a certain distance forwards, with the direction depending on the player
 */
export const moveForward = (c: Coords, distance: number, player: string): Coords => {
    if (player === 'white') {
        return { q: c.q, r: c.r - distance, s: c.s + distance };
    }
    return { q: c.q, r: c.r + distance, s: c.s - distance };
}

/**
 * Move a certain distance backwards, with the direction depending on the player
 */
export const moveBackwards = (c: Coords, distance: number, player: string): Coords => {
    if (player === 'white') {
        return { q: c.q, r: c.r + distance, s: c.s - distance };
    }
    return { q: c.q, r: c.r - distance, s: c.s + distance };
}

/**
 * Move one diagonal right forward
 */
export const moveDiagonalRightForward = (c: Coords, distance: number, player: string): Coords => {
    if (player === 'white') {
        return { q: c.q + distance, r: c.r - distance, s: c.s };
    }
    return { q: c.q - distance, r: c.r + distance, s: c.s };
}

/**
 * Move one diagonal left forward
 */
export const moveDiagonalLeftForward = (c: Coords, distance: number, player: string): Coords => {
    if (player === 'white') {
        return { q: c.q - distance, r: c.r, s: c.s + distance };
    }
    return { q: c.q + distance, r: c.r, s: c.s - distance };
}

/**
 * Move one diagonal right backwards
 */
export const moveDiagonalRightBackward = (c: Coords, distance: number, player: string): Coords => {
    if (player === 'white') {
        return { q: c.q + distance, r: c.r, s: c.s - distance };
    }
    return { q: c.q - distance, r: c.r, s: c.s + distance };
}

/**
 * Move one diagonal left backwards
 */
export const moveDiagonalLeftBackward = (c: Coords, distance: number, player: string): Coords => {
    if (player === 'white') {
        return { q: c.q - distance, r: c.r + distance, s: c.s };
    }
    return { q: c.q + distance, r: c.r - distance, s: c.s };
}

// ----------------------------- Skip Diagonals -----------------------------

/**
 * Skipping, used for bishop movement
 */
export const moveSkipDiagonalLeftForward = (c: Coords, distance: number, player: string): Coords => {
    if (player === 'white') {
        return { q: c.q - distance, r: c.r - distance, s: c.s + distance * 2 };
    }
    return { q: c.q + distance, r: c.r + distance, s: c.s - distance * 2 };
}

/**
 * Skipping, used for bishop movement
 */
export const moveSkipDiagonalRightForward = (c: Coords, distance: number, player: string): Coords => {
    if (player === 'white') {
        return { q: c.q + distance, r: c.r - distance * 2, s: c.s + distance };
    }
    return { q: c.q - distance, r: c.r + distance * 2, s: c.s - distance };
}

/**
 * Skipping, used for bishop movement
 */
export const moveSkipDiagonalLeftBackwards = (c: Coords, distance: number, player: string): Coords => {
    if (player === 'white') {
        return { q: c.q - distance, r: c.r + distance * 2, s: c.s - distance };
    }
    return { q: c.q + distance, r: c.r - distance * 2, s: c.s + distance };
}

/**
 * Skipping, used for bishop movement
 */
export const moveSkipDiagonalRightBackwards = (c: Coords, distance: number, player: string): Coords => {
    if (player === 'white') {
        return { q: c.q + distance, r: c.r + distance, s: c.s - distance * 2 };
    }
    return { q: c.q - distance, r: c.r - distance, s: c.s + distance * 2 };
}

/**
 * Skipping, used for bishop movement
 */
export const moveSkipLeft = (c: Coords, distance: number, player: string): Coords => {
    if (player === 'white') {
        return { q: c.q - distance * 2, r: c.r + distance, s: c.s + distance };
    }
    return { q: c.q + distance * 2, r: c.r - distance, s: c.s - distance };
}

/**
 * Skipping, used for bishop movement
 */
export const moveSkipRight = (c: Coords, distance: number, player: string): Coords => {
    if (player === 'white') {
        return { q: c.q + distance * 2, r: c.r - distance, s: c.s - distance };
    }
    return { q: c.q - distance * 2, r: c.r + distance, s: c.s + distance };
}