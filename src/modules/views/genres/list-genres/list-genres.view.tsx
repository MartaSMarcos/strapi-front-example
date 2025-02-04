import React from 'react'
import styles from './list-genres.module.css'
import { ListGenresWidget } from '@/widgets/genres/list-genres'

type ListGenresViewProps = {
    // // query parameters
    // searchParams: { [key: string]: string | string[] | undefined }
    // // url parameters
    // params: { [key: string]: string | undefined }
}

export function ListGenresView(props: ListGenresViewProps) {
    return (
        <div data-testid="list-genres-view" className={styles.container}>
            <ListGenresWidget />
        </div>
    )
}
