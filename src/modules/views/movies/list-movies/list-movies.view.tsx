import React from 'react'
import styles from './list-movies.module.css'
import { ListMoviesWidget } from '@/widgets/movies/list-movies'

type ListMoviesViewProps = {
    // // query parameters
    // searchParams: { [key: string]: string | string[] | undefined }
    // // url parameters
    // params: { [key: string]: string | undefined }
}

export function ListMoviesView(props: ListMoviesViewProps) {
    return (
        <div data-testid="list-movies-view" className={styles.container}>
            <ListMoviesWidget />
        </div>
    )
}
