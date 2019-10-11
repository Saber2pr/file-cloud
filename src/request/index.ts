import { axios } from "./axios"
import { origin } from "./api"

export const request = async <T = any>(path: string) => {
  const res = await axios.get<T>(path)
  return res.data
}

export const fetchFileData = () => request<string[]>(origin.server)

export const postFileData = (data: string, path: string) =>
  fetch(encodeURI(origin.server + path), {
    method: "POST",
    body: data
  })

export const deleteFileData = (path: string) =>
  fetch(encodeURI(origin.server + path), {
    method: "DELETE"
  })
