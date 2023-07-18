import { useSnapshot } from 'valtio';
import Button from '../components/Button';
import { appState } from '../lib/State';
import { connection } from '../lib/util/Connection';
import IconButton from '../components/IconButton';
import { BiCopy } from 'react-icons/bi';
import { MdSwapHoriz } from 'react-icons/md';

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

    const handleSwapPlayerColors = () => {
        connection.send({ tag: "SwapPlayerColors" });
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
                <h1 className="text-6xl font-bold text-center text-white">HexaChess</h1>
                <h2 className="text-3xl text-center text-white">Lobby</h2>
            </div>

            <div className='flex flex-col gap-4 self-center border border-primary-500 px-6 py-4 rounded-xl'>

                <div>
                    <div className='flex w-fit mx-auto gap-2'>
                        <div className='text-4xl font-bold text-center'>
                            {
                                lobby.id.split('').map((char, i) => (
                                    <span key={i} className={`px-1 ${char.match(/\d/) ? 'text-primary-500' : 'text-white'}`}>{char}</span>
                                ))
                            }
                        </div>
                        <IconButton
                            alt='Copy lobby ID'
                            onClick={handleCopyLobbyId}
                            icon={<BiCopy />}
                            variant='light'
                        />
                    </div>
                    <div className='text-center text-gray-300'>
                        Copy this code and share it with a friend to play together!
                    </div>
                </div>

                <div className={`grid ${appStateSnap.lobby.isHost ? 'grid-cols-3' : 'grid-cols-2'}`}>
                    <div className='justify-self-center gap-2 text-gray-300'>
                        <div className='flex justify-center'>
                            <img src='/pawn.svg' alt='Lobby' width={100} height={'auto'} className='invert-[.08]' />
                        </div>
                        <div className='font-bold text-center'>{lobby.players.black} {host === "black" && "(Host)"}</div>
                    </div>

                    {
                        appStateSnap.lobby.isHost && (
                            <div className='flex justify-self-center'>
                                <IconButton
                                    alt='Swap player colours'
                                    onClick={handleSwapPlayerColors}
                                    icon={<MdSwapHoriz />}
                                    size='lg'
                                />
                            </div>
                        )
                    }

                    <div className='justify-self-center text-gray-300'>
                        <div className='flex justify-center'>
                            <img src='/pawn.svg' alt='Lobby' width={100} height={'auto'} className='invert' />
                        </div>
                        <div className='font-bold text-center'>{lobby.players.white} {host === "white" && "(Host)"}</div>
                    </div>
                </div>

            </div>

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