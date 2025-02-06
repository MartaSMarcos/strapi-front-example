import { Movie } from '../movie'
import { Cover } from '@/types/cover.types'
import { TvShow } from '../tv-show'

export type Actor = {
    actorId: ActorId
    documentId: string //Id para hacer el get
    name: string
    birthdate?: Date
    biography?: string
    slug: string
    photo?: Pick<Cover, 'url'>
    movies?: Movie[]
    tv_shows?: TvShow[]
}

export type ActorId = number

export type ActorApiResult = {
    data: Actor
}

export type ActorPaginatedApiResult = {
    data: Actor[]
    meta: { pagination: { total: number; page: number; pageSize: number } }
}

export type ActorListApiParams = {
    locale: string
    page?: number
    pageSize?: number
}

export type ActorGetApiParams = {
    locale: string
    documentId: string
}
