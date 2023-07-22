import { PlayerColor } from "../types/SharedTypes"

type HexaBoardPieceProps = {
    pieceType: string | undefined
    color: PlayerColor
    rotate?: boolean
}

const HexaBoardPiece = ({ pieceType, color, rotate }: HexaBoardPieceProps) => {

    const fillColor = color === 'white' ? '#F5F5F5' : '#0A0A0A';
    const strokeColor = color === 'white' ? '#000' : '#fff';
    const strokeWidth = color === 'white' ? 1 : 0.6;
    let svg: JSX.Element | null = null;

    if (pieceType === 'pawn') {
        svg = (
            <svg x={-2.3} y={-49.6} width="4.5" height="100%" version="1.1" viewBox="10 10 52.48 69.645" xmlns="http://www.w3.org/2000/svg">
                <path
                    strokeWidth={strokeWidth}
                    stroke={strokeColor}
                    fill={fillColor}
                    d="m48.906 23.579a13.042 13.042 0 0 1-4.193 9.595l6.644 4.69v8.595h-6.505c0.314 3.984 2.87 7.971 6.178 11.449a49.238 49.238 0 0 0 10.538 8.27l0.412 0.236v12.731h-51.48v-12.731l0.412-0.236a49.238 49.238 0 0 0 10.538-8.27c3.308-3.478 5.864-7.465 6.178-11.449h-6.5v-8.595l6.188-4.368a13.074 13.074 0 1 1 21.6-9.917z"
                />
            </svg>
        )
    }

    if (pieceType === 'bishop') {
        svg = (
            <svg x={-2.25} y={-49.8} width="4.4" height="100%" version="1.1" viewBox="10 10 51.266 73.604" xmlns="http://www.w3.org/2000/svg">
                <path
                    strokeWidth={strokeWidth}
                    stroke={strokeColor}
                    fill={fillColor}
                    d="m38.222 50.295h-5.28c0-9.7 2.941-19.376 9.447-26.461a8.378 8.378 0 1 0-12.74 0.908c-5.233 3.731-14.96 13.731-14.96 26.251 0 12.635 9.906 17.75 15.1 18.8l-19.289 3.411v9.9h50.266v-9.9l-19.75-3.464c5.256-1.156 14.863-6.307 14.863-18.749 0-8.147-3.8-15.41-8.416-20.69-5.074 3.962-9.241 13.203-9.241 19.994z"
                />
            </svg>
        )
    }

    if (pieceType === 'rook') {
        svg = (
            <svg x={-2} y={-49.3} width="4" height="100%" version="1.1" viewBox="0 0 52.48 70.96" xmlns="http://www.w3.org/2000/svg">
                <path
                    strokeWidth={strokeWidth}
                    stroke={strokeColor}
                    fill={fillColor}
                    d="m38.78 0.5v7.92h-5.28v-7.92h-14.52v7.92h-5.28v-7.92h-13.2v11.88l10.56 7.92-2.64 23.76h35.64l-2.64-23.76 10.56-7.92v-11.88zm-30.36 48.84-7.92 10.56v10.56h51.48v-10.56l-7.92-10.56z"
                />
            </svg>
        )
    }

    if (pieceType === 'knight') {
        svg = (
            <svg x={-3} y={-49.7} width="5.3" height="100%" version="1.1" viewBox="0 0 68.513 77.314" xmlns="http://www.w3.org/2000/svg">
                <path
                    strokeWidth={strokeWidth}
                    stroke={strokeColor}
                    fill={fillColor}
                    d="m41.836 14.793-11.925-13.909c-1.727 3.277-3.4 9.061-0.994 13.237a11.544 11.544 0 0 0-3.147 0.648c-5.508 2.21-11.551 7.921-14.522 19.8-0.86 3.44-2.408 5.087-4.247 7.045a27.548 27.548 0 0 0-5.653 8.135c-3.961 8.58 6.727 17.161 14.521 9.368a36.383 36.383 0 0 1 11.427-7.709c4.628-2.183 7.983-3.768 9.878-11.559 0.9 3.633 0.542 12.208-8.115 17.44s-10.46 16.26-10.279 19.525h49.233c0-31.045-4.11-57.865-26.177-62.021z"
                />
            </svg>
        )
    }

    if (pieceType === 'queen') {
        svg = (
            <svg x={-3} y={-49.4} width="6" height="100%" version="1.1" viewBox="0 0 82.851 76.243" xmlns="http://www.w3.org/2000/svg">
                <path
                    strokeWidth={strokeWidth}
                    stroke={strokeColor}
                    fill={fillColor}
                    d="m31.896 13.265a6.6 6.6 0 1 0-3.186 0.388l-2.943 23.81-14.189-12.323a6.575 6.575 0 1 0-2.643 1.5l7.392 25.343 7.644 12.508-7.644 1.352v9.9h50.262v-9.9l-7.742-1.358 7.64-12.5 7.392-25.342a6.6 6.6 0 1 0-2.643-1.5l-14.189 12.32-2.94-23.81a6.6 6.6 0 1 0-3.186-0.388l-9.514 21.558z"
                />
            </svg>
        )
    }

    if (pieceType === 'king') {
        svg = (
            <svg x={-2.7} y={-49.5} width="5.5" height="100%" version="1.1" viewBox="0 0 74.274 77.558" xmlns="http://www.w3.org/2000/svg">
                <path
                    strokeWidth={strokeWidth}
                    stroke={strokeColor}
                    fillRule="evenodd"
                    fill={fillColor}
                    d="m33.171 0.5h7.92l0.206 6.6h7.714v7.92h-7.466l0.362 8.966q0.217-0.255 0.448-0.5c7.211-7.664 17.9-11.742 25.8-5.165 7.919 6.6 7.919 21.779-2.985 30.558-6.177 4.973-11.71 9.767-11.437 16.779l11.1 1.5v9.9h-55.394v-9.9l11.1-1.5c0.273-7.012-5.26-11.806-11.437-16.779-10.9-8.779-10.9-23.958-2.985-30.558 7.893-6.577 18.584-2.5 25.8 5.165q0.231 0.246 0.448 0.5l0.362-8.966h-7.476v-7.92h7.714zm-7.46 30.324c4.84 7.927 5.48 17.2 5.48 21.225-2.426 0-11.571-4.019-16.413-10.624-3.485-4.755-4.394-11.81-1.406-14.549s9.314-1.007 12.339 3.948zm22.84 0c-4.84 7.927-5.48 17.2-5.48 21.225 2.426 0 11.571-4.019 16.413-10.624 3.485-4.755 4.394-11.81 1.406-14.549s-9.314-1.007-12.339 3.948z"
                />
            </svg>
        )
    }

    if (svg === null) return null;

    return (
        <g transform={rotate ? 'scale(1, -1)' : undefined}>
            {svg}
        </g>
    )

}

export default HexaBoardPiece