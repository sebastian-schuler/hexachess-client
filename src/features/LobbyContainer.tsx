import { BiCopy } from 'react-icons/bi'
import { useSnapshot } from 'valtio'
import IconButton from '../components/IconButton'
import { appState } from '../lib/State'
import { connection } from '../lib/util/Connection'
import { useMediaQuery } from '../lib/hooks/useMediaQuery'
import { PlayerColor } from '../types/SharedTypes'
import IconToggleButton from '../components/IconToggleButton'
import { FaRandom } from 'react-icons/fa'
import { IoMdSwap } from 'react-icons/io'

const getPawnImage = (color: PlayerColor, isMobile: boolean | undefined, isRandom: boolean) => {

    const fillColor = isRandom ? '#2A9D8F' : (color === 'white' ? '#F5F5F5' : '#0A0A0A');
    const strokeColor = color === 'white' ? '#000' : '#fff';
    const strokeWidth = isRandom ? 0 : (color === 'white' ? 1.3 : 0.5);

    return (
        <svg x={0} y={0} width={isMobile ? 50 : 80} height="100%" version="1.1" viewBox="10 10 52.48 69.645" xmlns="http://www.w3.org/2000/svg">
            <path
                fill={fillColor}
                strokeWidth={strokeWidth}
                stroke={strokeColor}
                d="m48.906 23.579a13.042 13.042 0 0 1-4.193 9.595l6.644 4.69v8.595h-6.505c0.314 3.984 2.87 7.971 6.178 11.449a49.238 49.238 0 0 0 10.538 8.27l0.412 0.236v12.731h-51.48v-12.731l0.412-0.236a49.238 49.238 0 0 0 10.538-8.27c3.308-3.478 5.864-7.465 6.178-11.449h-6.5v-8.595l6.188-4.368a13.074 13.074 0 1 1 21.6-9.917z"

            />
        </svg>
    )
}

type LobbyContainerProps = {}

const LobbyContainer = ({ }: LobbyContainerProps) => {

    const appStateSnap = useSnapshot(appState);
    const lobby = appStateSnap.lobby;
    if (!lobby) return null;

    const host = appStateSnap.lobby.isHost ? appStateSnap.lobby.playerColor : (appStateSnap.lobby.playerColor === "black" ? "white" : "black");

    const handleCopyLobbyId = () => {
        navigator.clipboard.writeText(lobby.id);
    }

    const handleSwapPlayerColors = () => {
        connection.send({ tag: "SwapPlayerColors" });
    }

    const handleRandomizeColors = () => {
        connection.send({ tag: "SetRandomizeColor", randomizeColor: !lobby.randomizeColor });
    }

    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <div className='flex flex-col gap-4 self-center border border-primary-500 px-6 py-4 rounded-xl'>

            {
                appStateSnap.lobby.isHost && (
                    <div>
                        <div className='flex w-fit mx-auto gap-2'>
                            <div className='text-2xl md:text-4xl font-bold text-center'>
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
                                size={isMobile ? 'md' : 'lg'}
                            />
                        </div>
                        <div className='text-center text-gray-300 mt-1'>
                            Copy this code and share it with a friend to play together!
                        </div>
                    </div>
                )
            }

            <div className={`grid ${appStateSnap.lobby.isHost ? 'grid-cols-3' : 'grid-cols-2'}`}>
                <div className='flex flex-col justify-self-center gap-2 text-gray-300'>
                    <div className='flex justify-center'>
                        {getPawnImage('black', isMobile, lobby.randomizeColor)}
                    </div>
                    <div className='font-bold text-center'>{lobby.players.black ? lobby.players.black : '...'} {host === "black" && "(Host)"}</div>
                </div>

                {
                    appStateSnap.lobby.isHost && (
                        <div className='flex flex-col justify-center gap-4'>
                            <IconButton
                                alt='Swap player colours'
                                onClick={handleSwapPlayerColors}
                                icon={<IoMdSwap />}
                                size={isMobile ? 'md' : 'lg'}
                                disabled={appStateSnap.lobby.randomizeColor}
                            />
                            <IconToggleButton
                                value={appStateSnap.lobby.randomizeColor}
                                alt='Randomize colours'
                                onClick={handleRandomizeColors}
                                icon={<FaRandom />}
                                size={isMobile ? 'md' : 'lg'}
                            />
                        </div>
                    )
                }

                <div className='flex flex-col justify-self-center gap-2 text-gray-300'>
                    <div className='flex justify-center'>
                        {getPawnImage('white', isMobile, lobby.randomizeColor)}
                    </div>
                    <div className='font-bold text-center'>{lobby.players.white ? lobby.players.white : '...'} {host === "white" && "(Host)"}</div>
                </div>
            </div>

        </div>

    )
}

export default LobbyContainer