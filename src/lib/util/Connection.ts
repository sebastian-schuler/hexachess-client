import { ChessHexagon, ClientToServer, ResponseUpdate, ServerToClient } from "../../types/SharedTypes";
import { appState } from "../State";

const URL = import.meta.env.DEV ? "ws://localhost:8080" : import.meta.env.VITE_WS_URL;

class Connection {

    private ws: WebSocket;
    private responseHandlers: Array<(data: ResponseUpdate) => void>;

    constructor() {

        console.log("Connection constructor");

        this.ws = new WebSocket(URL);
        this.responseHandlers = [];

        this.ws.onopen = () => {
            console.log("open");
            appState.connectionStatus = "connected";
        }

        this.ws.onmessage = (event) => {

            const data = JSON.parse(event.data) as ServerToClient;

            if (data.tag == "Response") {

                const callback = this.responseHandlers.shift();
                if (callback !== undefined) callback(data.response);

            } else if (data.tag == "Update") {

                switch (data.update.tag) {

                    case "PlayerSwapped":
                        if (!appState.lobby) return;
                        const temp = appState.lobby.players.black;
                        appState.lobby.players.black = appState.lobby.players.white;
                        appState.lobby.players.white = temp;
                        appState.lobby.playerColor = appState.lobby.playerColor == "black" ? "white" : "black";
                        break;

                    case "PlayerJoined":
                        if (appState.lobby && appState.lobby?.players.black == null)
                            appState.lobby.players.black = "Opponent";
                        else if (appState.lobby && appState.lobby?.players.white == null)
                            appState.lobby.players.white = "Opponent";
                        break;

                    case "PlayerLeft":
                        if (appState.game !== null) {
                            // Leave the game
                            appState.game = null;
                            appState.screen = "menu";
                            appState.showPlayerLeftMessage = true;

                        } else if (appState.lobby) {
                            // Remove opponent from lobby, become host
                            if (appState.lobby?.players.black == "Opponent") {
                                appState.lobby.players.black = null;
                            }
                            else if (appState.lobby.players.white == "Opponent") {
                                appState.lobby.players.white = null;
                            }
                            appState.lobby.isHost = true;
                        }
                        break;

                    case "GameStarted":
                        const initialMap = new Map<string, ChessHexagon>(JSON.parse(data.update.state.map));
                        appState.game = {
                            map: initialMap,
                            currentTurn: data.update.state.currentTurn,
                            turnCount: data.update.state.turnCount,
                            gameEnded: false,
                            winner: null,
                            blackCaptures: data.update.state.blackCaptures,
                            whiteCaptures: data.update.state.whiteCaptures,
                            scoreBlack: data.update.state.scoreBlack,
                            scoreWhite: data.update.state.scoreWhite
                        }
                        appState.screen = "game";
                        break;

                    case "GameStateUpdate":
                        const updatedMap = new Map<string, ChessHexagon>(JSON.parse(data.update.state.map));
                        appState.game = {
                            map: updatedMap,
                            currentTurn: data.update.state.currentTurn,
                            turnCount: data.update.state.turnCount,
                            gameEnded: false,
                            winner: null,
                            blackCaptures: data.update.state.blackCaptures,
                            whiteCaptures: data.update.state.whiteCaptures,
                            scoreBlack: data.update.state.scoreBlack,
                            scoreWhite: data.update.state.scoreWhite
                        }
                        break;

                    case "GameEnded":
                        const finalMap = new Map<string, ChessHexagon>(JSON.parse(data.update.state.map));
                        appState.game = {
                            map: finalMap,
                            currentTurn: data.update.state.currentTurn,
                            turnCount: data.update.state.turnCount,
                            gameEnded: true,
                            winner: data.update.winner,
                            blackCaptures: data.update.state.blackCaptures,
                            whiteCaptures: data.update.state.whiteCaptures,
                            scoreBlack: data.update.state.scoreBlack,
                            scoreWhite: data.update.state.scoreWhite
                        }
                        break;
                }
            }
        }

        this.ws.onerror = (error) => {
            appState.connectionStatus = "disconnected";
            console.log(error);
        }
    }

    close() {
        console.log("close");
        this.ws.close();
    }

    send(message: ClientToServer, callback?: (data: ResponseUpdate) => void) {
        if (this.ws.readyState != WebSocket.OPEN) throw new Error("Connection not open");
        if (callback !== undefined) this.responseHandlers.push(callback);
        this.ws.send(JSON.stringify(message));
    }
}

export const connection = new Connection();
