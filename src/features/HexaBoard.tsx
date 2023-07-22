import { HexGrid, Hexagon, Layout, Text } from 'react-hexgrid';
import { ChessHexagon } from '../types/SharedTypes';
import { getNthLetter } from '../lib/util/Helpers';
import { useMediaQuery } from '../lib/hooks/useMediaQuery';
import HexaBoardPiece from './HexaBoardPiece';

const IS_DEV_MODE = false;

type Props = {
    map: Map<string, ChessHexagon>,
    selectedHex: ChessHexagon | null,
    setSelectedHex: (hexa: ChessHexagon | null) => void,
    setPreviousSelectedHex: (hexa: ChessHexagon | null) => void,
    rotateBoard: boolean
    displayCoords: boolean
    isMyTurn: boolean
}

const HexaBoard = ({ map, selectedHex, setSelectedHex, setPreviousSelectedHex, rotateBoard, displayCoords, isMyTurn }: Props) => {

    // Get fill color
    const getFillColor = (hex: ChessHexagon) => {
        if (hex.isSelected) return 'fill-orange-500';
        if (hex.isWalkable) {
            if (isMyTurn) {
                return 'fill-primary-500'
            } else {
                return 'fill-blue-500'
            }
        };
        switch (hex.color) {
            case 'white':
                return 'fill-gray-500';
            case 'gray':
                return 'fill-gray-600';
            case 'black':
                return 'fill-gray-700';
            case 'red':
                return 'fill-red-500';
            default:
                return 'fill-blue-500';
        }
    };

    const arr = Array.from(map.values());
    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <div className={`bg-dark-950 bg-pattern`}>
            <HexGrid width={'100%'} height={'100vh'} transform={rotateBoard ? 'scale(1, -1)' : undefined}>
                <Layout size={{ x: isMobile ? 5.6 : 4.8, y: isMobile ? 5.6 : 4.8 }} flat={true} spacing={1.04} origin={{ x: 0, y: 0 }}>
                    {
                        arr.map((hex, index) => {

                            const fillColor = getFillColor(hex);

                            return (
                                <Hexagon key={index} q={hex.coords.q} r={hex.coords.r} s={hex.coords.s}
                                    onClick={() => {
                                        setPreviousSelectedHex(selectedHex);
                                        setSelectedHex(hex);
                                    }}
                                    className={`${fillColor} cursor-pointer`}
                                >
                                    {
                                        hex.piece &&
                                        <HexaBoardPiece
                                            pieceType={hex.piece.type}
                                            color={hex.piece.player}
                                            rotate={rotateBoard}
                                        />
                                    }
                                    {
                                        displayCoords && <Text y={-3.2} fontSize={1} fill={'white'} className='select-none' transform={rotateBoard ? 'scale(1, -1)' : undefined}>
                                            {
                                                IS_DEV_MODE ?
                                                    (
                                                        `${hex.coords.q} ${hex.coords.r} ${hex.coords.s}`
                                                    ) :
                                                    (
                                                        getNthLetter(hex.coords2D.x) + " " + hex.coords2D.y
                                                    )
                                            }
                                        </Text>
                                    }
                                </Hexagon>
                            )
                        })
                    }
                </Layout>
            </HexGrid>
        </div>
    )
}

export default HexaBoard