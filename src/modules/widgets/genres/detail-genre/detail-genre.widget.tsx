'use client'
import React, { useEffect, useState } from 'react'
import styles from './detail-genre.module.css'
import { query } from '@/common/query'
import { useLocale } from '@/common/providers/locale-context/locale-context.provider'
import { getMovie } from '@/widgets/movies/detail-movie/detail-movie.widget'
import { getTVShow } from '@/widgets/tv-shows/detail-tv-show/detail-tv-show.widget'
import Link from 'next/link'
export type DetailGenreWidgetProps = {
    slug: string
}

function getDocumentIdFromSlug(locale: string, slug: string) {
    return query(
        `genres?locale=${locale}&filters[slug][$eq]=${slug}&fields=documentId`
    ).then((res) => {
        if (!res.data || res.data.length === 0) {
            throw new Error(`No se encontró el género con el slug: ${slug}`)
        }

        return res.data[0].documentId
    })
}

export function getGenre(locale: string, documentId: string) {
    return query(`genres/${documentId}?locale=${locale}&populate=*`).then(
        (res) => {
            if (!res.data) return null

            const { name, slug, movies, tv_shows: shows } = res.data

            return { name, slug, movies, shows }
        }
    )
}

export default function DetailGenreWidget(props: DetailGenreWidgetProps) {
    const { locale } = useLocale()
    const [genre, setGenre] = useState<any>(null)
    const [movies, setMovies] = useState<any>(null)
    const [shows, setShows] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchGenreDetails() {
            try {
                setLoading(true)

                const documentId = await getDocumentIdFromSlug(
                    locale,
                    props.slug
                )
                const genreData = await getGenre(locale, documentId)

                if (!genreData) throw new Error('Género no encontrado')

                setGenre(genreData)

                const moviesData = genreData.movies
                    ? await Promise.all(
                          genreData.movies.map((movie: any) =>
                              getMovie(locale, movie.documentId)
                          )
                      )
                    : []

                const showsData = genreData.shows
                    ? await Promise.all(
                          genreData.shows.map((show: any) =>
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

        fetchGenreDetails()
    }, [locale, props.slug])

    if (loading) return <p>Cargando género...</p>
    if (error) return <p>{error}</p>
    if (!genre) return <p>Género no encontrado</p>

    return (
        <div data-testid="detail-genre-widget" className={styles.container}>
            <h1 className={styles.title}>{genre.name}</h1>
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
