import React, { useEffect, useState } from 'react'
import styles from './list-genres.module.css'
import { query } from '@/common/query'
import Link from 'next/link'
import { useLocale } from '@/common/providers/locale-context/locale-context.provider'
import { Genre } from '@/types/genre.types'
import { Movie } from '@/api/movies'
const NEXT_PUBLIC_STRAPI_HOST = process.env.NEXT_PUBLIC_STRAPI_HOST

export type ListGenresWidgetProps = {}

export function getGenres(locale: string) {
    return query(`genres?locale=${locale}&populate=*`).then((res) => {
        return res.data.map((genre: Genre) => {
            const { name, slug, movies, shows } = genre

            return { name, slug, movies, shows }
        })
    })
}

export function ListGenresWidget(props: ListGenresWidgetProps) {
    const { locale } = useLocale()
    const [genres, setGenres] = useState<Genre[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        getGenres(locale)
            .then((movieData) => {
                setGenres(movieData)
                setLoading(false)
            })
            .catch((err) => {
                setError('Error al cargar los géneros: ' + err.message)
                setLoading(false)
            })
    }, [locale])

    if (loading) return <p>Cargando géneros...</p>
    if (error) return <p>{error}</p>
    if (genres.length === 0) return <p>No se encontraron géneros.</p>

    return (
        <div data-testid="list-genres-widget" className={styles.container}>
            <h1 className={styles.title}>
                {locale === 'es' ? 'Géneros' : 'Genres'}
            </h1>

            <div className={styles.card}>
                {genres.map((genre) => (
                    <Link
                        href={`/genres/${genre.slug}`}
                        key={genre.slug}
                        className={styles.link}
                    >
                        <div className={styles.info}>
                            <h5 className={styles.name}>{genre.name}</h5>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
