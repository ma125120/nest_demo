import http from '@/utils/http'

export const getJobList = (params) => http.get(`/job`, params)
export const create = (params) => http.post(`/job`, params)
export const get = (id) => http.get(`/job/${id}`)
export const del = (id) => http.delete(`/job/${id}`)

// export const getInfo = () => http.get(`/user/info`)
