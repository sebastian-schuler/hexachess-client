import { useEffect } from 'react';

const Loading = () => {

    useEffect(() => {

        // Wait a minute before reloading the page
        const timeout = setTimeout(() => {
            console.log("reload");
            window.location.reload();
        }, 60000);

        return () => {
            clearTimeout(timeout);
        }
    }, [])

    return (
        <div className="flex flex-col gap-4 justify-center items-center px-10 py-8">
            <div role="status">
                <svg width="90" height="103.93" version="1.1" viewBox="-15 -43 151 174.36" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <polygon transform="translate(-144.74,-126.14)" points="145.24 206.5 145.24 137.5 205 103 264.76 137.5 264.76 206.5 205 241" fill="none" className="stroke-primary-900" strokeLinejoin="round" strokeWidth="20" />
                    <path d="m60.256-23.141 59.756 34.5v69l-59.756 34.5-59.756-34.5v-69z" fill="none" stroke="#f00" className="loading-animation" strokeLinecap="round" strokeLinejoin="round" strokeWidth="20" />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
            <div className="text-white">Starting up server, this might take a few minutes...</div>
        </div>
    )
}

export default Loading