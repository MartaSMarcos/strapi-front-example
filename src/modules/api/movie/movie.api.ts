import {
    MovieApiResult,
    MovieGetApiParams,
    MovieListApiParams,
    MoviePaginatedApiResult,
} from './movie.types'
import { query } from '@/common/query'

export const movieApi = {
    async list({
        locale,
        page = 1,
        pageSize = 10,
    }: MovieListApiParams): Promise<MoviePaginatedApiResult> {
        const url = `movies?locale=${locale}&sort=name:asc&populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
        console.debug(`Fetching movies from: ${url}`)
        const response = await query(url)
        return response
    },

    async get({
        locale,
        documentId,
    }: MovieGetApiParams): Promise<MovieApiResult> {
        const url = `movies/${documentId}?locale=${locale}&populate[actors][populate]=*&populate[genres][populate]=*&populate[cover][populate]=*`
        console.debug(`Fetching movie details from: ${url}`)
        const response = await query(url)
        return response
    },
}
