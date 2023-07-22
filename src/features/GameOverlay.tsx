import { useSnapshot } from 'valtio';
import { appState } from '../lib/State';
import { ChessHexagon, PlayerColor } from '../types/SharedTypes';
import IconButton from '../components/IconButton';
import { FiMenu } from 'react-icons/fi';

/**
 * Get the name of the piece
 * @param hex 
 * @returns 
 */
const getPieceName = (hex: ChessHexagon | null) => {
    if (!hex || !hex.piece) return null;
    let name = hex.piece.type.charAt(0).toUpperCase() + hex.piece.type.slice(1);
    return name;
}

/**
 * Get the graphic of the piece
 * @param key 
 * @param color 
 * @param type 
 * @returns 
 */
const getPieceGraphic = (key: number, color: PlayerColor, type: string) => {
    return <div key={key} className='stacked-piece'>
        <img src={`/${type}.svg`} alt='Captured' width={25} height={'auto'} className={`w-4 md:w-6 lg:w-7 ${color === "black" ? 'invert-[1]' : 'invert-[.1]'}`} />
    </div>
}

type GameOverlayProps = {
    isMyTurn: boolean;
    selectedHex: ChessHexagon | null;
    openDrawer: () => void;
    isMobile?: boolean;
}

const GameOverlay = ({ isMyTurn, selectedHex, isMobile, openDrawer }: GameOverlayProps) => {

    const appStateSnap = useSnapshot(appState);
    if (!appStateSnap.game || !appStateSnap.lobby) return null;

    return (
        <>
            <div className='absolute flex flex-col left-6 top-6 md:text-lg'>
                <div className='text-white'>
                    Turn: <span className='font-bold'>{Math.floor(appStateSnap.game.turnCount)}</span>
                </div>
                <div className='text-white'>
                    Selected: <span className='font-bold'>{selectedHex && getPieceName(selectedHex)}</span>
                </div>
                <div className={`${isMyTurn ? 'text-primary-500' : 'text-blue-500'} font-bold`}>
                    {isMyTurn ? "Your Turn!" : "Opponents Turn!"}
                </div>
            </div>

            <div className={`absolute flex gap-2 items-center right-6 ${appStateSnap.lobby.playerColor === 'white' ? 'top-6' : 'bottom-6'}`}>
                <div className='flex gap-2 bg-dark-500 p-2 rounded shadow-lg'>
                    {
                        appStateSnap.game.whiteCaptures.length > 0 && (
                            <div className='flex'>
                                {
                                    appStateSnap.game.blackCaptures.map((piece, i) => getPieceGraphic(i, 'black', piece))
                                }
                            </div>
                        )
                    }
                    <div className='text-white'>{appStateSnap.game.scoreBlack}</div>
                </div>
                {
                    isMobile && appStateSnap.lobby.playerColor === 'white' && <IconButton variant='light' alt='Open drawer' onClick={openDrawer} icon={<FiMenu />} size='lg'/>
                }
            </div>

            <div className={`absolute flex gap-2 items-center right-6 ${appStateSnap.lobby.playerColor === 'black' ? 'top-6' : 'bottom-6'}`}>
                <div className='flex gap-2 bg-dark-500 p-2 rounded shadow-lg'>
                    {
                        appStateSnap.game.whiteCaptures.length > 0 && (
                            <div className='flex'>
                                {
                                    appStateSnap.game.whiteCaptures.map((piece, i) => getPieceGraphic(i, 'white', piece))
                                }
                            </div>
                        )
                    }
                    <div className='text-white'>{appStateSnap.game.scoreWhite}</div>
                </div>
                {
                    isMobile && appStateSnap.lobby.playerColor === 'black' && <IconButton variant='light' alt='Open drawer' onClick={openDrawer} icon={<FiMenu />} size='lg'/>
                }
            </div>
        </>
    )
}

export default GameOverlay