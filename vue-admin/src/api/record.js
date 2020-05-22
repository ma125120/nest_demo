import http from '@/utils/http'

export const getList = (params) => http.get(`/record`, params)
export const create = (params) => http.post(`/record`, params)
export const get = (id) => http.get(`/record/${id}`)
export const del = (id) => http.delete(`/record/${id}`)

// export const getInfo = () => http.get(`/user/info`)
