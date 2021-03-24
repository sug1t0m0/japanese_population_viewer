import { useEffect, useState } from 'react'
import { convertPrefCodeIntoPrefName } from '../../domain/prefecturesPopulationGraphByYear'
import { PrefecturesData } from '../../domain/prefecture'

export type ApiDataWithPrefInfo<T> = {
  data: DataWithPrefInfo<T>[]
  isLoading: boolean
  isError: boolean
}

type DataWithPrefInfo<T> = T & {
  prefCode: number
  prefName: string
}

export const useDataApiWithPrefInfoHook = <T>(
  initialData: DataWithPrefInfo<T>[],
  getData: (prefCode: number) => Promise<T>,
  prefecturesData: PrefecturesData
): [ApiDataWithPrefInfo<T>, (currentPrefCode: number) => void] => {
  const [data, setData] = useState<DataWithPrefInfo<T>[]>(initialData)
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
          prefName: convertPrefCodeIntoPrefName(currentPrefCode, prefecturesData),
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

  const apiData: ApiDataWithPrefInfo<T> = { data, isLoading, isError }

  return [apiData, setCurrentPrefCode]
}
