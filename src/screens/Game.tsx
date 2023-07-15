import { produce } from 'immer';
import { useCallback, useEffect, useState } from 'react';
import { ChessHexagon } from "../types/SharedTypes";
import HexaBoard from '../components/HexaBoard';
import { getPossibleMovements } from '../lib/GameMovement/MovementHandler';
import { coordinatesToId, getHexId } from '../lib/util/Helpers';
import { useSnapshot } from 'valtio';
import { appState } from '../lib/State';
import { connection } from '../lib/util/Connection';

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
        handleSelectionChange(selectedHex, previousSelectedHex);
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
    const handleSelectionChange = useCallback((newHex: ChessHexagon, prevHex: ChessHexagon | null) => {
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

                    if (hex.isWalkable && prevHex) {
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
        <div className='flex'>
            <HexaBoard
                map={gameMap}
                selectedHex={selectedHex}
                setSelectedHex={handleSelectHex}
                setPreviousSelectedHex={setPreviousSelectedHex}
            />

            <div className='flex bg-gray-900 w-full text-white p-8'>

                <div className='flex flex-col justify-between'>

                    <div>
                        <div>Turn Count: <span className='text-lg font-bold'>{Math.floor(appStateSnap.game.turnCount)}</span></div>
                        <div>Active Turn: <span className='text-lg font-bold'>{appStateSnap.game.currentTurn} ({isMyTurn ? "You" : "Opponent"})</span></div>
                        <div>Selected: <span className='text-lg font-bold'>{selectedHex && selectedHex.piece?.type}</span></div>

                        <div className='text-lg font-bold'>
                            {appStateSnap.game.gameEnded && "Game ended! Winner is " + appStateSnap.game.winner}
                        </div>
                    </div>

                    <div>
                        
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Game