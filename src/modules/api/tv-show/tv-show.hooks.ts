import { useQuery } from '@tanstack/react-query'
import { Pagination } from '@/hookey'
import { useApiContext } from '@/common/providers/api-context'
import { tvShowApi } from './tv-show.api'
import { TvShowGetApiParams } from './tv-show.types'

export const useTvShows = Pagination.makePaginationHook({
    cacheKey: 'tv-show-api-list',
    clientFn: tvShowApi.list,
    useApiContext: useApiContext,
    getCount: (data) => data.data.length,
    getPageData: (data) => data.data,
})

export const useTvShow = (params: TvShowGetApiParams) => {
    return useQuery({
        queryKey: ['tv-show-api-get', params],
        queryFn: async () => tvShowApi.get(params),
    })
}
