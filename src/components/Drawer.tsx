import React from 'react'

type DrawerProps = {
    children: React.ReactNode
    isOpen: boolean
    setIsOpen: (open: boolean) => void
}

const Drawer = ({ children, isOpen, setIsOpen }: DrawerProps) => {

    return (
        <>

            <div
                className={`fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity ease-in-out duration-500 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none opacity-0'
                    }`}
                onClick={() => {
                    setIsOpen(false);
                }}
            ></div>

            <div
                className={`fixed flex z-10 right-0 h-full max-w-lg transition-transform ease-in-out duration-500 transform 
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'}
                `}
            >
                {children}
            </div>
        </>
    )
}

export default Drawer