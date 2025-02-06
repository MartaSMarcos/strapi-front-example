import type { Pagination } from '@/hookey'
import { Actor } from '@/types/actor.types'
import { Cover } from '@/types/cover.types'
import { Genre } from '@/types/genre.types'

export type TvShow = {
    tvShowId: TvShowId
    documentId: string
    name: string
    releaseYear?: number
    endYear?: number
    description?: string
    slug: string
    cover?: Pick<Cover, 'url'>
    actors?: Actor[]
    genres?: Genre[]
}

export type TvShowId = number

export type TvShowApiResult = {
    data: TvShow
}

export type TvShowPaginatedApiResult = {
    data: TvShow[]
    meta: { pagination: { total: number; page: number; pageSize: number } }
}

export type TvShowListApiParams = {
    locale: string
    page?: number
    pageSize?: number
}

export type TvShowGetApiParams = {
    locale: string
    documentId: string
}
