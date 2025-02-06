import { useQuery } from '@tanstack/react-query'
import { Pagination } from '@/hookey'
import { useApiContext } from '@/common/providers/api-context'
import { menuApi } from './menu.api'
import { MenuGetApiParams } from './menu.types'

export const useMenus = Pagination.makePaginationHook({
    cacheKey: 'menu-api-list',
    clientFn: menuApi.list,
    useApiContext: useApiContext,
    getCount: (data) => data.data.length,
    getPageData: (data) => data.data,
})

export const useMenu = (params: MenuGetApiParams) => {
    return useQuery({
        queryKey: ['menu-api-get', params],
        queryFn: async () => menuApi.get(params),
    })
}
