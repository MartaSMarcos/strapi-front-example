import {
    GenreApiResult,
    GenreGetApiParams,
    GenreListApiParams,
    GenrePaginatedApiResult,
} from './genre.types'
import { query } from '@/common/query'

export const genreApi = {
    async list({
        locale,
        page = 1,
        pageSize = 10,
    }: GenreListApiParams): Promise<GenrePaginatedApiResult> {
        const url = `genres?locale=${locale}&sort=name:asc&populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
        console.debug(`Fetching genres from: ${url}`)
        const response = await query(url)
        return response
    },

    async get({
        locale,
        documentId,
    }: GenreGetApiParams): Promise<GenreApiResult> {
        const url = `genres/${documentId}?locale=${locale}&populate[movies][populate]=*&populate[tv_shows][populate]=*`
        console.debug(`Fetching genre details from: ${url}`)
        const response = await query(url)
        return response
    },
}
