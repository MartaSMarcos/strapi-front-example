import type { Pagination } from '@/hookey'

export type Menu = {
    menuId: MenuId
    documentId: string // ID para hacer el GET
    name: string
    slug: string
    order: number
}

export type MenuId = number

export type MenuApiResult = {
    data: Menu
}

export type MenuPaginatedApiResult = {
    data: Menu[]
    count: number
}

export type MenuListApiParams = {
    locale: string
    page?: number
    pageSize?: number
}

export type MenuGetApiParams = {
    locale: string
    documentId: string
}
