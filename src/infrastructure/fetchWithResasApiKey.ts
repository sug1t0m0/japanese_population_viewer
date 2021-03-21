export async function fetchWithResasApiKey(url: string) {
  return await fetch(url, {
    headers: {
      'X-API-KEY': process.env.REACT_APP_RESAS_API_KEY || '',
    },
  }).then((response) => response.json())
}
