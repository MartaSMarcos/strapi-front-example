'use client'
import React, { useEffect, useState } from 'react'
import styles from './detail-movie.module.css'
import { query } from '@/common/query'
import { useLocale } from '@/common/providers/locale-context/locale-context.provider'
import { getActor } from '@/widgets/actors/detail-actor'
import Link from 'next/link'
const NEXT_PUBLIC_STRAPI_HOST = process.env.NEXT_PUBLIC_STRAPI_HOST

export type DetailMovieWidgetProps = {
    slug: string
}

function getDocumentIdFromSlug(locale: string, slug: string): Promise<string> {
    return query(
        `movies?locale=${locale}&filters[slug][$eq]=${slug}&fields=documentId`
    ).then((res) => {
        if (!res.data || res.data.length === 0) {
            throw new Error(`No se encontró la película con el slug: ${slug}`)
        }

        return res.data[0].documentId
    })
}

export function getMovie(locale: string, documentId: string) {
    return query(`movies/${documentId}?locale=${locale}&populate=*`).then(
        (res) => {
            if (!res.data) return null

            const { name, year, slug, description, cover, actors } = res.data
            const image = cover ? `${NEXT_PUBLIC_STRAPI_HOST}${cover.url}` : ''

            return { name, year, slug, description, image, actors }
        }
    )
}

export default function DetailMovieWidget(props: DetailMovieWidgetProps) {
    const { locale } = useLocale()
    const [movie, setMovie] = useState<any>(null)
    const [actors, setActors] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchMovieDetails() {
            try {
                setLoading(true)

                const documentId = await getDocumentIdFromSlug(
                    locale,
                    props.slug
                )
                const movieData = await getMovie(locale, documentId)

                if (!movieData) throw new Error('Película no encontrada')

                setMovie(movieData)

                const actorsData = movieData.actors
                    ? await Promise.all(
                          movieData.actors.map((show: any) =>
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

        fetchMovieDetails()
    }, [locale, props.slug])

    // useEffect(() => {
    //     getDocumentIdFromSlug(locale, props.slug)
    //         .then((documentId) => {
    //             return getMovie(locale, documentId)
    //         })
    //         .then((movieData) => {
    //             setMovie(movieData)
    //             setLoading(false)
    //         })
    //         .catch((err) => {
    //             setError(err.message)
    //             setLoading(false)
    //         })
    // }, [locale, props.slug])

    if (loading) return <p>Cargando película...</p>
    if (error) return <p>{error}</p>
    if (!movie) return <p>Película no encontrada</p>

    return (
        <div data-testid="detail-movie-widget" className={styles.container}>
            <h1 className={styles.title}>{movie.name}</h1>

            <div className={styles.card}>
                <img className={styles.cover} src={movie.image} />
                <div className={styles.info}>
                    <p className={styles.description}>
                        {movie.description}
                        <br />
                        <br />
                        {movie.year}
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
