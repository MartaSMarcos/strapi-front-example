import React, { ReactNode } from 'react'
import styles from './sidebar.module.css'
import { useSidebarContext } from '@/common/providers/sidebar-context/sidebar-context.provider'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { sectionsSidebar, sectionsBottomSidebar } from './sidebar-sections'
import { FoldHorizontal } from 'lucide-react'
import { Button } from '@/common/components/button'
import { signOut } from 'next-auth/react'
import * as HoverCard from '@/common/components/hover-card'

export type SidebarWidgetProps = {}

export type SidebarWidgetParams = {
    section: {
        path: string
        label: string
        icon: ReactNode
        haveAlerts?: boolean
    }[]
}

export function SidebarWidget(props: SidebarWidgetProps) {
    const { opened, setOpened } = useSidebarContext()
    const pathname = usePathname()
    const handleSidebarSizeButton = () => setOpened(!opened)

    const handleSignOut = () => {
        void signOut({
            redirect: true,
        })
    }

    return (
        <div
            data-testid="sidebar-widget"
            className={`${styles.container} ${
                opened ? styles.sidebarOpened : styles.sidebarClosed
            }`}
        >
            <div className={styles.topSide}>
                <div className={styles.header}>
                    <Image
                        src="/assets/axpe-black.png"
                        alt="Axpe Logo"
                        width="0"
                        height="0"
                        sizes="100vw"
                        style={
                            opened
                                ? { width: '50%', height: 'auto' }
                                : { width: '100%', height: 'auto' }
                        }
                        priority={true}
                    />
                    <Button
                        className="text-black p-0"
                        variant={'link'}
                        onClick={handleSidebarSizeButton}
                    >
                        <FoldHorizontal />
                    </Button>
                </div>

                <div className={styles.linksContainer}>
                    {sectionsSidebar.section.map(
                        (sectionItem, sectionIndex) => {
                            return (
                                <Link
                                    href={sectionItem.path}
                                    key={sectionIndex}
                                    className={
                                        pathname === sectionItem.path
                                            ? styles.itemLinkResaltado
                                            : styles.itemLink
                                    }
                                >
                                    {opened ? (
                                        <>
                                            <div className={styles.iconLink}>
                                                {sectionItem.icon}
                                            </div>
                                            <div className={styles.labelLink}>
                                                {sectionItem.label}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <HoverCard.Root>
                                                <HoverCard.Trigger asChild>
                                                    <div
                                                        className={
                                                            styles.iconLink
                                                        }
                                                    >
                                                        {sectionItem.icon}
                                                    </div>
                                                </HoverCard.Trigger>
                                                <HoverCard.Content>
                                                    <div
                                                        className={
                                                            styles.labelLink
                                                        }
                                                    >
                                                        {sectionItem.label}
                                                    </div>
                                                </HoverCard.Content>
                                            </HoverCard.Root>
                                        </>
                                    )}
                                    {sectionItem.haveAlerts && (
                                        <div
                                            className={styles.alertCircle}
                                        ></div>
                                    )}
                                </Link>
                            )
                        }
                    )}
                </div>
            </div>
            <div className={styles.linksBottomContainer}>
                {sectionsBottomSidebar.section.map(
                    (sectionBottomItem, sectionBottomIndex) => {
                        return (
                            <Link
                                href={sectionBottomItem.path}
                                key={sectionBottomIndex}
                                className={
                                    pathname === sectionBottomItem.path
                                        ? styles.itemLinkBottomResaltado
                                        : styles.itemLinkBottom
                                }
                                onClick={
                                    sectionBottomItem.label === 'Cerrar Sesión'
                                        ? handleSignOut
                                        : undefined
                                }
                            >
                                {opened ? (
                                    <>
                                        <div className={styles.iconLink}>
                                            {sectionBottomItem.icon}
                                        </div>
                                        <div className={styles.labelLink}>
                                            {sectionBottomItem.label}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <HoverCard.Root>
                                            <HoverCard.Trigger asChild>
                                                <div
                                                    className={styles.iconLink}
                                                >
                                                    {sectionBottomItem.icon}
                                                </div>
                                            </HoverCard.Trigger>
                                            <HoverCard.Content>
                                                <div
                                                    className={styles.labelLink}
                                                >
                                                    {sectionBottomItem.label}
                                                </div>
                                            </HoverCard.Content>
                                        </HoverCard.Root>
                                    </>
                                )}
                                {sectionBottomItem.haveAlerts && (
                                    <div className={styles.alertCircle}></div>
                                )}
                            </Link>
                        )
                    }
                )}
            </div>
        </div>
    )
}
