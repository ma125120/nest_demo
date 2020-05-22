import http from '@/utils/http'

export const getList = (params) => http.get(`/projectCate`, params)
export const create = (params) => http.post(`/projectCate`, params)
export const get = (id) => http.get(`/projectCate/${id}`)
export const del = (id) => http.delete(`/projectCate/${id}`)

// export const getInfo = () => http.get(`/user/info`)
