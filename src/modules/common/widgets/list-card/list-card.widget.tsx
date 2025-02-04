import React, { useEffect, useState } from 'react'
import { Input } from '@/common/components/input'
import styles from './list-card.module.css'
import { ListCardItem } from '@/common/components/list-card-item'

type listItem = {
    name: string
    description: string
}

export type ListCardWidgetProps = {
    title: string
    items: Array<listItem>
}

export function ListCardWidget(props: ListCardWidgetProps) {
    const [filteredItems, setFilteredItems] = useState<Array<listItem>>([])
    useEffect(() => {
        setFilteredItems(props.items)
    }, [])

    function filterItemsByName(items: Array<listItem>, name: string): void {
        const filterExp = new RegExp(name)
        const filtered = items.filter((item) => {
            return filterExp.test(item.name) ? item : null
        })
        setFilteredItems(filtered)
    }

    return (
        <div
            data-testid="api-side-list-widget"
            className={styles['apiSideList'] + ' dark'}
        >
            <h1 className={styles['apiSideList__heading']}>{props.title}</h1>
            <Input
                onChange={(e) => filterItemsByName(props.items, e.target.value)}
                placeholder="Buscar una api"
                className={styles['apiSideList__input']}
            ></Input>

            <div className={styles['apiSideList__list']}>
                {filteredItems.map((item, index) => {
                    return (
                        <ListCardItem
                            link=""
                            key={item.name}
                            name={item.name}
                            index={index + 1}
                        ></ListCardItem>
                    )
                })}
            </div>
        </div>
    )
}
