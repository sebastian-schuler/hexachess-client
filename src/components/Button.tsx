
type ButtonProps = {
    text: string
    onClick: () => void
    className?: string
    variant?: "filled" | "outlined"
    disabled?: boolean
}

const Button = ({ text, onClick, className, variant = "filled", disabled }: ButtonProps) => {

    let classes = "";

    if (variant === "filled") {
        classes = "bg-primary-600 text-white hover:bg-transparent hover:text-primary-600 active:text-primary-500";
    } else if (variant === "outlined") {
        classes = "border-primary-600 text--600 hover:bg-primary-600 hover:text-white active:bg-primary-500";
    }

    return (
        <button
            className={`inline-block rounded border border-primary-600 px-6 py-3 text-sm font-medium 
            focus:outline-none focus:ring cursor-pointer select-none disabled:opacity-50 disabled:pointer-events-none ${classes} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    )
}

export default Button;