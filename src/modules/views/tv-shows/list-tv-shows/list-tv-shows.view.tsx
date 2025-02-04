import React from 'react'
import styles from './list-tv-shows.module.css'
import { ListTvShowsWidget } from '@/widgets/tv-shows/list-tv-shows'

type ListTvShowsViewProps = {
    // // query parameters
    // searchParams: { [key: string]: string | string[] | undefined }
    // // url parameters
    // params: { [key: string]: string | undefined }
}

export function ListTvShowsView(props: ListTvShowsViewProps) {
    return (
        <div data-testid="list-tv-shows-view" className={styles.container}>
            <ListTvShowsWidget />
        </div>
    )
}
