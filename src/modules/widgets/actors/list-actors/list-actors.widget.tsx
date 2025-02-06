'use client'
import React, { useEffect, useState } from 'react'
import styles from './list-actors.module.css'
import { query } from '@/common/query'
import Link from 'next/link'
import { useLocale } from '@/common/providers/locale-context/locale-context.provider'
import { Actor } from '@/types/actor.types'
import { useActors } from '@/api/actor'
const NEXT_PUBLIC_STRAPI_HOST = process.env.NEXT_PUBLIC_STRAPI_HOST

export type ListActorsWidgetProps = {}

export function getActors(locale: string) {
    return query(`actors?locale=${locale}&sort=name:asc&populate=*`).then(
        (res) => {
            return res.data.map((actor: Actor) => {
                const {
                    name,
                    birthdate,
                    slug,
                    biography,
                    photo,
                    movies,
                    shows,
                } = actor
                const image = `${NEXT_PUBLIC_STRAPI_HOST}${photo?.url}`

                return {
                    name,
                    birthdate,
                    slug,
                    biography,
                    image,
                    movies,
                    shows,
                }
            })
        }
    )
}

export function ListActorsWidget(props: ListActorsWidgetProps) {
    const { locale } = useLocale()
    // const [actors, setActors] = useState<Actor[]>([])
    // const [loading, setLoading] = useState<boolean>(true)
    // const [error, setError] = useState<string | null>(null)

    const {
        data: actors,
        isLoading,
        isError,
    } = useActors({ locale: locale, size: 10 })

    // useEffect(() => {
    //     getActors(locale)
    //         .then((actorData) => {
    //             setActors(actorData)
    //             setLoading(false)
    //         })
    //         .catch((err) => {
    //             setError('Error al cargar los actores: ' + err.message)
    //             setLoading(false)
    //         })
    // }, [locale])

    return (
        <div data-testid="list-actors-widget" className={styles.container}>
            {isLoading && <p>Cargando actores...</p>}
            {isError && <p>Error al cargar las actores</p>}
            {actors?.data ? (
                <>
                    <h1 className={styles.title}>
                        {locale === 'es' ? 'Actores' : 'Actors'}
                    </h1>
                    <div className={styles.card}>
                        {actors?.data.map((actor) => (
                            <Link
                                href={`/actors/${actor.slug}`}
                                key={actor.slug}
                                className={styles.link}
                            >
                                <img
                                    className={styles.cover}
                                    src={`${NEXT_PUBLIC_STRAPI_HOST}${actor.photo?.url}`}
                                />
                                <div className={styles.info}>
                                    <h5 className={styles.name}>
                                        {actor.name}
                                    </h5>
                                </div>
                            </Link>
                        ))}
                    </div>
                </>
            ) : (
                <p>Actores no encontrados.</p>
            )}
        </div>
    )
}
