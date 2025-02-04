'use client'
import React from 'react'
import styles from './detail-actor.module.css'
import { useParams } from 'next/navigation'
import DetailActorWidget from '@/widgets/actors/detail-actor/detail-actor.widget'

type DetailActorViewProps = {
    // // query parameters
    // searchParams: { [key: string]: string | string[] | undefined }
    // // url parameters
    // params: { [key: string]: string | undefined }
}

export function DetailActorView(props: DetailActorViewProps) {
    const params = useParams()
    const slug = params?.actorSlug

    if (!slug) {
        return <p>Error: No se encontró el slug en la URL.</p>
    }

    return (
        <div data-testid="detail-actor-view" className={styles.container}>
            <DetailActorWidget slug={slug} />
        </div>
    )
}
