export default function Button({
    onClick,
    disabled = false,
    children,
    border = 'none',
    padding = '0.5em 1em',
    fontSize = '1rem',
    backgroundColor = '#48cae4',
    color = '#fafafa',
    borderRadius = '10px' }) {
    return (
        <button onClick={onClick} disabled={disabled} style={{
            border: border,
            padding: padding,
            fontSize: fontSize,
            backgroundColor: disabled ? 'var(--mid-dark-color)' : backgroundColor,
            color: disabled ? 'rgba(255,255,255,0.5)' : color,
            borderRadius: borderRadius
        }}>
            {children}
        </button>
    )
}