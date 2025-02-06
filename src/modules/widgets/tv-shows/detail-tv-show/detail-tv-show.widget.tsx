'use client'
import { useEffect, useState } from 'react'
import styles from './detail-tv-show.module.css'
import { query } from '@/common/query'
import { useLocale } from '@/common/providers/locale-context/locale-context.provider'
import Link from 'next/link'
import { useTvShow } from '@/api/tv-show'
const NEXT_PUBLIC_STRAPI_HOST = process.env.NEXT_PUBLIC_STRAPI_HOST

export type DetailTvShowWidgetProps = {
    slug: string
}

export function getDocumentIdFromSlug(locale: string, slug: string) {
    return query(
        `tv-shows?locale=${locale}&filters[slug][$eq]=${slug}&fields=documentId`
    ).then((res) => {
        if (!res.data || res.data.length === 0) {
            throw new Error(`No se encontró la serie con el slug: ${slug}`)
        }

        return res.data[0].documentId
    })
}

export function getTVShow(locale: string, documentId: string) {
    return query(`tv-shows/${documentId}?locale=${locale}&populate=*`).then(
        (res) => {
            if (!res.data) return null

            const {
                name,
                releaseYear,
                endYear,
                slug,
                description,
                cover,
                actors,
            } = res.data
            const image = cover ? `${NEXT_PUBLIC_STRAPI_HOST}${cover.url}` : ''

            return {
                name,
                releaseYear,
                endYear,
                slug,
                description,
                image,
                actors,
            }
        }
    )
}

export function DetailTvShowWidget(props: DetailTvShowWidgetProps) {
    const { locale } = useLocale()
    // const [show, setShow] = useState<any>(null)
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
        data: show,
        isLoading,
        isError,
    } = useTvShow({
        locale: locale,
        documentId: documentId,
    })

    // useEffect(() => {
    //     async function fetchTVShowDetails() {
    //         try {
    //             setLoading(true)

    //             const documentId = await getDocumentIdFromSlug(
    //                 locale,
    //                 props.slug
    //             )
    //             const showData = await getTVShow(locale, documentId)

    //             if (!showData) throw new Error('Película no encontrada')

    //             setShow(showData)

    //             const actorsData = showData.actors
    //                 ? await Promise.all(
    //                       showData.actors.map((show: any) =>
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

    //     fetchTVShowDetails()
    // }, [locale, props.slug])

    // useEffect(() => {
    //     getDocumentIdFromSlug(locale, props.slug)
    //         .then((documentId) => {
    //             return getTVShow(locale, documentId)
    //         })
    //         .then((showData) => {
    //             setShow(showData)
    //             setLoading(false)
    //         })
    //         .catch((err) => {
    //             setError(err.message)
    //             setLoading(false)
    //         })
    // }, [locale, props.slug])

    return (
        <div data-testid="detail-tv-show-widget" className={styles.container}>
            {isLoading && <p>Cargando serie...</p>}
            {isError && <p>Error al cargar la serie</p>}
            {show?.data ? (
                <>
                    <h1 className={styles.title}>{show?.data.name}</h1>

                    <div className={styles.card}>
                        <img
                            className={styles.cover}
                            src={`${NEXT_PUBLIC_STRAPI_HOST}${show?.data.cover?.url}`}
                        />
                        <div className={styles.info}>
                            <p className={styles.description}>
                                {show?.data.description}
                                <br />
                                <br />
                                {show?.data.releaseYear}{' '}
                                {show?.data.endYear &&
                                    `- ${show?.data.endYear}`}
                            </p>
                            <div className={styles.genres}>
                                {show?.data.genres &&
                                    show?.data.genres.length > 0 &&
                                    show?.data.genres.map((genre) => (
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
                            {show?.data.actors &&
                                show?.data.actors.length > 0 &&
                                show?.data.actors.map((actor) => (
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
                <p>Serie no encontrada.</p>
            )}
        </div>
    )
}
