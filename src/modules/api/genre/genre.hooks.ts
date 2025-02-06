import { useQuery } from '@tanstack/react-query'
import { Pagination } from '@/hookey'
import { useApiContext } from '@/common/providers/api-context'
import { genreApi } from './genre.api'
import { GenreGetApiParams } from './genre.types'

export const useGenres = Pagination.makePaginationHook({
    cacheKey: 'genre-api-list',
    clientFn: genreApi.list,
    useApiContext: useApiContext,
    getCount: (data) => data.data.length,
    getPageData: (data) => data.data,
})

export const useGenre = (params: GenreGetApiParams) => {
    return useQuery({
        queryKey: ['genre-api-get', params],
        queryFn: async () => genreApi.get(params),
    })
}
