import React from 'react'
import styles from './list-card-item.module.css'
import Link from 'next/link'

export type ListCardItemProps = {
    name: string
    link: string
    index: number
}

export function ListCardItem(props: ListCardItemProps) {
    return (
        <div data-testid="list-card-item" className={styles.container}>
            {props.index == undefined ? (
                'no index'
            ) : (
                <span className={styles['list-card-item__index']}>
                    {props.index}
                </span>
            )}
            <Link href="./home">
                <span className={styles['list-card-item__name']}>
                    {props.name}
                </span>
            </Link>
        </div>
    )
}
