import { useEffect, useState } from 'react'

export const useDataApiHook = <T>(initialData: T, getData: () => Promise<T>) => {
  const [data, setData] = useState<T>(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

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
  return [{ data, isLoading, isError }]
}
