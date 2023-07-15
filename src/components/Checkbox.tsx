
type CheckboxProps = {
    label: string
    checked: boolean
    onChange: (checked: boolean) => void
}

const Checkbox = ({ label, checked, onChange }: CheckboxProps) => {

    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked={checked} onChange={(e) => onChange(e.currentTarget.checked)} />
            <div className="w-11 h-6 bg-gray-700 rounded-full 
            peer peer-focus:ring-2 peer-focus:ring-indigo-800 peer-checked:after:translate-x-full peer-checked:after:border-white 
            after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border 
            after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-indigo-600"></div>
            <span className="ml-3 text-sm font-medium text-white">{label}</span>
        </label>
    )
}

export default Checkbox