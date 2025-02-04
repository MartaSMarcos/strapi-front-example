'use client'
import React, { useEffect, useState } from 'react'
import styles from './list-movies.module.css'
import { query } from '@/common/query'
import { Movie } from '@/types/movie.types'
import Link from 'next/link'
import { useLocale } from '@/common/providers/locale-context/locale-context.provider'
const NEXT_PUBLIC_STRAPI_HOST = process.env.NEXT_PUBLIC_STRAPI_HOST

export type ListMoviesWidgetProps = {}

export function getMovies(locale: string) {
    return query(`movies?locale=${locale}&populate=*`).then((res) => {
        return res.data.map((movie: Movie) => {
            const { name, year, slug, description, cover } = movie
            const image = `${NEXT_PUBLIC_STRAPI_HOST}${cover?.url}`

            return { name, year, slug, description, image }
        })
    })
}

export function ListMoviesWidget(props: ListMoviesWidgetProps) {
    const { locale } = useLocale()
    const [movies, setMovies] = useState<Movie[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        getMovies(locale)
            .then((movieData) => {
                setMovies(movieData)
                setLoading(false)
            })
            .catch((err) => {
                setError('Error al cargar las películas: ' + err.message)
                setLoading(false)
            })
    }, [locale])

    if (loading) return <p>Cargando películas...</p>
    if (error) return <p>{error}</p>
    if (movies.length === 0) return <p>No se encontraron películas.</p>

    return (
        <div data-testid="list-movies-widget" className={styles.container}>
            <h1 className={styles.title}>
                {locale === 'es' ? 'Películas' : 'Movies'}
            </h1>

            <div className={styles.card}>
                {movies.map((movie) => (
                    <Link
                        href={`/movies/${movie.slug}`}
                        key={movie.slug}
                        className={styles.link}
                    >
                        <img className={styles.cover} src={movie.image} />
                        <div className={styles.info}>
                            <h5 className={styles.name}>{movie.name}</h5>
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
        </div>
    )
}
