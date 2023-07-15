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

    const handleCopyLobbyId = () => {
        navigator.clipboard.writeText(lobby.id);
    }

    const canStart: boolean = (
        appStateSnap.lobby &&
        appStateSnap.lobby.isHost &&
        appStateSnap.lobby.players.black &&
        appStateSnap.lobby.players.white
    ) ? false : true;

    const host = appStateSnap.lobby.isHost ? appStateSnap.lobby.playerColor : (appStateSnap.lobby.playerColor === "black" ? "white" : "black");

    return (
        <div className='flex flex-col gap-14'>

            <div className='flex flex-col gap-2'>
                <h1 className='text-4xl font-bold text-center'>
                    {
                        lobby.id.split('').map((char, i) => (
                            <span key={i} className={`px-1 ${char.match(/\d/) ? 'text-indigo-500' : 'text-white'}`}>{char}</span>
                        ))
                    }
                </h1>
                <div className='text-center text-gray-300'>
                    <button className='inline text-indigo-500 font-semibold' onClick={handleCopyLobbyId} title='Copy ID to clipboard'>Copy</button>
                    {' '}this code and share it with a friend to play together!
                </div>
            </div>

            <div className='flex flex-col gap-4 self-center border p-6 rounded-xl'>
                <h3 className='text-2xl text-white text-center font-bold'>Lobby</h3>
                <div className='flex gap-2 text-gray-300'>
                    <span>Black:</span>
                    <span className='font-bold'>{lobby.players.black} {host === "black" && "(Host)"}</span>
                </div>
                <div className='flex gap-2 text-gray-300'>
                    <span>White:</span>
                    <span className='font-bold'>{lobby.players.white} {host === "white" && "(Host)"}</span>
                </div>
            </div>

            <div className='text-gray-300 text-center'>
                {
                    lobby.players.black && lobby.players.white ? 'Waiting for host to start' : 'Waiting for players...'
                }
            </div>

            <div className='flex gap-14 w-full justify-center'>
                <Button text="Exit" onClick={handleLeaveLobby} />
                <Button text="Start" onClick={handleStartGame} disabled={canStart} />
            </div>

        </div>
    )
}

export default Lobby