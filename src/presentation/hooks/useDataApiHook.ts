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

export type ApiDataWithPrefCode<T> = {
  data: DataWithPrefCode<T>[]
  isLoading: boolean
  isError: boolean
}

type DataWithPrefCode<T> = T & {
  prefCode: number
}

export const useDataApiWithPrefCodeHook = <T>(
  initialData: DataWithPrefCode<T>[],
  getData: (prefCode: number) => Promise<T>
): [ApiDataWithPrefCode<T>, (currentPrefCode: number) => void] => {
  const [data, setData] = useState<DataWithPrefCode<T>[]>(initialData)
  const [currentPrefCode, setCurrentPrefCode] = useState<number>(NaN)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false)
      setIsLoading(true)
      try {
        const result = await getData(currentPrefCode)
        const nextData = data.concat({
          ...result,
          prefCode: currentPrefCode,
        })
        setData(nextData)
      } catch (error) {
        setIsError(true)
      }
      setIsLoading(false)
    }
    const shouldFetchData = !isNaN(currentPrefCode) && !new Set(data.map((d) => d.prefCode)).has(currentPrefCode)
    if (shouldFetchData) {
      fetchData()
    }
  }, [currentPrefCode])

  const apiData: ApiDataWithPrefCode<T> = { data, isLoading, isError }

  return [apiData, setCurrentPrefCode]
}
