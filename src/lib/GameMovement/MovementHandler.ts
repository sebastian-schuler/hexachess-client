import { ChessHexagon } from "../../types/SharedTypes";
import { getBishopMovements } from "./BishopMovement";
import { getKingMovements } from "./KingMovement";
import { getKnightMovements } from "./KnightMovement";
import { getPawnMovements } from "./PawnMovement";
import { getQueenMovements } from "./QueenMovement";
import { getRookMovements } from "./RookMovement";

export const getPossibleMovements = (hex: ChessHexagon, map: Map<string, ChessHexagon>, turn: number) => {

    const type = hex.piece?.type;
    const player = hex.piece?.player;

    if (!type || !player) return [];

    if (type === 'pawn') return getPawnMovements(hex, map, turn);
    if (type === 'bishop') return getBishopMovements(hex, map);
    if (type === 'rook') return getRookMovements(hex, map);
    if (type === 'knight') return getKnightMovements(hex, map);
    if (type === 'queen') return getQueenMovements(hex, map);
    if (type === 'king') return getKingMovements(hex, map);

    return [];
}