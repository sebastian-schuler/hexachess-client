import { ChessHexagon, PlayerColor } from "./SharedTypes"

export type AppState = {
    connectionStatus: "disconnected" | "connected",
    screen: "menu" | "lobby" | "game",

    lobby: GameLobby | null
    game: GameState | null
}

export type GameLobby = {
    id: string
    isHost: boolean
    playerColor: PlayerColor
    players: {
        black: string | null
        white: string | null
    }
}

export type GameState = {
    map: Map<string, ChessHexagon>
    currentTurn: PlayerColor
    turnCount: number
}