import { useState, useEffect } from "react";
import Button from "../components/Button";
import Textfield from "../components/Textfield";
import { appState } from "../lib/State";
import { connection } from "../lib/util/Connection";
import { useToast } from "../lib/hooks/useToast";
import { useSnapshot } from "valtio";
import GameTitle from "../features/GameTitle";

const Menu = () => {

  const appStateSnap = useSnapshot(appState);
  const [awaitingResponse, setAwaitingResponse] = useState(false);
  const [lobbyId, setLobbyId] = useState("");

  const showToastInvalidId = useToast("Invalid lobby ID");
  const showToastInvalidCreate = useToast("Couldn't create lobby");
  const showToastPlayerLeft = useToast("The other player left the game!");

  useEffect(() => {
    if (appStateSnap.showPlayerLeftMessage) {
      showToastPlayerLeft();
      appState.showPlayerLeftMessage = false;
    }
    return () => { }
  }, [])

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
          randomizeColor: false,
          playerColor: data.playerColor,
          players: {
            black: data.playerColor === "black" ? "You" : null,
            white: data.playerColor === "white" ? "You" : null,
          },
          messages: [],
        };
      } else {
        showToastInvalidCreate()
      }

      setAwaitingResponse(false);
    });
  };

  /**
   * Join a lobby with the given ID
   */
  const handleJoinLobby = (code: string) => {
    setAwaitingResponse(true);
    connection.send({ tag: "JoinLobby", id: code }, (data) => {
      if (data.tag === "JoinedLobby") {
        appState.screen = "lobby";
        appState.lobby = {
          id: data.id,
          isHost: false,
          randomizeColor: data.randomizeColor,
          playerColor: data.playerColor,
          players: {
            black: data.playerColor === "black" ? "You" : "Opponent",
            white: data.playerColor === "white" ? "You" : "Opponent",
          },
          messages: [],
        };
      } else {
        showToastInvalidId()
      }

      setAwaitingResponse(false);
    });
  };

  /**
   * Copy the lobby ID to the clipboard
   */
  const handlePasteLobbyId = () => {
    navigator.clipboard.readText().then((text) => {
      if (text.length !== 4) {
        showToastInvalidId()
        return;
      }
      handleJoinLobby(text);
    });
  };

  return (
    <div className="flex flex-col gap-4 md:gap-8">

      <GameTitle />

      <div className="grid grid-cols-1 md:grid-cols-1-auto-1 gap-8">

        <div className="flex flex-col">
          <h2 className="text-xl md:text-2xl text-center text-white mb-4">
            Join Lobby
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Textfield
              id="lobbyid-input"
              placeholder="Lobby ID"
              value={lobbyId}
              onChange={(value) => setLobbyId(value.toUpperCase())}
              onEnter={() => handleJoinLobby(lobbyId)}
              maxLength={4}
            />
            <div className="hidden lg:block"></div>
            <Button
              text="Join"
              onClick={() => handleJoinLobby(lobbyId)}
              disabled={awaitingResponse || lobbyId.length !== 4}
            />
            <Button
              text="Paste"
              onClick={handlePasteLobbyId}
            />
          </div>
        </div>

        <div className="border-b-2 w-2/3 justify-self-center md:h-3/4 md:w-auto md:border-l-2 md:border-b-0 border-neutral-500 self-center"></div>

        <div className="flex flex-col">
          <h2 className="text-xl md:text-2xl text-center text-white mb-4">
            Create Lobby
          </h2>
          <Button
            text="Create Lobby"
            onClick={handleCreateLobby}
            disabled={awaitingResponse}
          />
        </div>
      </div>
    </div>
  );
};

export default Menu;