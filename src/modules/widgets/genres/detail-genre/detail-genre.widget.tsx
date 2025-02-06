'use client'
import React, { useEffect, useMemo, useState } from 'react'
import styles from './detail-genre.module.css'
import { query } from '@/common/query'
import { useLocale } from '@/common/providers/locale-context/locale-context.provider'
import Link from 'next/link'
import { useGenre } from '@/api/genre'
const NEXT_PUBLIC_STRAPI_HOST = process.env.NEXT_PUBLIC_STRAPI_HOST

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
    // const [genre, setGenre] = useState<any>(null)
    const [documentId, setDocumentId] = useState<string>()
    // const [movies, setMovies] = useState<any>([])
    // const [shows, setShows] = useState<any>(null)

    useEffect(() => {
        getDocumentIdFromSlug(locale, props.slug)
            .then(setDocumentId)
            .catch((err) => console.error('Error al obtener documentId:', err))
    }, [locale, props.slug])

    const {
        data: genre,
        isLoading,
        isError,
    } = useGenre({
        locale: locale,
        documentId: documentId,
    })

    // useEffect(() => {
    //     async function fetchGenreDetails() {
    //         try {
    //             setLoading(true)

    //             const documentId = await getDocumentIdFromSlug(
    //                 locale,
    //                 props.slug
    //             )
    //             const genreData = await getGenre(locale, documentId)

    //             if (!genreData) throw new Error('Género no encontrado')

    //             setGenre(genreData)

    //             const moviesData = genreData.movies
    //                 ? await Promise.all(
    //                       genreData.movies.map((movie: any) =>
    //                           getMovie(locale, movie.documentId)
    //                       )
    //                   )
    //                 : []

    //             const showsData = genreData.shows
    //                 ? await Promise.all(
    //                       genreData.shows.map((show: any) =>
    //                           getTVShow(locale, show.documentId)
    //                       )
    //                   )
    //                 : []

    //             setMovies(moviesData)
    //             setShows(showsData)

    //             setLoading(false)
    //         } catch (err) {
    //             setError(err.message)
    //             setLoading(false)
    //         }
    //     }

    //     fetchGenreDetails()
    // }, [locale, props.slug])

    return (
        <div data-testid="detail-genre-widget" className={styles.container}>
            {isLoading && <p>Cargando género...</p>}
            {isError && <p>Error al cargar el género</p>}
            {genre?.data ? (
                <>
                    <h1 className={styles.title}>{genre?.data.name}</h1>
                    <div className={styles.card}>
                        <div>
                            <h2 className={styles.subtitle}>
                                {locale === 'es' ? 'Películas' : 'Movies'}
                            </h2>

                            {genre.data.movies &&
                                genre.data.movies.length > 0 &&
                                genre.data.movies.map((movie) => (
                                    <>
                                        console.log(,'movie', movie)
                                        <Link
                                            href={`/movies/${movie.slug}`}
                                            key={movie.slug}
                                            className={styles.link}
                                        >
                                            <img
                                                src={`${NEXT_PUBLIC_STRAPI_HOST}${movie.cover?.url}`}
                                                alt={movie.name}
                                                className={styles.cover}
                                            />
                                            <div className={styles.info}>
                                                <h5 className={styles.name}>
                                                    {movie.name}
                                                </h5>
                                            </div>
                                        </Link>
                                    </>
                                ))}
                        </div>
                        <div>
                            <h2 className={styles.subtitle}>
                                {locale === 'es' ? 'Series' : 'TV Shows'}
                            </h2>
                            {genre?.data.tv_shows &&
                                genre?.data.tv_shows.length > 0 &&
                                genre?.data.tv_shows.map((show) => (
                                    <Link
                                        href={`/tv-shows/${show.slug}`}
                                        key={show.slug}
                                        className={styles.link}
                                    >
                                        <img
                                            src={`${NEXT_PUBLIC_STRAPI_HOST}${show.cover?.url}`}
                                            alt={show.name}
                                            className={styles.cover}
                                        />
                                        <div className={styles.info}>
                                            <h5 className={styles.name}>
                                                {show.name}
                                            </h5>
                                        </div>
                                    </Link>
                                ))}
                        </div>
                    </div>
                </>
            ) : (
                <p>Género no encontrado.</p>
            )}
        </div>
    )
}
