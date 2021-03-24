import { fetchWithResasApiKey } from './fetchWithResasApiKey'
import { Population, PrefecturesPopulation } from '../domain/prefecturesPopulation'

type PrefecturesPopulationResponse = {
  message: null | string // おそらく
  result: {
    boundaryYear: number
    data: {
      label: string
      data: {
        year: number
        value: number
      }[]
    }[]
  }
}

export async function fetchPrefecturesPopulation(prefCode: number): Promise<PrefecturesPopulation> {
  return await fetchWithResasApiKey(
    `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${'' + prefCode}`
  ).then((result: PrefecturesPopulationResponse) => extractPrefecturesPopulation(result))
}

export function extractPrefecturesPopulation(response: PrefecturesPopulationResponse): PrefecturesPopulation {
  const populations = response.result.data.reduce((prevD1: Population[], d1): Population[] => {
    if (d1.label === '総人口') {
      return d1.data
    }
    return prevD1
  }, [])
  // 関数の挙動を簡単化するため, この時点で空配列だったらエラーとして扱う
  if (populations.length === 0) {
    throw new Error()
  }
  return { populations }
}
