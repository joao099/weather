import useSWR from 'swr'
import axios from 'axios'

export function useFetch<Data = any, Error = any>(url: string) {
  const { data, error, mutate } = useSWR<Data, Error>(url, async url => {
    const response = await axios.get(url)
    return response.data
  })

  return { data, error, mutate }
}
