import { ApiData } from '../presentation/hooks/useDataApiHook'

export type PrefecturesData = ApiData<Prefecture[]>

export type Prefecture = {
  prefCode: number
  prefName: string
}

export function convertPrefCodeIntoPrefName(prefCode: number, prefecturesData: PrefecturesData): string {
  const targetData = prefecturesData.data.find((d) => d.prefCode === prefCode)
  return targetData ? targetData.prefName : ''
}
