import { useEffect, useRef } from 'react';
import { useSnapshot } from 'valtio';
import Checkbox from '../components/Checkbox';
import Separator from '../components/Separator';
import { appState } from '../lib/State';
import IconButton from '../components/IconButton';
import { AiOutlineClose } from 'react-icons/ai';

type GameSideboardProps = {
    isMobile?: boolean;
    closeDrawer?: () => void;
}

const GameSideboard = ({ isMobile, closeDrawer }: GameSideboardProps) => {

    const appStateSnap = useSnapshot(appState);
    if (!appStateSnap.game || !appStateSnap.lobby) return null;

    const messageCount = appStateSnap.lobby.messages.length;

    const init = [];
    for (let i = 0; i < 100; i++) {
        init.push("Test Message" + i);
    }

    const scrollableContainerRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (scrollableContainerRef.current) {
            scrollableContainerRef.current.scrollTop = scrollableContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [appStateSnap.lobby.messages]);

    return (
        <div className='flex flex-col bg-gray-800 text-white min-w-fit lg:w-96'>

            <div className='flex justify-between px-8 py-4'>
                <h3 className='text-2xl font-bold'>HexaChess</h3>
                {
                    isMobile && <IconButton variant='light' alt='Close drawer' onClick={() => closeDrawer && closeDrawer()} icon={<AiOutlineClose />} />
                }
            </div>

            <Separator dir='horizontal' />

            <div ref={scrollableContainerRef} className='history-chat-box p-4'>
                {
                    appStateSnap.lobby.messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`px-2 py-2 rounded-lg ${i < messageCount - 1 && 'mb-2'} ${i % 2 === 0 ? 'bg-dark-600' : 'bg-dark-700'}`}
                        >
                            {msg}
                        </div>
                    ))
                }
            </div>

            <div className='text-lg font-bold'>
                {appStateSnap.game.gameEnded && "Game ended! Winner is " + appStateSnap.game.winner}
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

                <Separator dir='horizontal' />

                <div className='p-8 self-center'>
                    <a href="https://sebastian-schuler.de/" target="_blank" className='text-center text-gray-400 text-sm hover:text-white transition'>Made by Sebastian Schuler</a>
                </div>
            </div>

        </div>
    )
}

export default GameSideboard