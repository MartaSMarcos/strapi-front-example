'use client'
import React from 'react'
import styles from './detail-movie.module.css'
import DetailMovieWidget from '@/widgets/movies/detail-movie/detail-movie.widget'
import { useParams } from 'next/navigation'

type DetailMovieViewProps = {
    // query parameters
    // searchParams: { [key: string]: string | string[] | undefined }
    // url parameters
    // params: { movieSlug: string }
}

export function DetailMovieView(props: DetailMovieViewProps) {
    const params = useParams()
    const slug = params?.movieSlug

    if (!slug) {
        return <p>Error: No se encontró el slug en la URL.</p>
    }

    return (
        <div data-testid="detail-movie-view" className={styles.container}>
            <DetailMovieWidget slug={slug} />
        </div>
    )
}
