import { Actor } from './actor.types'
import { Cover } from './cover.types'
import { Genre } from './genre.types'

export type Movie = {
    movieId: MovieId
    documentId: string //Id para hacer el get
    name: string
    year?: number
    cover?: Pick<Cover, 'url'>
    slug: string
    description?: string
    actors?: Actor[]
    genres?: Genre[]
}

export type MovieId = number
