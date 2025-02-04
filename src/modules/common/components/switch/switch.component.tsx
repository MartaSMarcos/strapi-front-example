import React from 'react'
import styles from './switch.module.css'
import { useState, useEffect } from 'react'
import { UserCog } from 'lucide-react'

const switchVariants = {
    default: styles['variant--default'],
    ticked: styles['variant--ticked'],
    clear: styles['variant--clear'],
    crossed: styles['variant--crossed'],
}
const sizeVariants = {
    xl: styles['size-xl'],
    lg: styles['size-lg'],
    md: styles['size-md'],
    sm: styles['size-sm'],
}

type sizeVariantsKeys = keyof typeof sizeVariants
type switchVariantsKeys = keyof typeof switchVariants

export type SwitchProps = {
    color?: string
    disabled?: boolean
    initialValue?: boolean
    variant?: switchVariantsKeys
    size?: sizeVariantsKeys
    className?: string
    onChange?: (value: boolean) => void
}

export function Switch(props: SwitchProps) {
    const [value, setValue] = useState<boolean>(false)
    useEffect(() => {
        props.initialValue != null
            ? setValue(props.initialValue)
            : setValue(false)
        // props.onChange(value)
    }, [])

    return (
        <label
            data-testid="switch"
            className={`${styles.switch} ${props.className} ${props.variant && switchVariants[props.variant]} bg-${props.color} ${sizeVariants[props.size]}`}
        >
            <input
                type="checkbox"
                onClick={() => {
                    setValue(!value)
                    console.log(props.variant)
                    if (props.onChange != null) {
                        props.onChange(value)
                    }
                }}
            ></input>
            <span className={styles['switch__slider']}>
                <div className={styles['switch__slider__icon-slot']}>
                    {/* <UserCog></UserCog> */}
                </div>
            </span>
        </label>
    )
}
