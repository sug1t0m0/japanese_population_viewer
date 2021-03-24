import React from 'react'
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'
import { PrefecturesData } from '../../domain/prefecture'
import { PrefecturesPopulationData } from '../../domain/prefecturesPopulation'
import { convertFromPrefecturesPopulationData } from '../../domain/prefecturesPopulationGraphByYear'
import { defaultProps, UiStackWrapper } from './uiStackWrapper'

type Props = {
  selectedPrefCodeList: number[]
  prefecturesData: PrefecturesData
  prefecturesPopulationData: PrefecturesPopulationData
}

export const PrefecturesPopulationGraphByYear = (props: Props) => {
  const [data, selectedPrefNames] = convertFromPrefecturesPopulationData(props)

  // TODO グラフコンポーネントが増えるようなら, useContext で各コンポーネントに配りたい
  const colors = ['#C55859', '#F08C57', '#F2DA48', '#48C176', '#4C9CD7', '#8A69B6']

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
              <Line key={i} dataKey={selectedPrefName} stroke={colors[i % colors.length]} />
            ))}
          </LineChart>
        ),
      }}
    />
  )
}
