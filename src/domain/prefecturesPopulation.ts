import { ApiDataWithPrefCode } from '../presentation/hooks/useDataApiWithPrefCodeHook'

export type PrefecturesPopulationData = ApiDataWithPrefCode<PrefecturesPopulation>

export type PrefecturesPopulation = {
  populations: Population[]
}

export type Population = {
  year: number
  value: number
}
