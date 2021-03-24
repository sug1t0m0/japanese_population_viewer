import { PrefecturesPopulationData } from './prefecturesPopulation'
import { PrefecturesData } from './prefecture'

export type DataForPrefecturePopulationGraph = {
  year: number
  [prefName: string]: number | null
}

export function convertFromPrefecturesPopulationData({
  prefecturesPopulationData,
  selectedPrefCodeList,
}: {
  prefecturesPopulationData: PrefecturesPopulationData
  selectedPrefCodeList: number[]
}): [DataForPrefecturePopulationGraph[], string[]] {
  const selectedPrefCodeSet = new Set(selectedPrefCodeList)
  const selectedPrefecturesPopulationData = {
    // 処理の都合に合わせて型を作りたくなかったので、PrefecturesPopulationData として整合性を保つために追加
    ...prefecturesPopulationData,
    data: prefecturesPopulationData.data.filter((d) => selectedPrefCodeSet.has(d.prefCode)),
  }
  const years = genYearsSortedInAsc(selectedPrefecturesPopulationData)

  const dataListForPrefecturePopulationGraph = years.map((year) => {
    return selectedPrefecturesPopulationData.data.reduce(
      (dataForPrefecturePopulationGraph: DataForPrefecturePopulationGraph, d) => {
        const targetPopulation = d.populations.find((population) => population.year === year)
        const value = targetPopulation ? targetPopulation.value : null
        return Object.assign(dataForPrefecturePopulationGraph, {
          [d.prefName]: value,
        })
      },
      { year }
    )
  })

  const selectedPrefNames = selectedPrefCodeList.map((selectedPrefCode) => {
    const targetPopulationData = prefecturesPopulationData.data.find((d) => d.prefCode === selectedPrefCode)
    return targetPopulationData ? targetPopulationData.prefName : ''
  })
  return [dataListForPrefecturePopulationGraph, selectedPrefNames]
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

export function convertPrefCodeIntoPrefName(prefCode: number, prefecturesData: PrefecturesData): string {
  const targetData = prefecturesData.data.find((d) => d.prefCode === prefCode)
  return targetData ? targetData.prefName : ''
}
