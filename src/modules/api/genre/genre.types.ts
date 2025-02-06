import type { Pagination } from '@/hookey'
import { Movie } from '../movie'
import { TvShow } from '../tv-show'

export type Genre = {
    genreId: GenreId
    documentId: string
    name: string
    slug: string
    movies?: Movie[]
    tv_shows?: TvShow[]
}

export type GenreId = number

export type GenreApiResult = {
    data: Genre
}

export type GenrePaginatedApiResult = {
    data: Genre[]
    meta: { pagination: { total: number; page: number; pageSize: number } }
}

export type GenreListApiParams = {
    locale: string
    page?: number
    pageSize?: number
}

export type GenreGetApiParams = {
    locale: string
    documentId: string
}
