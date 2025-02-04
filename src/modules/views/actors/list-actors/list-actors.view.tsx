import React from 'react'
import styles from './list-actors.module.css'
import { ListActorsWidget } from '@/widgets/actors/list-actors'

type ListActorsViewProps = {
    // // query parameters
    // searchParams: { [key: string]: string | string[] | undefined }
    // // url parameters
    // params: { [key: string]: string | undefined }
}

export function ListActorsView(props: ListActorsViewProps) {
    return (
        <div data-testid="list-actors-view" className={styles.container}>
            <ListActorsWidget />
        </div>
    )
}
