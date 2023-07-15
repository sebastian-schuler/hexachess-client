import { produce } from 'immer';
import { useCallback, useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import Checkbox from '../components/Checkbox';
import HexaBoard from '../components/HexaBoard';
import { getPossibleMovements } from '../lib/GameMovement/MovementHandler';
import { appState } from '../lib/State';
import { connection } from '../lib/util/Connection';
import { coordinatesToId, getHexId } from '../lib/util/Helpers';
import { ChessHexagon } from "../types/SharedTypes";

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

    useEffect(() => {
        if (appStateSnap?.game?.map) {
            setGameMap(appStateSnap.game.map);
            setSelectedHex(null);
            setPreviousSelectedHex(null);
        }
        return () => { }
    }, [appStateSnap.game.map, setSelectedHex, setPreviousSelectedHex])


    // Handle selection change
    useEffect(() => {
        if (!selectedHex) return;
        handleSelectionChange(selectedHex, previousSelectedHex, isMyTurn);
        return () => { }
    }, [selectedHex, previousSelectedHex]);

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
    const handleSelectionChange = useCallback((newHex: ChessHexagon, prevHex: ChessHexagon | null, myTurn: boolean) => {
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
                    const possibleMoves = getPossibleMovements(hex, draft);

                    // Set possible movements
                    for (const move of possibleMoves) {
                        const hex = draft.get(coordinatesToId(move.q, move.r, move.s));
                        if (hex) hex.isWalkable = true;
                    }
                }
            })
        );
    }, []);

    return (
        <div className='flex flex-col sm:flex-row select-none'>

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
                <div className='absolute flex flex-col left-8 top-8'>
                    <div className='text-white text-2xl'>
                        Turn: <span className='font-bold'>{Math.floor(appStateSnap.game.turnCount)}</span>
                    </div>
                    <div className='text-white text-2xl'>
                        Selected: <span className='font-bold'>{selectedHex && getPieceName(selectedHex)}</span>
                    </div>
                    <div className={`${isMyTurn ? 'text-green-600' : 'text-indigo-600'} text-3xl font-bold`}>
                        {isMyTurn ? "Your Turn!" : "Opponents Turn!"}
                    </div>
                </div>
            </div>

            <div className='flex flex-col justify-between bg-gray-800 text-white'>

                <div className='flex flex-1 py-8 px-10'>
                    <div className='flex flex-col justify-between'>
                        <div>
                            <h3 className='text-2xl font-bold'>HexaChess</h3>
                            <div className='text-lg font-bold'>
                                {appStateSnap.game.gameEnded && "Game ended! Winner is " + appStateSnap.game.winner}
                            </div>
                        </div>

                        <div className='pb-6'>
                            <Checkbox
                                label='Display Coordinates'
                                onChange={(value) => appState.displayCoordinates = value}
                                checked={appStateSnap.displayCoordinates}
                            />
                            <div className='w-64'></div>
                        </div>

                    </div>
                </div>

                <div className='p-8 self-center'>
                    <a href="https://sebastian-schuler.de/" target="_blank" className='text-center text-gray-400 text-sm hover:text-white transition'>Made by Sebastian Schuler</a>
                </div>

            </div>
        </div>
    )
}

export default Game