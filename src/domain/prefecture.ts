import { ApiData } from '../presentation/hooks/useDataApiHook'

export type PrefecturesData = ApiData<Prefecture[]>

export type Prefecture = {
  prefCode: number
  prefName: string
}
