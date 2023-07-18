import { useSnapshot } from 'valtio';
import Checkbox from '../components/Checkbox';
import Separator from '../components/Separator';
import { appState } from '../lib/State';

const GameSideboard = () => {

    const appStateSnap = useSnapshot(appState);
    if (!appStateSnap.game) return null;


    return (
        <div className='flex flex-col justify-between bg-gray-800 text-white min-w-fit'>

            <div className='flex flex-1'>
                <div className='flex flex-col justify-between w-full'>

                    <div>
                        <div className='flex flex-col gap-2 py-8 px-8'>
                            <h3 className='text-2xl font-bold'>HexaChess</h3>
                            <div className='text-lg font-bold'>
                                {appStateSnap.game.gameEnded && "Game ended! Winner is " + appStateSnap.game.winner}
                            </div>
                        </div>
                    </div>

                    <div>
                        <Separator dir='horizontal' />

                        <div className='flex flex-col gap-2 py-8 px-8'>
                            <div>Settings</div>
                            <Checkbox
                                label='Display Coordinates'
                                onChange={(value) => appState.displayCoordinates = value}
                                checked={appStateSnap.displayCoordinates}
                            />
                        </div>
                    </div>

                </div>
            </div>

            <Separator dir='horizontal' />

            <div className='p-8 self-center'>
                <a href="https://sebastian-schuler.de/" target="_blank" className='text-center text-gray-400 text-sm hover:text-white transition'>Made by Sebastian Schuler</a>
            </div>

        </div>
    )
}

export default GameSideboard