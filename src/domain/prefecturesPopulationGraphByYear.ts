import { PrefecturesPopulationData } from './prefecturesPopulation'
import { PrefecturesData } from './prefecture'

export type DataForPrefecturePopulationGraph = {
  year: number
  [prefName: string]: number
}[]

export function convertFromPrefecturesPopulationData({
  prefecturesPopulationData,
  prefecturesData,
  selectedPrefCodeList,
}: {
  prefecturesPopulationData: PrefecturesPopulationData
  prefecturesData: PrefecturesData
  selectedPrefCodeList: number[]
}): DataForPrefecturePopulationGraph {
  const selectedPrefCodeSet = new Set(selectedPrefCodeList)
  const selectedPrefecturesPopulationData = prefecturesPopulationData.data.filter((d) =>
    selectedPrefCodeSet.has(d.prefCode)
  )
  // TODO 実装途中
  console.log(prefecturesData, selectedPrefecturesPopulationData)
  return []
}

export function genYearsSortedInAsc(prefecturesPopulationData: PrefecturesPopulationData) {
  const allYears = prefecturesPopulationData.data.reduce((prevYears: number[], dataWithPrefCode): number[] => {
    const years = dataWithPrefCode.populations.reduce((py: number[], population): number[] => {
      return py.concat(population.year)
    }, [])
    return prevYears.concat(years)
  }, [])

  const sortedYears = Array.from(new Set(allYears).values()).sort((a, b) => a - b)
  return sortedYears
}
