import React from 'react'
import styles from './theme-switch.module.css'
import { Switch, SwitchProps } from '../switch'
import { useThemeContext } from '@/common/providers/theme-context/theme-context-provider'

export type ThemeSwitchProps = SwitchProps & {}

export function ThemeSwitch(props: ThemeSwitchProps) {
    const { changeTheme } = useThemeContext()

    function handleThemeChange(flag: boolean) {
        console.log(`flag: ${flag}`)
        flag ? changeTheme('dark') : changeTheme('light')
    }

    return (
        <div data-testid="theme-switch" className={styles.container}>
            <Switch
                {...props}
                onChange={(value: boolean) => {
                    handleThemeChange(value)
                }}
            ></Switch>
        </div>
    )
}
