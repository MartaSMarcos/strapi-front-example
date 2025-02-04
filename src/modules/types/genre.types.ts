import { Movie } from './movie.types'
import { TvShow } from './tv-show.types'

export type Genre = {
    genreId: GenreId
    documentId: string
    name: string
    slug: string
    movies?: Movie[]
    shows?: TvShow[]
}

export type GenreId = number
