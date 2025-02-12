'use client'
import React, { useEffect, useState } from 'react'
import styles from './list-tv-shows.module.css'
import { TvShow } from '@/types/tv-show.types'
import Link from 'next/link'
import { query } from '@/common/query'
import { useLocale } from '@/common/providers/locale-context/locale-context.provider'
import { useTvShows } from '@/api/tv-show'
const NEXT_PUBLIC_STRAPI_HOST = process.env.NEXT_PUBLIC_STRAPI_HOST

export type ListTvShowsWidgetProps = {}

// export function getTVShows(locale: string) {
//     return query(`tv-shows?locale=${locale}&sort=name:asc&populate=*`).then(
//         (res) => {
//             return res.data.map((tvshow: TvShow) => {
//                 const { name, releaseYear, endYear, slug, description, cover } =
//                     tvshow
//                 const image = `${NEXT_PUBLIC_STRAPI_HOST}${cover?.url}`

//                 return { name, releaseYear, endYear, slug, description, image }
//             })
//         }
//     )
// }

export function ListTvShowsWidget(props: ListTvShowsWidgetProps) {
    const { locale } = useLocale()
    // const [shows, setShows] = useState<TvShow[]>([])

    const {
        data: shows,
        isLoading,
        isError,
    } = useTvShows({ locale: locale, size: 10 })

    // useEffect(() => {
    //     getTVShows(locale)
    //         .then((showData) => {
    //             setShows(showData)
    //             setLoading(false)
    //         })
    //         .catch((err) => {
    //             setError('Error al cargar las series: ' + err.message)
    //             setLoading(false)
    //         })
    // }, [locale])

    if (isLoading) return <p>Cargando series...</p>
    if (isError) return <p>Error al cargar las series</p>
    if (shows?.data.length === 0) return <p>No se encontraron series.</p>

    return (
        <div data-testid="list-tv-shows-widget" className={styles.container}>
            <h1 className={styles.title}>
                {locale === 'es' ? 'Series' : 'TV Shows'}
            </h1>

            <div className={styles.card}>
                {shows?.data.map((show) => (
                    <Link
                        href={`/tv-shows/${show.slug}`}
                        key={show.slug}
                        className={styles.link}
                    >
                        <img
                            className={styles.cover}
                            src={`${NEXT_PUBLIC_STRAPI_HOST}${show.cover?.url}`}
                        />
                        <div className={styles.info}>
                            <h5 className={styles.name}>{show.name}</h5>
                            <p className={styles.description}>
                                {show.description}
                                <br />
                                <br />
                                {show.releaseYear}{' '}
                                {show.endYear && `- ${show.endYear}`}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
