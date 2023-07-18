import { produce } from 'immer';
import { useCallback, useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import GameSideboard from '../features/GameSideboard';
import HexaBoard from '../features/HexaBoard';
import { getPossibleMovements } from '../lib/GameMovement/MovementHandler';
import { appState } from '../lib/State';
import { connection } from '../lib/util/Connection';
import { coordinatesToId, getHexId } from '../lib/util/Helpers';
import { ChessHexagon, PlayerColor } from "../types/SharedTypes";

/**
 * Get the graphic of the piece
 * @param key 
 * @param color 
 * @param type 
 * @returns 
 */
const getPieceGraphic = (key: number, color: PlayerColor, type: string) => {
    return <div key={key} className='stacked-element'>
        <img src={`/${type}.svg`} alt='Captured' width={25} height={'auto'} className={`w-6 lg:w-8 ${color === "black" ? 'invert-[1]' : 'invert-[.1]'}`} />
    </div>
}

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

const Game = () => {

    const appStateSnap = useSnapshot(appState);
    if (!appStateSnap.game) return null;

    const [gameMap, setGameMap] = useState<Map<string, ChessHexagon>>(appStateSnap.game.map);
    const [selectedHex, setSelectedHex] = useState<ChessHexagon | null>(null);
    const [previousSelectedHex, setPreviousSelectedHex] = useState<ChessHexagon | null>(null);
    const isMyTurn = appStateSnap.game.currentTurn === appStateSnap.lobby?.playerColor;
    const turn = appStateSnap.game.turnCount;

    useEffect(() => {
        if (appStateSnap?.game?.map) {
            setGameMap(appStateSnap.game.map);
            setSelectedHex(null);
            setPreviousSelectedHex(null);
        }
        return () => { }
    }, [appStateSnap.game.map, setSelectedHex, setPreviousSelectedHex])

    /**
     * Handle hexagon selection
     * @param hex 
     * @returns 
     */
    const handleSelectHex = (hex: ChessHexagon | null) => {

        // Check if hexagon has a piece and if it belongs to the player
        if (hex && !hex.isWalkable && (
            !hex.piece || !appStateSnap.lobby || hex.piece.player !== appStateSnap.lobby.playerColor
            || (selectedHex && getHexId(hex) === getHexId(selectedHex))
        )) {
            handleUnselectHex();
            setSelectedHex(null);
            return;
        }
        setSelectedHex(hex);
    }

    /**
     * Handle unselecting a hexagon
     */
    const handleUnselectHex = () => {
        setGameMap(
            produce((draft) => {
                draft.forEach((hexa) => {
                    hexa.isSelected = false;
                    hexa.isWalkable = false;
                });
            }))
    }

    // Handle movement and selection
    const handleSelectionChange = useCallback((newHex: ChessHexagon, prevHex: ChessHexagon | null, myTurn: boolean, turn: number) => {
        setGameMap(
            produce((draft) => {

                // Set selected hexagon
                const hex = draft.get(getHexId(newHex));
                if (hex) {

                    // If hexagon was already selected, deselect it
                    if (hex.isSelected) {
                        // Reset all hexagons
                        draft.forEach((hexa) => {
                            hexa.isSelected = false;
                            hexa.isWalkable = false;
                        });
                        return;
                    }

                    if (hex.isWalkable && prevHex && myTurn) {
                        connection.send(
                            { tag: "MovePiece", idFrom: getHexId(prevHex), idTo: getHexId(hex) }
                        )
                        return;
                    }

                    // Reset all hexagons
                    draft.forEach((hexa) => {
                        hexa.isSelected = false;
                        hexa.isWalkable = false;
                    });

                    if (hex.piece === null || hex.piece.player !== appStateSnap.lobby?.playerColor) return;
                    hex.isSelected = true;

                    // Get possible movements
                    const possibleMoves = getPossibleMovements(hex, draft, turn);

                    // Set possible movements
                    for (const move of possibleMoves) {
                        const hex = draft.get(coordinatesToId(move));
                        if (hex) hex.isWalkable = true;
                    }
                }
            })
        );
    }, []);

    // Handle selection change
    useEffect(() => {
        if (!selectedHex) return;
        handleSelectionChange(selectedHex, previousSelectedHex, isMyTurn, turn);
        return () => { }
    }, [selectedHex, previousSelectedHex, turn, isMyTurn, handleSelectionChange]);

    return (
        <div className='flex flex-col md:flex-row select-none'>

            <div className='relative flex-grow shadow-2xl'>
                <HexaBoard
                    map={gameMap}
                    selectedHex={selectedHex}
                    setSelectedHex={handleSelectHex}
                    setPreviousSelectedHex={setPreviousSelectedHex}
                    rotateBoard={appStateSnap.lobby?.playerColor === 'black'}
                    displayCoords={appStateSnap.displayCoordinates}
                    isMyTurn={isMyTurn}
                />

                <div className='absolute flex flex-col left-6 top-6 text-lg'>
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

                <div className={`absolute flex flex-col right-6 ${appStateSnap.lobby?.playerColor === 'white' ? 'top-6' : 'bottom-6'} bg-dark-500 p-2 rounded shadow-lg`}>
                    <div className='text-white'>Score: {appStateSnap.game.scoreBlack}</div>
                    <div className='flex'>
                        {
                            appStateSnap.game.blackCaptures.map((piece, i) => getPieceGraphic(i, 'black', piece))
                        }
                    </div>
                </div>

                <div className={`absolute flex flex-col right-6 ${appStateSnap.lobby?.playerColor === 'black' ? 'top-6' : 'bottom-6'} bg-dark-500 p-2 rounded shadow-lg`}>
                    <div className='text-white'>Score: {appStateSnap.game.scoreWhite}</div>
                    <div className='flex'>
                        {
                            appStateSnap.game.whiteCaptures.map((piece, i) => getPieceGraphic(i, 'white', piece))
                        }
                    </div>
                </div>

            </div>

            <GameSideboard />
        </div>
    )
}

export default Game