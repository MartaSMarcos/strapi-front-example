import { useQuery } from '@tanstack/react-query'
import { Pagination } from '@/hookey'
import { useApiContext } from '@/common/providers/api-context'
import { actorApi } from './actor.api'
import { ActorGetApiParams } from './actor.types'

export const useActors = Pagination.makePaginationHook({
    cacheKey: 'actor-api-list',
    clientFn: actorApi.list,
    useApiContext: useApiContext,
    getCount: (data) => data.data.length,
    getPageData: (data) => data.data,
})

export const useActor = (params: ActorGetApiParams) => {
    return useQuery({
        queryKey: ['actor-api-get', params],
        queryFn: async () => actorApi.get(params),
    })
}
