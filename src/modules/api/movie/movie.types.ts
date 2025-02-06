import { Actor } from '@/types/actor.types'
import { Cover } from '@/types/cover.types'
import { Genre } from '@/types/genre.types'

export type Movie = {
    movieId: MovieId
    documentId: string // ID para hacer el GET
    name: string
    year?: number
    cover?: Pick<Cover, 'url'>
    slug: string
    description?: string
    actors?: Actor[]
    genres?: Genre[]
}

export type MovieId = number

export type MovieApiResult = {
    data: Movie
}

export type MoviePaginatedApiResult = {
    data: Movie[]
    meta: { pagination: { total: number; page: number; pageSize: number } }
}

export type MovieListApiParams = {
    locale: string
    page?: number
    pageSize?: number
}

export type MovieGetApiParams = {
    locale: string
    documentId: string
}
