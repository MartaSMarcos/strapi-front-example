import React from 'react'
import styles from './home.module.css'
import Link from 'next/link'
import { useLocale } from '@/common/providers/locale-context/locale-context.provider'

export type HomeWidgetProps = {}

export function HomeWidget(props: HomeWidgetProps) {
    const { locale } = useLocale()

    return (
        <div data-testid="home-widget" className={styles.container}>
            <h1 className="text-center w-full text-red-500">Desde home view</h1>
            <div className={styles.card}>
                <Link href={`/movies`} className={styles.link}>
                    <div className={styles.info}>
                        <h5 className={styles.name}>
                            {locale === 'es' ? 'Películas' : 'Movies'}
                        </h5>
                    </div>
                </Link>
                <Link href={`/tv-shows`} className={styles.link}>
                    <div className={styles.info}>
                        <h5 className={styles.name}>
                            {locale === 'es' ? 'Series' : 'TV Shows'}
                        </h5>
                    </div>
                </Link>
                <Link href={`/genres`} className={styles.link}>
                    <div className={styles.info}>
                        <h5 className={styles.name}>
                            {locale === 'es' ? 'Géneros' : 'Genres'}
                        </h5>
                    </div>
                </Link>
                <Link href={`/actors`} className={styles.link}>
                    <div className={styles.info}>
                        <h5 className={styles.name}>
                            {locale === 'es' ? 'Actores' : 'Actors'}
                        </h5>
                    </div>
                </Link>
            </div>
        </div>
    )
}
