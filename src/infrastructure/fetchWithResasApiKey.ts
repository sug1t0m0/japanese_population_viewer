export async function fetchWithResasApiKey() {
  // TODO url文字列の作成部分を外に逃がす
  return await fetch('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
    headers: {
      'X-API-KEY': process.env.REACT_APP_RESAS_API_KEY || '',
    },
  }).then((response) => response.json())
}
