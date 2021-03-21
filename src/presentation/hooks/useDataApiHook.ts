import { useEffect, useState } from 'react'
import { fetchWithResasApiKey } from '../../infrastructure/fetchWithResasApiKey'

export const useDataApiHook = () => {
  const [data, setData] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false)
      setIsLoading(true)
      try {
        const result = await fetchWithResasApiKey()
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
