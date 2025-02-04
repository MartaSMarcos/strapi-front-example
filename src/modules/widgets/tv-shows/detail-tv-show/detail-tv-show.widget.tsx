'use client'
import React, { useEffect, useState } from 'react'
import styles from './detail-tv-show.module.css'
import { query } from '@/common/query'
import { useLocale } from '@/common/providers/locale-context/locale-context.provider'
import { set } from 'react-hook-form'
import { getActor } from '@/widgets/actors/detail-actor'
import Link from 'next/link'
const NEXT_PUBLIC_STRAPI_HOST = process.env.NEXT_PUBLIC_STRAPI_HOST

export type DetailTvShowWidgetProps = {
    slug: string
}

export function getDocumentIdFromSlug(locale: string, slug: string) {
    return query(
        `tv-shows?locale=${locale}&filters[slug][$eq]=${slug}&fields=documentId`
    ).then((res) => {
        if (!res.data || res.data.length === 0) {
            throw new Error(`No se encontró la serie con el slug: ${slug}`)
        }

        return res.data[0].documentId
    })
}

export function getTVShow(locale: string, documentId: string) {
    return query(`tv-shows/${documentId}?locale=${locale}&populate=*`).then(
        (res) => {
            if (!res.data) return null

            const {
                name,
                releaseYear,
                endYear,
                slug,
                description,
                cover,
                actors,
            } = res.data
            const image = cover ? `${NEXT_PUBLIC_STRAPI_HOST}${cover.url}` : ''

            return {
                name,
                releaseYear,
                endYear,
                slug,
                description,
                image,
                actors,
            }
        }
    )
}

export function DetailTvShowWidget(props: DetailTvShowWidgetProps) {
    const { locale } = useLocale()
    const [show, setShow] = useState<any>(null)
    const [actors, setActors] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchTVShowDetails() {
            try {
                setLoading(true)

                const documentId = await getDocumentIdFromSlug(
                    locale,
                    props.slug
                )
                const showData = await getTVShow(locale, documentId)

                if (!showData) throw new Error('Película no encontrada')

                setShow(showData)

                const actorsData = showData.actors
                    ? await Promise.all(
                          showData.actors.map((show: any) =>
                              getActor(locale, show.documentId)
                          )
                      )
                    : []

                setActors(actorsData)

                setLoading(false)
            } catch (err) {
                setError(err.message)
                setLoading(false)
            }
        }

        fetchTVShowDetails()
    }, [locale, props.slug])

    // useEffect(() => {
    //     getDocumentIdFromSlug(locale, props.slug)
    //         .then((documentId) => {
    //             return getTVShow(locale, documentId)
    //         })
    //         .then((showData) => {
    //             setShow(showData)
    //             setLoading(false)
    //         })
    //         .catch((err) => {
    //             setError(err.message)
    //             setLoading(false)
    //         })
    // }, [locale, props.slug])

    if (loading) return <p>Cargando serie...</p>
    if (error) return <p>{error}</p>
    if (!show) return <p>Serie no encontrada</p>

    return (
        <div data-testid="detail-tv-show-widget" className={styles.container}>
            <h1 className={styles.title}>{show.name}</h1>

            <div className={styles.card}>
                <img className={styles.cover} src={show.image} />
                <div className={styles.info}>
                    <p className={styles.description}>
                        {show.description}
                        <br />
                        <br />
                        {show.releaseYear} {show.endYear && `- ${show.endYear}`}
                    </p>
                </div>
            </div>
            <div>
                <h2 className={styles.subtitle}>
                    {locale === 'es' ? 'Actores' : 'Actors'}
                </h2>
                <div className={styles.actors_list}>
                    {actors &&
                        actors.length > 0 &&
                        actors.map((actor) => (
                            <Link
                                href={`/actors/${actor.slug}`}
                                key={actor.slug}
                                className={styles.link}
                            >
                                <img
                                    src={actor.image}
                                    alt={actor.name}
                                    className={styles.cover}
                                />
                                <div className={styles.info}>
                                    <h5 className={styles.name}>
                                        {actor.name}
                                    </h5>
                                </div>
                            </Link>
                        ))}
                </div>
            </div>
        </div>
    )
}
