'use client'
import { useEffect, useState } from 'react'
import styles from './detail-movie.module.css'
import { query } from '@/common/query'
import { useLocale } from '@/common/providers/locale-context/locale-context.provider'
import Link from 'next/link'
import { useMovie } from '@/api/movie'
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
    // const [movie, setMovie] = useState<Movie>()
    const [documentId, setDocumentId] = useState<string>()
    // const [actors, setActors] = useState<any>(null)
    // const [loading, setLoading] = useState<boolean>(true)
    // const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        getDocumentIdFromSlug(locale, props.slug)
            .then(setDocumentId)
            .catch((err) => console.error('Error al obtener documentId:', err))
    }, [locale, props.slug])

    const {
        data: movie,
        isLoading,
        isError,
    } = useMovie({
        locale: locale,
        documentId: documentId,
    })

    console.log('movie', movie)

    // useEffect(() => {
    //     async function fetchMovieDetails() {
    //         try {
    //             setLoading(true)

    //             const documentId = await getDocumentIdFromSlug(
    //                 locale,
    //                 props.slug
    //             )
    //             const movieData = await getMovie(locale, documentId)

    //             if (!movieData) throw new Error('Película no encontrada')

    //             setMovie(movieData)

    //             const actorsData = movieData.actors
    //                 ? await Promise.all(
    //                       movieData.actors.map((show: any) =>
    //                           getActor(locale, show.documentId)
    //                       )
    //                   )
    //                 : []

    //             setActors(actorsData)

    //             setLoading(false)
    //         } catch (err) {
    //             setError(err.message)
    //             setLoading(false)
    //         }
    //     }

    //     fetchMovieDetails()
    // }, [locale, props.slug])

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

    return (
        <div data-testid="detail-movie-widget" className={styles.container}>
            {isLoading && <p>Cargando película...</p>}
            {isError && <p>Error al cargar la película</p>}
            {movie?.data ? (
                <>
                    <h1 className={styles.title}>{movie?.data.name}</h1>

                    <div className={styles.card}>
                        <img
                            className={styles.cover}
                            src={`${NEXT_PUBLIC_STRAPI_HOST}${movie?.data.cover?.url}`}
                        />
                        <div className={styles.info}>
                            <p className={styles.description}>
                                {movie?.data.description}
                                <br />
                                <br />
                                {movie?.data.year}
                            </p>
                            <div className={styles.genres}>
                                {movie?.data.genres &&
                                    movie?.data.genres.length > 0 &&
                                    movie?.data.genres.map((genre) => (
                                        <Link
                                            className={styles.genre}
                                            href={`/genres/${genre.slug}`}
                                        >
                                            {genre.name}
                                        </Link>
                                    ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className={styles.subtitle}>
                            {locale === 'es' ? 'Actores' : 'Actors'}
                        </h2>
                        <div className={styles.actors_list}>
                            {movie?.data.actors &&
                                movie?.data.actors.length > 0 &&
                                movie?.data.actors.map((actor) => (
                                    <Link
                                        href={`/actors/${actor.slug}`}
                                        key={actor.slug}
                                        className={styles.link}
                                    >
                                        <img
                                            src={`${NEXT_PUBLIC_STRAPI_HOST}${actor?.photo?.url}`}
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
                </>
            ) : (
                <p>Película no encontrada.</p>
            )}
        </div>
    )
}
