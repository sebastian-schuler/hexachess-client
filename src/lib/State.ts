import { proxy } from "valtio";
import { AppState } from "../types/ClientTypes";

export const appState = proxy<AppState>({

    connectionStatus: "disconnected",
    screen: "menu",

    lobby: null,
    game: null,

});