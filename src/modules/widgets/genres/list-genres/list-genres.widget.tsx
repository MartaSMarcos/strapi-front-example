import React, { useEffect, useState } from 'react'
import styles from './list-genres.module.css'
import { query } from '@/common/query'
import Link from 'next/link'
import { useLocale } from '@/common/providers/locale-context/locale-context.provider'
import { Genre } from '@/types/genre.types'
import { useGenres } from '@/api/genre'

export type ListGenresWidgetProps = {}

export function getGenres(locale: string) {
    return query(`genres?locale=${locale}&sort=name:asc&populate=*`).then(
        (res) => {
            return res.data.map((genre: Genre) => {
                const { name, slug, movies, shows } = genre

                return { name, slug, movies, shows }
            })
        }
    )
}

export function ListGenresWidget(props: ListGenresWidgetProps) {
    const { locale } = useLocale()
    // const [genres, setGenres] = useState<Genre[]>([])

    const {
        data: genres,
        isLoading,
        isError,
    } = useGenres({ locale: locale, size: 10 })

    // useEffect(() => {
    //     getGenres(locale)
    //         .then((movieData) => {
    //             setGenres(movieData)
    //             setLoading(false)
    //         })
    //         .catch((err) => {
    //             setError('Error al cargar los géneros: ' + err.message)
    //             setLoading(false)
    //         })
    // }, [locale])

    return (
        <div data-testid="list-genres-widget" className={styles.container}>
            {isLoading && <p>Cargando Géneros...</p>}
            {isError && <p>Error al cargar las Géneros</p>}
            {genres?.data ? (
                <>
                    <h1 className={styles.title}>
                        {locale === 'es' ? 'Géneros' : 'Genres'}
                    </h1>

                    <div className={styles.card}>
                        {genres?.data.map((genre) => (
                            <Link
                                href={`/genres/${genre.slug}`}
                                key={genre.slug}
                                className={styles.link}
                            >
                                <div className={styles.info}>
                                    <h5 className={styles.name}>
                                        {genre.name}
                                    </h5>
                                </div>
                            </Link>
                        ))}
                    </div>
                </>
            ) : (
                <p>Géneros no encontrados.</p>
            )}
        </div>
    )
}
