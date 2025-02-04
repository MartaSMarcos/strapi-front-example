'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react'
import { usePathname } from 'next/navigation'

type LocaleContextType = {
    locale: string
    setLocale: (locale: string) => void
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export function LocaleContextProvider({ children }: { children: ReactNode }) {
    const pathname = usePathname()
    // const defaultLocale = pathname.split('/')[1] || 'es' // Detecta el idioma desde la URL
    const [locale, setLocale] = useState('es')

    return (
        <LocaleContext.Provider value={{ locale, setLocale }}>
            {children}
        </LocaleContext.Provider>
    )
}

export function useLocale() {
    const context = useContext(LocaleContext)
    if (!context) {
        throw new Error('useLocale debe usarse dentro de LocaleProvider')
    }
    return context
}
