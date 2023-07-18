
type TextfieldProps = {
    id: string
    value: string
    placeholder?: string
    maxLength?: number
    onChange: (value: string) => void
    onEnter?: () => void
}

const Textfield = ({ id, value, placeholder, maxLength, onChange, onEnter }: TextfieldProps) => {

    return (

        <input
            type="text"
            id={id}
            className="w-full rounded-md border-gray-200 py-3 pe-10 shadow-sm sm:text-sm"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            maxLength={maxLength}
            onKeyDown={onEnter ? (e) => {
                if (e.key === "Enter") onEnter();
            } : undefined}
        />

    )
}

export default Textfield