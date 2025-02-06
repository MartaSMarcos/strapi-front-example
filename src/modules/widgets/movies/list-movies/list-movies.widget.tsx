'use client'
import React, { useState } from 'react'
import styles from './list-movies.module.css'
import { query } from '@/common/query'
import { Movie } from '@/types/movie.types'
import Link from 'next/link'
import { useLocale } from '@/common/providers/locale-context/locale-context.provider'
import { useMovies } from '@/api/movie'
const NEXT_PUBLIC_STRAPI_HOST = process.env.NEXT_PUBLIC_STRAPI_HOST

export type ListMoviesWidgetProps = {}

export function getMovies(locale: string) {
    return query(`movies?locale=${locale}&sort=name:asc&populate=*`).then(
        (res) => {
            return res.data.map((movie: Movie) => {
                const { name, year, slug, description, cover } = movie
                const image = `${NEXT_PUBLIC_STRAPI_HOST}${cover?.url}`

                return { name, year, slug, description, image }
            })
        }
    )
}

export function ListMoviesWidget(props: ListMoviesWidgetProps) {
    const { locale } = useLocale()
    const [image, setImage] = useState<string>()
    // const [movies, setMovies] = useState<Movie[]>([])

    const {
        data: movies,
        isLoading,
        isError,
    } = useMovies({ locale: locale, size: 10 })

    // useEffect(() => {
    //     getMovies(locale)
    //         .then((movieData) => {
    //             setMovies(movieData)
    //             setLoading(false)
    //         })
    //         .catch((err) => {
    //             setError('Error al cargar las películas: ' + err.message)
    //             setLoading(false)
    //         })
    // }, [locale])

    return (
        <div data-testid="list-movies-widget" className={styles.container}>
            {isLoading && <p>Cargando películas...</p>}
            {isError && <p>Error al cargar las películas</p>}
            {movies?.data ? (
                <>
                    <h1 className={styles.title}>
                        {locale === 'es' ? 'Películas' : 'Movies'}
                    </h1>

                    <div className={styles.card}>
                        {movies?.data.map((movie) => (
                            <Link
                                href={`/movies/${movie.slug}`}
                                key={movie.slug}
                                className={styles.link}
                            >
                                <img
                                    className={styles.cover}
                                    src={`${NEXT_PUBLIC_STRAPI_HOST}${movie.cover?.url}`}
                                />
                                <div className={styles.info}>
                                    <h5 className={styles.name}>
                                        {movie.name}
                                    </h5>
                                    <p className={styles.description}>
                                        {movie.description}
                                        <br />
                                        <br />
                                        {movie.year}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </>
            ) : (
                <p>Películas no encontradas.</p>
            )}
        </div>
    )
}
