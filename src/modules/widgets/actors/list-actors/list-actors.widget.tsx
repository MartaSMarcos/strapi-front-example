'use client'
import React, { useEffect, useState } from 'react'
import styles from './list-actors.module.css'
import { query } from '@/common/query'
import Link from 'next/link'
import { useLocale } from '@/common/providers/locale-context/locale-context.provider'
import { Actor } from '@/types/actor.types'
const NEXT_PUBLIC_STRAPI_HOST = process.env.NEXT_PUBLIC_STRAPI_HOST

export type ListActorsWidgetProps = {}

export function getActors(locale: string) {
    return query(`actors?locale=${locale}&populate=*`).then((res) => {
        return res.data.map((actor: Actor) => {
            const { name, birthdate, slug, biography, photo, movies, shows } =
                actor
            const image = `${NEXT_PUBLIC_STRAPI_HOST}${photo?.url}`

            return { name, birthdate, slug, biography, image, movies, shows }
        })
    })
}

export function ListActorsWidget(props: ListActorsWidgetProps) {
    const { locale } = useLocale()
    const [actors, setActors] = useState<Actor[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        getActors(locale)
            .then((actorData) => {
                setActors(actorData)
                setLoading(false)
            })
            .catch((err) => {
                setError('Error al cargar los actores: ' + err.message)
                setLoading(false)
            })
    }, [locale])

    if (loading) return <p>Cargando actores...</p>
    if (error) return <p>{error}</p>
    if (actors.length === 0) return <p>No se encontraron actores.</p>

    return (
        <div data-testid="list-actors-widget" className={styles.container}>
            <h1 className={styles.title}>
                {locale === 'es' ? 'Actores' : 'Actors'}
            </h1>
            <div className={styles.card}>
                {actors.map((actor) => (
                    <>
                        <Link
                            href={`/actors/${actor.slug}`}
                            key={actor.slug}
                            className={styles.link}
                        >
                            <img className={styles.cover} src={actor.image} />
                            <div className={styles.info}>
                                <h5 className={styles.name}>{actor.name}</h5>
                            </div>
                        </Link>
                    </>
                ))}
            </div>
        </div>
    )
}
