
type IconButtonProps = {
    alt: string
    onClick: () => void
    icon: JSX.Element
    variant?: 'filled' | 'light'
    size?: 'sm' | 'md' | 'lg'
}

const IconButton = ({ alt, onClick, icon, variant = 'filled', size = 'md' }: IconButtonProps) => {

    let classes = '';

    if (variant === 'filled') {
        classes += 'bg-primary-500 active:text-primary-500';
    } else if (variant === 'light') {
        classes += 'bg-primary-500 bg-opacity-10 active:bg-opacity-20';
    }

    if (size === 'sm') {
        classes += ' p-[4px] text-sm';
    } else if (size === 'md') {
        classes += ' p-[6px] text-md';
    } else if (size === 'lg') {
        classes += ' p-[8px] text-lg';
    }

    return (
        <div className='self-center'>
            <button
                title={alt}
                className={`text-white rounded-full hover:scale-125 transition ${classes}`}
                onClick={onClick}
            >
                {icon}
            </button>
        </div>
    )
}

export default IconButton