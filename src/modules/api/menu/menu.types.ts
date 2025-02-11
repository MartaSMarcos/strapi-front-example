export type Menu = {
    menuId: MenuId
    documentId: string // ID para hacer el GET
    name: string
    descriptionBlocks: DescriptionBlocks[]
    items: Item[]
}

export type MenuId = number

export type DescriptionBlocks = {
    type: string
    children: { type: string; text: string }[]
}

export type Item = {
    name: string
    order: number
    slug: string
    subitems: Subitem[]
}

export type Subitem = {
    name: string
    order: string
    slug: string
}

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
    documentId?: string
}
