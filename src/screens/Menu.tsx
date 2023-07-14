import { useState } from "react";
import { connection } from "../lib/util/Connection";
import { appState } from "../lib/State";
import Button from "../components/Button";
import Textfield from "../components/Textfield";

const Menu = () => {

    const [awaitingResponse, setAwaitingResponse] = useState(false);
    const [lobbyId, setLobbyId] = useState("");

    /**
     * Create a new lobby
     */
    const handleCreateLobby = () => {
        setAwaitingResponse(true);
        connection.send({ tag: "CreateLobby" }, (data) => {
            if (data.tag === "CreatedLobby") {
                appState.screen = "lobby";
                appState.lobby = {
                    id: data.id,
                    isHost: true,
                    playerColor: data.playerColor,
                    players: {
                        black: data.playerColor === "black" ? "You" : null,
                        white: data.playerColor === "white" ? "You" : null
                    }
                }
            } else {
                console.log("Couldn't create lobby: ", data);
            }

            setAwaitingResponse(false);
        });
    }

    /**
     * Join a lobby with the given ID
     */
    const handleJoinLobby = () => {
        setAwaitingResponse(true);
        connection.send({ tag: "JoinLobby", id: lobbyId }, (data) => {

            if (data.tag === "JoinedLobby") {
                appState.screen = "lobby";
                appState.lobby = {
                    id: data.id,
                    isHost: false,
                    playerColor: data.playerColor,
                    players: {
                        black: data.playerColor === "black" ? "You" : "Opponent",
                        white: data.playerColor === "white" ? "You" : "Opponent"
                    }
                }
            } else {
                console.log("Couldn't join lobby: ", data);
            }

            setAwaitingResponse(false);
        });
    }

    return (
        <div className="p-8 flex flex-col gap-20">

            <div className="flex gap-4">
                <Button text="Join lobby" onClick={handleJoinLobby} disabled={awaitingResponse} />
                <Textfield
                    id="lobbyid-input"
                    placeholder="Lobby ID"
                    value={lobbyId}
                    onChange={(value) => setLobbyId(value.toUpperCase())}
                    onEnter={handleJoinLobby}
                />
            </div>

            <div className="border-b-2 border-neutral-400 w-10 self-center"></div>

            <Button text="Create lobby" onClick={handleCreateLobby} disabled={awaitingResponse} />

        </div>
    )
}

export default Menu