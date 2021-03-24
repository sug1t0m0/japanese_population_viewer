import React from 'react'
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'
import { PrefecturesData } from '../../domain/prefecture'
import { PrefecturesPopulationData } from '../../domain/prefecturesPopulation'
import { genDataForPrefecturePopulationGraph } from '../../domain/prefecturesPopulationGraphByYear'
import { defaultProps, UiStackWrapper } from './uiStackWrapper'

type Props = {
  selectedPrefCodeList: number[]
  prefecturesData: PrefecturesData
  prefecturesPopulationData: PrefecturesPopulationData
  colors: string[]
}

export const PrefecturesPopulationGraphByYear = (props: Props) => {
  const [data, selectedPrefNames] = genDataForPrefecturePopulationGraph(props)

  return (
    <UiStackWrapper
      {...{
        ...defaultProps,
        isError: props.prefecturesPopulationData.isError || props.prefecturesData.isError,
        isLoading: props.prefecturesPopulationData.isLoading || props.prefecturesData.isLoading,
        isBlank: props.selectedPrefCodeList.length === 0,
        loadingComponent: <p>ロード中</p>,
        blankComponent: <p>人口を表示する県を選択してください</p>,
        idealComponent: (
          <LineChart width={730} height={250} data={data} margin={{ top: 5, right: 30, left: 50, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" unit="年" />
            <YAxis unit="人" />
            <Tooltip />
            <Legend />
            {selectedPrefNames.map((selectedPrefName, i) => (
              <Line key={i} dataKey={selectedPrefName} stroke={props.colors[i % props.colors.length]} />
            ))}
          </LineChart>
        ),
      }}
    />
  )
}
