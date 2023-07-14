
type ButtonProps = {
    text: string
    onClick: () => void
    variant?: "filled" | "outlined"
    disabled?: boolean
}

const Button = ({ text, onClick, variant = "filled", disabled }: ButtonProps) => {

    let classes = "";

    if (variant === "filled") {
        classes = "bg-indigo-600 text-white hover:bg-transparent hover:text-indigo-600 active:text-indigo-500";
    } else if (variant === "outlined") {
        classes = "border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white active:bg-indigo-500";
    }

    return (
        <button
            className={`inline-block rounded border border-indigo-600 px-12 py-3 text-sm font-medium 
            focus:outline-none focus:ring cursor-pointer select-none disabled:opacity-50 disabled:pointer-events-none ${classes}`}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    )
}

export default Button;