import http from '@/utils/http'

export const getList = (params) => http.get(`/cateResource`, params)
export const getListByCate = (params) => http.get(`/cateResource/cate`, params)

export const create = (params) => http.post(`/cateResource`, params)
export const updateMany = (params) => http.post(`/cateResource/many`, params)
export const get = (id) => http.get(`/cateResource/${id}`)
export const del = (id) => http.delete(`/cateResource/${id}`)

// export const getInfo = () => http.get(`/user/info`)
