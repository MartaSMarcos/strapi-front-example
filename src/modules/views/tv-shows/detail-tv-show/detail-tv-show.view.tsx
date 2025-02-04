'use client'
import React from 'react'
import styles from './detail-tv-show.module.css'
import { useParams } from 'next/navigation'
import { DetailTvShowWidget } from '@/widgets/tv-shows/detail-tv-show/detail-tv-show.widget'

type DetailTvShowViewProps = {
    // // query parameters
    // searchParams: { [key: string]: string | string[] | undefined }
    // // url parameters
    // params: { [key: string]: string | undefined }
}

export function DetailTvShowView(props: DetailTvShowViewProps) {
    const params = useParams()
    const slug = params?.tvShowSlug

    // if (!slug) {
    //     return <p>Error: No se encontró el slug en la URL.</p>
    // }

    return (
        <div data-testid="detail-tv-show-view" className={styles.container}>
            <DetailTvShowWidget slug={slug} />
        </div>
    )
}
