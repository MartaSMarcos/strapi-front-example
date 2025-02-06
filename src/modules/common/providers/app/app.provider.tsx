import { PropsWithChildren } from 'react'
import { LocaleContextProvider } from '../locale-context/locale-context.provider'
import { NavbarWidget } from '@/widgets/navbar/navbar'
import { QueryProvider } from '../query'

export const AppProvider = ({ children }: PropsWithChildren) => {
    return (
        <>
            <QueryProvider>
                <LocaleContextProvider>
                    <NavbarWidget />
                    {children}
                </LocaleContextProvider>
            </QueryProvider>
        </>
    )
}
