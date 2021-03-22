import { useEffect, useState } from 'react'

export type ApiData<T> = {
  data: T
  isLoading: boolean
  isError: boolean
}

export const useDataApiHook = <T>(initialData: T, getData: () => Promise<T>) => {
  const [data, setData] = useState<T>(initialData)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false)
      setIsLoading(true)
      try {
        const result = await getData()
        setData(result)
      } catch (error) {
        setIsError(true)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [])

  const apiData: ApiData<T> = { data, isLoading, isError }
  return [apiData]
}
