import { useMenus } from '@/api/menu'
import styles from './navbar.module.css'
import { useLocale } from '@/common/providers/locale-context/locale-context.provider'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export type NavbarWidgetProps = {}

export function NavbarWidget(props: NavbarWidgetProps) {
    const { locale, setLocale } = useLocale()
    const [showMenu, setShowMenu] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    const {
        data: menu,
        isLoading,
        isError,
    } = useMenus({ locale: locale, size: 10 })

    const toggleLanguage = () => {
        setLocale(locale === 'es' ? 'en' : 'es') // Alternar entre español e inglés
    }

    const handleToggleMenu = () => {
        setShowMenu(!showMenu)
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setShowMenu(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <nav className={styles.container}>
            <Link className={styles.title} href="/">
                Movie App
            </Link>
            <div className={styles.menu}>
                {menu?.data.map((menu) => (
                    <Link
                        href={`/${menu.slug}`}
                        key={menu.slug}
                        className={styles.link}
                    >
                        {menu.name}
                    </Link>
                ))}
            </div>
            <button
                onClick={toggleLanguage}
                className={`${styles.full} ${styles.language_button}`}
            >
                {locale === 'es' ? '🇪🇸 Español' : '🇬🇧 English'}
            </button>
            <div className={styles.responsive} ref={menuRef}>
                <button onClick={handleToggleMenu}>
                    {showMenu ? (
                        <X size={32} className="text-white" />
                    ) : (
                        <Menu size={32} className="text-white" />
                    )}
                </button>
                {showMenu && (
                    <>
                        <button
                            onClick={toggleLanguage}
                            className={`${styles.responsive} ${styles.language_button}`}
                        >
                            {locale === 'es' ? '🇪🇸 Español' : '🇬🇧 English'}
                        </button>
                        <div className={styles.responsive_menu}>
                            {menu?.data.map((item) => (
                                <Link
                                    href={`/${item.slug}`}
                                    key={item.slug}
                                    className={styles.link}
                                    onClick={() => setShowMenu(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </nav>
    )
}
