export type ClientToServer =
    | { tag: "CreateLobby" }
    | { tag: "LeaveLobby" }
    | { tag: "JoinLobby", id: string }
    | { tag: "StartGame" }
    | { tag: "MovePiece", idFrom: string, idTo: string }
    | { tag: "SwapPlayerColors" }
    | { tag: "SetRandomizeColor", randomizeColor: boolean }

export type ServerToClient =
    { tag: "Response", response: ResponseUpdate }
    | { tag: "Update", update: UnsolicitedUpdate }

// Jeder Request vom Client bekommt genau eine Response
export type ResponseUpdate =
    { tag: "Ok" }
    | { tag: "Error", message?: string, code: ResponseErrorCode }
    | { tag: "CreatedLobby", id: string, playerColor: PlayerColor }
    | { tag: "JoinedLobby", id: string, playerColor: PlayerColor, randomizeColor: boolean }

// Update ist eine asynchrone Nachricht vom Server; unabhängig von einem Request
export type UnsolicitedUpdate =
    { tag: "PlayerLeft" }
    | { tag: "PlayerJoined" }
    | { tag: "PlayerSwapped" }
    | { tag: "RandomizeColorsUpdated", randomizeColor: boolean }
    | { tag: "GameStarted", state: GameStateUpdate, playerColor: PlayerColor }
    | { tag: "GameStateUpdate", state: GameStateUpdate }
    | { tag: "GameEnded", winner: PlayerColor, state: GameStateUpdate }
    | { tag: "Message", message: string }

export type GameStateUpdate = {
    map: string
    currentTurn: PlayerColor
    turnCount: number
    blackCaptures: string[]
    whiteCaptures: string[]
    scoreBlack: number
    scoreWhite: number
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

export type Coords2D = {
    x: number,
    y: number
}

export type PlayerColor = "black" | "white";

export type ChessHexagon = {
    coords: Coords
    coords2D: Coords2D
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
    worth: number
    pawnDoubleStepTurn?: number
}

export type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';