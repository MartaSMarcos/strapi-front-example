import { Actor } from './actor.types'
import { Cover } from './cover.types'
import { Genre } from './genre.types'

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
