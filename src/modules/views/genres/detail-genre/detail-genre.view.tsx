'use client'
import React from 'react'
import styles from './detail-genre.module.css'
import { useParams } from 'next/navigation'
import DetailGenreWidget from '@/widgets/genres/detail-genre/detail-genre.widget'

type DetailGenreViewProps = {
    // // query parameters
    // searchParams: { [key: string]: string | string[] | undefined }
    // // url parameters
    // params: { [key: string]: string | undefined }
}

export function DetailGenreView(props: DetailGenreViewProps) {
    const params = useParams()
    const slug = params?.genreSlug

    if (!slug) {
        return <p>Error: No se encontró el slug en la URL.</p>
    }

    return (
        <div data-testid="detail-genre-view" className={styles.container}>
            <DetailGenreWidget slug={slug} />
        </div>
    )
}
