export type ClientToServer =
    | { tag: "CreateLobby" }
    | { tag: "LeaveLobby" }
    | { tag: "JoinLobby", id: string }
    | { tag: "StartGame" }
    | { tag: "MovePiece", idFrom: string, idTo: string }

export type ServerToClient =
    { tag: "Response", response: ResponseUpdate }
    | { tag: "Update", update: UnsolicitedUpdate }

// Jeder Request vom Client bekommt genau eine Response
export type ResponseUpdate =
    { tag: "Ok" }
    | { tag: "Error", message?: string, code: ResponseErrorCode }
    | { tag: "CreatedLobby", id: string, playerColor: PlayerColor }
    | { tag: "JoinedLobby", id: string, playerColor: PlayerColor }

// Update ist eine asynchrone Nachricht vom Server; unabhängig von einem Request
export type UnsolicitedUpdate =
    { tag: "PlayerLeft" }
    | { tag: "PlayerJoined" }
    | { tag: "GameStarted", state: GameStateUpdate }
    | { tag: "GameStateUpdate", state: GameStateUpdate }
    | { tag: "GameEnded", winner: PlayerColor, state: GameStateUpdate }

export type GameStateUpdate = {
    map: string
    currentTurn: PlayerColor
    turnCount: number
}

export type ResponseErrorCode = "lobbyFull" | "invalidLobbyId";

/*****************************************************************
 *
 * Game Types
 *
 ****************************************************************/

export type Coords = {
    q: number,
    r: number,
    s: number
}

export type PlayerColor = "black" | "white";

export type ChessHexagon = {
    coords: Coords
    color: string
    piece: Piece | null
    isSelected: boolean
    isWalkable: boolean
}

export type Piece = {
    id: string
    type: PieceType
    player: PlayerColor
    hasWalked: boolean
}

export type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';