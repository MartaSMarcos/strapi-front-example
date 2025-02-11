import { MenuApiResult, MenuGetApiParams } from './menu.types'
import { query } from '@/common/query'

export const menuApi = {
    // async list({
    //     locale,
    //     page = 1,
    //     pageSize = 10,
    // }: MenuListApiParams): Promise<MenuPaginatedApiResult> {
    //     const url = `menus?locale=${locale}&sort=order:asc&populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
    //     console.debug(`Fetching menu from: ${url}`)
    //     const response = await query(url)
    //     return response
    // },

    async get({ locale }: MenuGetApiParams): Promise<MenuApiResult> {
        const url = `menu?locale=${locale}&populate[items][populate]=*`
        console.debug(`Fetching menu details from: ${url}`)
        const response = await query(url)
        return response
    },
}
