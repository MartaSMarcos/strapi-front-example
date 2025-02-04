import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from 'react'

export type ThemeContextProps = {
    theme: string
    changeTheme: (newTheme: string) => void
}

const ThemeContext = createContext<ThemeContextProps>({
    theme: '',
    changeTheme: () => {},
})

export const ThemeContextProvider = (props: PropsWithChildren) => {
    const [theme, setTheme] = useState<string>('light')

    const changeTheme = (newTheme: string) => {
        const html = document.querySelector('html')
        html?.classList.replace(theme, newTheme)
        setTheme(newTheme)
    }

    useEffect(() => {
        const html = document.querySelector('html')
        html?.classList.add(theme)
    }, [])
    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export const useThemeContext = () => useContext(ThemeContext)
