import React from 'react'
import { createPortal } from 'react-dom';
import Button from './Button';

type DialogProps = {
    isOpen: boolean
    onClose: () => void
    hideCloseButton?: boolean
    closeButtonText?: string
    children: React.ReactNode
}

const Dialog = ({ isOpen, onClose, hideCloseButton, closeButtonText, children }: DialogProps) => {

    return (
        isOpen
            ? createPortal(
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-75" onClick={onClose}></div>
                    <div className="flex flex-col bg-gray-900 p-8 rounded-lg z-10">

                        <div className='text-white'>
                            {children}
                        </div>

                        {
                            !hideCloseButton && (
                                <Button text={closeButtonText ? closeButtonText : 'Close'} onClick={onClose} className='mt-4' />
                            )
                        }

                    </div>
                </div>,
                document.body
            )
            : null
    )
}

export default Dialog