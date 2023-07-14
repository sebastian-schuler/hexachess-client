import { PieceType, Player } from "../types/Piece";

type PieceEntry = {
    q: number,
    r: number,
    s: number,
    player: Player,
    type: PieceType
}

export const getInitialPieces = () => {

    const pieces: PieceEntry[] = [

        // White Pawns
        { q: -4, r: 5, s: -1, player: 'white', type: 'pawn' },
        { q: -3, r: 4, s: -1, player: 'white', type: 'pawn' },
        { q: -2, r: 3, s: -1, player: 'white', type: 'pawn' },
        { q: -1, r: 2, s: -1, player: 'white', type: 'pawn' },
        { q: 0, r: 1, s: -1, player: 'white', type: 'pawn' },
        { q: 1, r: 1, s: -2, player: 'white', type: 'pawn' },
        { q: 2, r: 1, s: -3, player: 'white', type: 'pawn' },
        { q: 3, r: 1, s: -4, player: 'white', type: 'pawn' },
        { q: 4, r: 1, s: -5, player: 'white', type: 'pawn' },

        // White Rooks
        { q: -3, r: 5, s: -2, player: 'white', type: 'rook' },
        { q: 3, r: 2, s: -5, player: 'white', type: 'rook' },

        // White Knights
        { q: -2, r: 5, s: -3, player: 'white', type: 'knight' },
        { q: 2, r: 3, s: -5, player: 'white', type: 'knight' },

        // White Bishops
        { q: 0, r: 3, s: -3, player: 'white', type: 'bishop' },
        { q: 0, r: 4, s: -4, player: 'white', type: 'bishop' },
        { q: 0, r: 5, s: -5, player: 'white', type: 'bishop' },

        // White Queen and King
        { q: -1, r: 5, s: -4, player: 'white', type: 'queen' },
        { q: 1, r: 4, s: -5, player: 'white', type: 'king' },

        // ==============================================

        // Black Pawns
        { q: -4, r: -1, s: 5, player: 'black', type: 'pawn' },
        { q: -3, r: -1, s: 4, player: 'black', type: 'pawn' },
        { q: -2, r: -1, s: 3, player: 'black', type: 'pawn' },
        { q: -1, r: -1, s: 2, player: 'black', type: 'pawn' },
        { q: 0, r: -1, s: 1, player: 'black', type: 'pawn' },
        { q: 1, r: -2, s: 1, player: 'black', type: 'pawn' },
        { q: 2, r: -3, s: 1, player: 'black', type: 'pawn' },
        { q: 3, r: -4, s: 1, player: 'black', type: 'pawn' },
        { q: 4, r: -5, s: 1, player: 'black', type: 'pawn' },

        // Black Rooks
        { q: -3, r: -2, s: 5, player: 'black', type: 'rook' },
        { q: 3, r: -5, s: 2, player: 'black', type: 'rook' },

        // Black Knights
        { q: -2, r: -3, s: 5, player: 'black', type: 'knight' },
        { q: 2, r: -5, s: 3, player: 'black', type: 'knight' },

        // Black Bishops
        { q: 0, r: -3, s: 3, player: 'black', type: 'bishop' },
        { q: 0, r: -4, s: 4, player: 'black', type: 'bishop' },
        { q: 0, r: -5, s: 5, player: 'black', type: 'bishop' },

        // Black Queen and King
        { q: -1, r: -4, s: 5, player: 'black', type: 'queen' },
        { q: 1, r: -5, s: 4, player: 'black', type: 'king' },

    ]

    return pieces;
}