export default function Button({
    children,
    border = 'none',
    padding = '0.5em 1em',
    fontSize = '1rem',
    backgroundColor = '#48cae4',
    color = '#fafafa',
    borderRadius = '10px' }) {
    return (
        <button style={{
            border: border,
            padding: padding,
            fontSize: fontSize,
            backgroundColor: backgroundColor,
            color: color,
            borderRadius: borderRadius
        }}>
            {children}
        </button>
    )
}