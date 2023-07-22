import { ChessHexagon, PlayerColor } from "./SharedTypes"

export type AppState = {
    connectionStatus: "disconnected" | "connected",
    screen: "menu" | "lobby" | "game",

    lobby: GameLobby | null
    game: GameState | null

    displayCoordinates: boolean
    showPlayerLeftMessage: boolean
}

export type GameLobby = {
    id: string
    isHost: boolean
    randomizeColor: boolean
    playerColor: PlayerColor
    players: {
        black: string | null
        white: string | null
    }
    messages: string[]
}

export type GameState = {
    map: Map<string, ChessHexagon>
    currentTurn: PlayerColor
    turnCount: number

    gameEnded: boolean
    winner: PlayerColor | null

    blackCaptures: string[]
    whiteCaptures: string[]
    scoreBlack: number
    scoreWhite: number
}