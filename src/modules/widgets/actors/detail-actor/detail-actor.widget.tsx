import React, { useEffect, useState } from 'react'
import styles from './detail-actor.module.css'
import { query } from '@/common/query'
import { useLocale } from '@/common/providers/locale-context/locale-context.provider'
import { getMovie } from '@/widgets/movies/detail-movie'
import { getTVShow } from '@/widgets/tv-shows/detail-tv-show'
import Link from 'next/link'
const NEXT_PUBLIC_STRAPI_HOST = process.env.NEXT_PUBLIC_STRAPI_HOST

export type DetailActorWidgetProps = {
    slug: string
}

function getDocumentIdFromSlug(locale: string, slug: string) {
    return query(
        `actors?locale=${locale}&filters[slug][$eq]=${slug}&fields=documentId`
    ).then((res) => {
        if (!res.data || res.data.length === 0) {
            throw new Error(`No se encontró el actor con el slug: ${slug}`)
        }

        return res.data[0].documentId
    })
}

export function getActor(locale: string, documentId: string) {
    return query(`actors/${documentId}?locale=${locale}&populate=*`).then(
        (res) => {
            if (!res.data) return null

            const {
                name,
                birthdate,
                slug,
                biography,
                photo,
                movies,
                tv_shows: shows,
            } = res.data
            const image = photo ? `${NEXT_PUBLIC_STRAPI_HOST}${photo.url}` : ''

            return { name, birthdate, slug, biography, image, movies, shows }
        }
    )
}

export default function DetailActorWidget(props: DetailActorWidgetProps) {
    const { locale } = useLocale()
    const [actor, setActor] = useState<any>(null)
    const [movies, setMovies] = useState<any>(null)
    const [shows, setShows] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchActorDetails() {
            try {
                setLoading(true)

                const documentId = await getDocumentIdFromSlug(
                    locale,
                    props.slug
                )
                const actorData = await getActor(locale, documentId)

                if (!actorData) throw new Error('Género no encontrado')

                setActor(actorData)

                const moviesData = actorData.movies
                    ? await Promise.all(
                          actorData.movies.map((movie: any) =>
                              getMovie(locale, movie.documentId)
                          )
                      )
                    : []

                const showsData = actorData.shows
                    ? await Promise.all(
                          actorData.shows.map((show: any) =>
                              getTVShow(locale, show.documentId)
                          )
                      )
                    : []

                setMovies(moviesData)
                setShows(showsData)

                setLoading(false)
            } catch (err) {
                setError(err.message)
                setLoading(false)
            }
        }

        fetchActorDetails()
    }, [locale, props.slug])

    if (loading) return <p>Cargando actor...</p>
    if (error) return <p>{error}</p>
    if (!actor) return <p>Actor no encontrado</p>

    return (
        <div data-testid="detail-actor-widget" className={styles.container}>
            <h1 className={styles.title}>{actor.name}</h1>
            <p>{actor.biography}</p>
            <div className={styles.card}>
                <div>
                    <h2 className={styles.subtitle}>
                        {locale === 'es' ? 'Películas' : 'Movies'}
                    </h2>
                    {movies &&
                        movies.length > 0 &&
                        movies.map((movie) => (
                            <Link
                                href={`/movies/${movie.slug}`}
                                key={movie.slug}
                                className={styles.link}
                            >
                                <img
                                    src={movie.image}
                                    alt={movie.name}
                                    className={styles.cover}
                                />
                                <div className={styles.info}>
                                    <h5 className={styles.name}>
                                        {movie.name}
                                    </h5>
                                </div>
                            </Link>
                        ))}
                </div>
                <div>
                    <h2 className={styles.subtitle}>
                        {locale === 'es' ? 'Series' : 'TV Shows'}
                    </h2>
                    {shows &&
                        shows.length > 0 &&
                        shows.map((show) => (
                            <Link
                                href={`/tv-shows/${show.slug}`}
                                key={show.slug}
                                className={styles.link}
                            >
                                <img
                                    src={show.image}
                                    alt={show.name}
                                    className={styles.cover}
                                />
                                <div className={styles.info}>
                                    <h5 className={styles.name}>{show.name}</h5>
                                </div>
                            </Link>
                        ))}
                </div>
            </div>
        </div>
    )
}
