import { Cover } from './cover.types'
import { Movie } from './movie.types'
import { TvShow } from './tv-show.types'

export type Actor = {
    actorId: ActorId
    documentId: string //Id para hacer el get
    name: string
    birthdate?: Date
    biography?: string
    slug: string
    photo?: Pick<Cover, 'url'>
    movies?: Movie[]
    shows?: TvShow[]
}

// TODO: Set the id type
export type ActorId = number
