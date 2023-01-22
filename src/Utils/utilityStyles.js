export const linkResetStyles = {
    color: "var(--light-color)",
    textDecoration: 'none'
}

export const selectStyles = {

    control: (baseStyles) => ({
        ...baseStyles,
        backgroundColor: 'var(--mid-dark-color)',
        borderColor: 'rgba(255,255,255,0.3)',
        minWidth: '300px'
    }),
    menu: (baseStyles) => ({
        ...baseStyles,
        backgroundColor: 'var(--mid-dark-color)',
    }),
    singleValue: (baseStyles) => ({
        ...baseStyles,
        color: 'var(--light-color)',
    }),
    option: (baseStyles, state) => ({
        ...baseStyles,
        backgroundColor: 'var(--mid-dark-color)',
        ":hover": { background: "var(--dark-color)" }
    }),
    input: (baseStyles) => ({
        ...baseStyles,
        color: 'var(--light-color)',
        caretColor: 'var(--light-color)'
    }),
    multiValue: (baseStyles) => ({
        ...baseStyles,
        backgroundColor: 'var(--dark-color)',
        color: 'var(--light-color)',
    }),
    multiValueLabel: (baseStyles) => ({
        ...baseStyles,
        color: 'var(--light-color)'
    }),
    multiValueRemove: (baseStyles) => (
        {
            ...baseStyles,
            color: 'var(--light-color)',
            borderRadius: '5px',
            ":hover": { background: "transparent" }
        }),

}