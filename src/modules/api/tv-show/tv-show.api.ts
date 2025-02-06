import {
    TvShowApiResult,
    TvShowGetApiParams,
    TvShowListApiParams,
    TvShowPaginatedApiResult,
} from './tv-show.types'
import { query } from '@/common/query'

export const tvShowApi = {
    async list({
        locale,
        page = 1,
        pageSize = 10,
    }: TvShowListApiParams): Promise<TvShowPaginatedApiResult> {
        const url = `tv-shows?locale=${locale}&sort=name:asc&populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
        console.debug(`Fetching tv shows from: ${url}`)
        const response = await query(url)
        return response
    },

    async get({
        locale,
        documentId,
    }: TvShowGetApiParams): Promise<TvShowApiResult> {
        const url = `tv-shows/${documentId}?locale=${locale}&populate[actors][populate]=*&populate[genres][populate]=*&populate[cover][populate]=*`
        console.debug(`Fetching tv show details from: ${url}`)
        const response = await query(url)
        return response
    },
}
