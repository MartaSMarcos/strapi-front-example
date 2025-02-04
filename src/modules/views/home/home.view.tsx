'use client'
import React from 'react'
import styles from './home.module.css'
import { HomeWidget } from '@/widgets/home/home'

type HomeViewProps = {}

export function HomeView(props: HomeViewProps) {
    return (
        <div data-testid="home-view" className={styles.container}>
            <HomeWidget />
        </div>
    )
}
