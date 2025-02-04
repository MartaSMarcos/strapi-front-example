import { PropsWithChildren } from 'react'
import { LocaleContextProvider } from '../locale-context/locale-context.provider'

export const AppProvider = ({ children }: PropsWithChildren) => {
    return (
        <>
            <LocaleContextProvider>{children}</LocaleContextProvider>
        </>
    )
}
