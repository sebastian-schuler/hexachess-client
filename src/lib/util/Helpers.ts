import { ChessHexagon, Coords } from "../../types/SharedTypes";

export const coordinatesToId = (c: Coords) => {
    return `${c.q};${c.r};${c.s}`;
}

export const getHexId = (hex: ChessHexagon) => {
    return `${hex.coords.q};${hex.coords.r};${hex.coords.s}`;
}

export const isValidCoordinates = (c: Coords) => {
    const MAX = 6 - 1;
    if (c.q < -MAX || c.r < -MAX || c.s < -MAX) return false;
    if (c.q > MAX || c.r > MAX || c.s > MAX) return false;
    return (c.q + c.r + c.s) === 0;
}

export const getNthLetter = (n: number): string => {

    if (n < 1 || n > 26) {
        return '';
    }

    const asciiOfA = 'A'.charCodeAt(0) - 1;
    const nthLetter = String.fromCharCode(asciiOfA + n);

    return nthLetter;
}