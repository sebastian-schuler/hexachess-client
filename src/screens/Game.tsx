import { produce } from 'immer';
import { useCallback, useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import GameOverlay from '../features/GameOverlay';
import GameSideboard from '../features/GameSideboard';
import HexaBoard from '../features/HexaBoard';
import { getPossibleMovements } from '../lib/GameMovement/MovementHandler';
import { appState } from '../lib/State';
import { connection } from '../lib/util/Connection';
import { coordinatesToId, getHexId } from '../lib/util/Helpers';
import { ChessHexagon } from "../types/SharedTypes";
import Drawer from '../components/Drawer';
import { useMediaQuery } from '../lib/hooks/useMediaQuery';

const Game = () => {

    const appStateSnap = useSnapshot(appState);
    if (!appStateSnap.game) return null;

    const [gameMap, setGameMap] = useState<Map<string, ChessHexagon>>(appStateSnap.game.map);
    const [selectedHex, setSelectedHex] = useState<ChessHexagon | null>(null);
    const [previousSelectedHex, setPreviousSelectedHex] = useState<ChessHexagon | null>(null);
    const isMyTurn = appStateSnap.game.currentTurn === appStateSnap.lobby?.playerColor;
    const turn = appStateSnap.game.turnCount;
    const isMobile = useMediaQuery('(max-width: 768px)');

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

    const chat = []

    for (let i = 0; i < 100; i++) {
        chat.push("Test Message" + i);
    }

    const [open, setOpen] = useState(false);

    return (
        <div className='flex flex-col md:flex-row select-none h-screen'>

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

                <GameOverlay
                    isMyTurn={isMyTurn}
                    selectedHex={selectedHex}
                    openDrawer={() => setOpen(true)}
                    isMobile={isMobile}
                />
            </div>
            {
                isMobile ?
                    (
                        <Drawer
                            isOpen={open}
                            setIsOpen={setOpen}
                        >
                            <GameSideboard
                                isMobile={isMobile}
                                closeDrawer={() => setOpen(false)}
                            />
                        </Drawer>
                    )
                    : (
                        <GameSideboard />
                    )
            }
        </div>
    )
}

export default Game

