import { Prefecture } from '../domain/prefecture'
import { fetchWithResasApiKey } from './fetchWithResasApiKey'

export async function fetchPrefectures(): Promise<Prefecture[]> {
  // TODO url文字列の作成部分を外に逃がす
  return await fetchWithResasApiKey('https://opendata.resas-portal.go.jp/api/v1/prefectures').then(
    (result: { result: Prefecture[] }) => result.result
  )
}
