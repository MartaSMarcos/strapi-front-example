import React from 'react'
import styles from './navbar.module.css'
import { useLocale } from '@/common/providers/locale-context/locale-context.provider'
import Link from 'next/link'

export type NavbarWidgetProps = {}

export function NavbarWidget(props: NavbarWidgetProps) {
    const { locale, setLocale } = useLocale()

    const toggleLanguage = () => {
        setLocale(locale === 'es' ? 'en' : 'es') // Alternar entre español e inglés
    }
    return (
        <nav className={styles.container}>
            <Link className={styles.title} href="/">
                Movie App
            </Link>
            <button onClick={toggleLanguage} className={styles.language_button}>
                {locale === 'es' ? '🇪🇸 Español' : '🇬🇧 English'}
            </button>
        </nav>
    )
}
