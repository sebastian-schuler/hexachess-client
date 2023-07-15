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
        <div className="flex flex-col gap-20">

            <h1 className="text-6xl font-bold text-center text-white">HexaChess</h1>

            <div className="flex flex-col sm:flex-row gap-40 sm:gap-0 justify-evenly">

                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-bold text-center text-white mb-8">Join Lobby</h2>
                    <Textfield
                        id="lobbyid-input"
                        placeholder="Lobby ID"
                        value={lobbyId}
                        onChange={(value) => setLobbyId(value.toUpperCase())}
                        onEnter={handleJoinLobby}
                    />
                    <Button text="Join Lobby" onClick={handleJoinLobby} disabled={awaitingResponse || lobbyId.length !== 4} />
                </div>

                <div className="border-b-2 w-48 sm:h-48 sm:w-auto sm:border-l-2 sm:border-b-0 border-neutral-400 self-center"></div>

                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-bold text-center text-white mb-8">Create New Lobby</h2>
                    <Button text="Create Lobby" onClick={handleCreateLobby} disabled={awaitingResponse} />
                </div>

            </div>

        </div>
    )
}

export default Menu