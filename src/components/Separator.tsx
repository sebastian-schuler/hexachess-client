type SeparatorProps = {
    dir: 'horizontal' | 'vertical'
}

const Separator = ({ dir }: SeparatorProps) => {
    return (
        <div className={`border-neutral-400 ${dir === 'vertical' ? 'border-l' : 'border-b'}`}></div>
    )
}

export default Separator