import React, { useState } from "react"

const ThemeContext = React.createContext()

function ThemeContextProvider({children}){

    const currentTheme = localStorage.getItem('currentTheme')

    const [theme, setTheme] = useState(currentTheme ? currentTheme : 'dark')

    function changeTheme(){
        setTheme(prevTheme => {
            if(prevTheme === 'light') return 'dark'
            return 'light'
        })
    }

    return (
        <ThemeContext.Provider value={{theme, changeTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export {ThemeContext, ThemeContextProvider}