import { useSnapshot } from 'valtio';
import Button from '../components/Button';
import GameTitle from '../features/GameTitle';
import LobbyContainer from '../features/LobbyContainer';
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

    return (
        <div className='flex flex-col gap-2 md:gap-6'>

            <div className='flex flex-col md:gap-2'>
                <GameTitle />
                <h2 className="text-xl md:text-2xl text-center text-white">Game Lobby</h2>
            </div>

            <LobbyContainer />

            <div className='text-gray-300 text-center'>
                {
                    lobby.players.black && lobby.players.white ? 'Waiting for host to start' : 'Waiting for players...'
                }
            </div>

            <div className='grid grid-cols-2 gap-14 w-full justify-center'>
                <Button text="Exit" onClick={handleLeaveLobby} />
                <Button text="Start" onClick={handleStartGame} disabled={canStart} />
            </div>

        </div>
    )
}

export default Lobby