import React from 'react'
import styles from './home.module.css'
import Link from 'next/link'
import { useLocale } from '@/common/providers/locale-context/locale-context.provider'
import { useMenu } from '@/api/menu'
import DescriptionBlock from '@/common/components/description-block/description-block.component'

export type HomeWidgetProps = {}

export function HomeWidget(props: HomeWidgetProps) {
    const { locale } = useLocale()

    const { data: menu } = useMenu({ locale: locale })

    return (
        <div data-testid="home-widget" className={styles.container}>
            {menu?.data?.descriptionBlocks?.map((block, index) => (
                <DescriptionBlock
                    key={index}
                    block={block}
                    className={styles.descriptionBlock}
                />
            ))}
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
