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