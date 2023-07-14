import { ChessHexagon, Coords } from "../../../shared/SharedTypes";

export const coordinatesToId = (q: number, r: number, s: number) => {
    return `${q};${r};${s}`;
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