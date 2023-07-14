import { useSnapshot } from 'valtio';
import Button from '../components/Button';
import { appState } from '../lib/State';
import { connection } from '../lib/util/Connection';

const Lobby = () => {

    const appStateSnap = useSnapshot(appState);
    const lobby = appStateSnap.lobby;
    if (!lobby) return null;

    const handleLeaveLobby = () => {
        connection.send({ tag: "LeaveLobby" });
        appState.screen = "menu";
        appState.lobby = null;
    }

    const handleStartGame = () => {
        connection.send({ tag: "StartGame" });
    }

    const canStart: boolean = (
        appStateSnap.lobby &&
        appStateSnap.lobby.isHost &&
        appStateSnap.lobby.players.black &&
        appStateSnap.lobby.players.white
    ) ? false : true;

    const host = appStateSnap.lobby.isHost && appStateSnap.lobby.players.black === "You" ? "black" : "white";

    return (
        <div className='flex flex-col'>
            <h1 className='text-4xl font-bold text-center'>
                {
                    lobby.id.split('').map((char, i) => (
                        <span key={i} className={`${char.match(/\d/) ? 'text-indigo-700' : 'text-black'}`}>{char}</span>
                    ))
                }
            </h1>
            <h3>Lobby</h3>

            <div>Black: {lobby.players.black} {host === "black" && "(Host)"}</div>
            <div>White: {lobby.players.white} {host === "white" && "(Host)"}</div>

            <div className='flex gap-4 w-full justify-between'>
                <Button text="Exit" variant='outlined' onClick={handleLeaveLobby} />
                <Button text="Start" onClick={handleStartGame} disabled={canStart} />
            </div>

        </div>
    )
}

export default Lobby