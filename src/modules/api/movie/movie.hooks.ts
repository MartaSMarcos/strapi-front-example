import { useQuery } from '@tanstack/react-query'
import { Pagination } from '@/hookey'
import { useApiContext } from '@/common/providers/api-context'
import { movieApi } from './movie.api'
import { MovieGetApiParams } from './movie.types'

export const useMovies = Pagination.makePaginationHook({
    cacheKey: 'movie-api-list',
    clientFn: movieApi.list,
    useApiContext: useApiContext,
    getCount: (data) => data.data.length,
    getPageData: (data) => data.data,
})

export const useMovie = (params: MovieGetApiParams) => {
    return useQuery({
        queryKey: ['movie-api-get', params],
        queryFn: async () => movieApi.get(params),
    })
}
