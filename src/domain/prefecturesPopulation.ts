import { ApiDataWithPrefInfo } from '../presentation/hooks/useDataApiWithPrefInfoHook'

export type PrefecturesPopulationData = ApiDataWithPrefInfo<PrefecturesPopulation>

export type PrefecturesPopulation = {
  populations: Population[]
}

export type Population = {
  year: number
  value: number
}
