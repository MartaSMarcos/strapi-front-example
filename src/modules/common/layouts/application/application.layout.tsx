import React, { PropsWithChildren } from 'react'
import styles from './application.module.css'
import { SidebarWidget } from '@/common/widgets/sidebar'

export type ApplicationLayoutProps = PropsWithChildren<{}>

export function ApplicationLayout(props: ApplicationLayoutProps) {
    return (
        <div data-testid="application-layout" className={styles.container}>
            <div className={styles.sidebar}>
                <SidebarWidget />
            </div>
            <div className={styles.content}>
                {/* <TopSidebar /> */}
                <div className={styles.children}>{props.children}</div>
            </div>
        </div>
    )
}
