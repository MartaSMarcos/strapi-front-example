import { useLocale } from '@/common/providers/locale-context/locale-context.provider'
import styles from './detail-actor.module.css'
import { query } from '@/common/query'
import { useEffect, useState } from 'react'
import { useActor } from '@/api/actor'
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
    // const [actor, setActor] = useState<any>(null)
    const [documentId, setDocumentId] = useState<string>()
    // const [movies, setMovies] = useState<any>(null)
    // const [shows, setShows] = useState<any>(null)

    useEffect(() => {
        getDocumentIdFromSlug(locale, props.slug)
            .then(setDocumentId)
            .catch((err) => console.error('Error al obtener documentId:', err))
    }, [locale, props.slug])

    const {
        data: actor,
        isLoading,
        isError,
    } = useActor({
        locale: locale,
        documentId: documentId,
    })

    // useEffect(() => {
    //     async function fetchActorDetails() {
    //         try {
    //             setLoading(true)

    //             const documentId = await getDocumentIdFromSlug(
    //                 locale,
    //                 props.slug
    //             )
    //             const actorData = await getActor(locale, documentId)

    //             if (!actorData) throw new Error('Género no encontrado')

    //             setActor(actorData)

    //             const moviesData = actorData.movies
    //                 ? await Promise.all(
    //                       actorData.movies.map((movie: any) =>
    //                           getMovie(locale, movie.documentId)
    //                       )
    //                   )
    //                 : []

    //             const showsData = actorData.shows
    //                 ? await Promise.all(
    //                       actorData.shows.map((show: any) =>
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

    //     fetchActorDetails()
    // }, [locale, props.slug])

    return (
        <div data-testid="detail-actor-widget" className={styles.container}>
            {isLoading && <p>Cargando actor...</p>}
            {isError && <p>Error al cargar actor</p>}
            {actor?.data ? (
                <>
                    <h1 className={styles.title}>{actor?.data.name}</h1>
                    <div className={styles.card}>
                        <img
                            src={`${NEXT_PUBLIC_STRAPI_HOST}${actor.data.photo?.url}`}
                            alt={actor.data.name}
                            className={styles.cover}
                        />
                        <p className={styles.description}>
                            {actor?.data.biography}
                        </p>
                    </div>
                    <div className={styles.card}>
                        <div>
                            <h2 className={styles.subtitle}>
                                {locale === 'es' ? 'Películas' : 'Movies'}
                            </h2>
                            {actor.data.movies &&
                                actor.data.movies.length > 0 &&
                                actor.data.movies.map((movie) => (
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
                                ))}
                        </div>
                        <div>
                            <h2 className={styles.subtitle}>
                                {locale === 'es' ? 'Series' : 'TV Shows'}
                            </h2>
                            {actor?.data.tv_shows &&
                                actor?.data.tv_shows.length > 0 &&
                                actor?.data.tv_shows.map((show) => (
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
                <p>Actor no encontrado.</p>
            )}
        </div>
    )
}
