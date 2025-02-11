import { useMenu } from '@/api/menu'
import styles from './navbar.module.css'
import { useLocale } from '@/common/providers/locale-context/locale-context.provider'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import DescriptionBlock from '@/common/components/description-block/description-block.component'

export type NavbarWidgetProps = {}

export function NavbarWidget(props: NavbarWidgetProps) {
    const { locale, setLocale } = useLocale()
    const [showMenu, setShowMenu] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    const { data: menu } = useMenu({ locale: locale })

    const toggleLanguage = () => {
        setLocale(locale === 'es' ? 'en' : 'es')
    }

    const handleToggleMenu = () => setShowMenu(!showMenu)

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
        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className={styles.container}>
            <Link className={styles.title} href="/">
                Axpe web
            </Link>

            <div className={styles.menu}>
                {/* Renderizar HTML de descriptionBlocks */}
                {/* {menu?.data?.descriptionBlocks?.map((block, index) => (
                    <DescriptionBlock key={index} block={block} />
                ))} */}

                {menu?.data.items.map((item, index) => (
                    <Link
                        href={`/${item.slug}`}
                        key={index}
                        className={styles.link}
                    >
                        {item.name}
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
                            {menu?.data.items.map((item, index) => (
                                <Link
                                    href={`/${item.slug}`}
                                    key={index}
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
        </div>
    )
}
