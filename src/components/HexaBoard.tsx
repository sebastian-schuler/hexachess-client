import { HexGrid, Hexagon, Layout, Text } from 'react-hexgrid';
import { ChessHexagon } from '../types/SharedTypes';

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

        if (hex.isSelected) return 'fill-orange-600';
        if (hex.isWalkable){
            if(isMyTurn){
                return 'fill-green-600'
            }else{
                return 'fill-blue-700'
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

    // Get text color
    const getTextColor = (hex: ChessHexagon) => {

        if(hex.isSelected) return 'black';
        if(hex.isWalkable) return 'white';

        switch (hex.color) {
            case 'white':
                return 'black';
            case 'gray':
            case 'black':
            case 'red':
                return 'white';
            default:
                return 'red';
        }
    };

    // Get piece image
    const getImage = (hex: ChessHexagon) => {

        const pieceType = hex.piece?.type;
        const filter = hex.piece?.player === 'white' ? 'invert(100%)' : 'invert(7%)';

        if (pieceType === 'pawn') {
            return <circle cx="0" cy="0" r="5" filter={filter} fill="url(#pat-pawn)"></circle>
        }

        if (pieceType === 'rook') {
            return <circle cx="0" cy="0" r="5" filter={filter} fill="url(#pat-rook)"></circle>
        }

        if (pieceType === 'knight') {
            return <circle cx="0" cy="0" r="5" filter={filter} fill="url(#pat-knight)"></circle>
        }

        if (pieceType === 'bishop') {
            return <circle cx="0" cy="0" r="5" filter={filter} fill="url(#pat-bishop)"></circle>
        }

        if (pieceType === 'queen') {
            return <circle cx="0" cy="0" r="5" filter={filter} fill="url(#pat-queen)"></circle>
        }

        if (pieceType === 'king') {
            return <circle cx="0" cy="0" r="5" filter={filter} fill="url(#pat-king)"></circle>
        }

        return null;
    }

    const arr = Array.from(map.values());

    return (
        <div className={`bg-gray-900`}>
            <HexGrid width={'100%'} height={'100vh'} transform={rotateBoard ? 'scale(1, -1)' : undefined}>
                <Layout size={{ x: 4.8, y: 4.8 }} flat={true} spacing={1.04} origin={{ x: 0, y: 0 }}>
                    {
                        arr.map((hex, index) => {

                            const fillColor = getFillColor(hex);
                            const textColor = getTextColor(hex);
                            const image = hex.piece?.type ? getImage(hex) : null;

                            return (
                                <Hexagon key={index} q={hex.coords.q} r={hex.coords.r} s={hex.coords.s}
                                    onClick={() => {
                                        setPreviousSelectedHex(selectedHex);
                                        setSelectedHex(hex);
                                    }}
                                    className={`${fillColor} cursor-pointer`}
                                >
                                    {
                                        image ?
                                            <g transform={rotateBoard ? 'scale(1, -1)' : undefined}>{image}</g> :
                                            <Text className={`${hex.isSelected ? "font-extrabold" : "font-normal"}`} fontSize={3} fill={'white'}>{hex.piece?.type}</Text>
                                    }
                                    {
                                        displayCoords && <Text y={3.9} fontSize={1} fill={textColor} className='select-none' transform={rotateBoard ? 'scale(1, -1)' : undefined}>{hex.coords.q},{hex.coords.r},{hex.coords.s}</Text>
                                    }
                                </Hexagon>
                            )
                        })
                    }
                </Layout>
                <defs>
                    <pattern id="pat-pawn" x="0" y="0" width="9" height="9" patternUnits="objectBoundingBox">
                        <image x="0.5" y="1.3" width="9" height="9" xlinkHref="pawn.svg"></image>
                    </pattern>
                    <pattern id="pat-rook" x="0" y="0" width="9" height="9" patternUnits="objectBoundingBox">
                        <image x="0.5" y="1.4" width="9" height="9" xlinkHref="rook.svg"></image>
                    </pattern>
                    <pattern id="pat-bishop" x="0" y="0" width="9" height="9" patternUnits="objectBoundingBox">
                        <image x="0.5" y="1.3" width="9" height="9" xlinkHref="bishop.svg"></image>
                    </pattern>
                    <pattern id="pat-queen" x="0" y="0" width="9" height="9" patternUnits="objectBoundingBox">
                        <image x="0.5" y="1.3" width="9" height="9" xlinkHref="queen.svg"></image>
                    </pattern>
                    <pattern id="pat-king" x="0" y="0" width="9" height="9" patternUnits="objectBoundingBox">
                        <image x="0.5" y="1.3" width="9" height="9" xlinkHref="king.svg"></image>
                    </pattern>
                    <pattern id="pat-knight" x="0" y="0" width="9" height="9" patternUnits="objectBoundingBox">
                        <image x="0.1" y="1.3" width="9" height="9" xlinkHref="knight.svg"></image>
                    </pattern>
                </defs>

                {/* <Pattern id="pat-1" link={pawnImg} /> */}
                {/* <Pattern id="pat-2" link="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg" /> */}
            </HexGrid>
        </div>
    )
}

export default HexaBoard