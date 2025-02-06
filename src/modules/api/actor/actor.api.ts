import { query } from '@/common/query'
import {
    ActorListApiParams,
    ActorPaginatedApiResult,
    ActorGetApiParams,
    ActorApiResult,
} from './actor.types'

export const actorApi = {
    async list({
        locale,
        page = 1,
        pageSize = 10,
    }: ActorListApiParams): Promise<ActorPaginatedApiResult> {
        const url = `actors?locale=${locale}&sort=name:asc&populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
        console.debug(`Fetching actors from: ${url}`)
        const response = await query(url)
        return response
    },

    async get({
        locale,
        documentId,
    }: ActorGetApiParams): Promise<ActorApiResult> {
        const url = `actors/${documentId}?locale=${locale}&populate[movies][populate]=*&populate[tv_shows][populate]=*&populate[photo][populate]=*`
        console.debug(`Fetching actor details from: ${url}`)
        const response = await query(url)
        return response
    },
}
