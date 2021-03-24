/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
import DesktopTemplate from '../../templates/desktop'
import { css } from '@emotion/react'
import { useDataApiHook } from '../../hooks/useDataApiHook'
import { Prefecture } from '../../../domain/prefecture'
import { fetchPrefectures } from '../../../infrastructure/fetchPrefectures'
import { PrefecturesCheckboxList } from '../../components/prefecturesCheckboxList'
import { PrefecturesPopulation } from '../../../domain/prefecturesPopulation'
import { fetchPrefecturesPopulation } from '../../../infrastructure/fetchPrefecturesPopulation'
import { useDataApiWithPrefInfoHook } from '../../hooks/useDataApiWithPrefInfoHook'
import { PrefecturesPopulationGraphByYear } from '../../components/prefecturesPopulationGraphByYear'

const PopulationGraphPage: React.FunctionComponent = () => {
  // TODO グラフコンポーネントが増えるようなら, useContext で各コンポーネントに配りたい
  const LINE_GRAPH_COLORS = ['#C55859', '#F08C57', '#F2DA48', '#48C176', '#4C9CD7', '#8A69B6']

  const [prefecturesData] = useDataApiHook<Prefecture[]>([], fetchPrefectures)
  const [prefecturesPopulationData, setCurrentPrefCode] = useDataApiWithPrefInfoHook<PrefecturesPopulation>(
    [],
    fetchPrefecturesPopulation,
    prefecturesData
  )
  const [selectedPrefCodeList, setSelectedPrefCodeList] = useState<number[]>([])

  const handleChangeCheckbox = (prefCode: number) => {
    if (new Set(selectedPrefCodeList).has(prefCode)) {
      setCurrentPrefCode(NaN)
      setSelectedPrefCodeList(selectedPrefCodeList.filter((pc) => pc !== prefCode))
    } else {
      if (selectedPrefCodeList.length < LINE_GRAPH_COLORS.length) {
        setCurrentPrefCode(prefCode)
        setSelectedPrefCodeList(selectedPrefCodeList.concat(prefCode))
      } else {
        alert(`選択できる都道府県は${LINE_GRAPH_COLORS.length}件までです。`)
      }
    }
  }

  return (
    <DesktopTemplate>
      <div css={OuterStyle}>
        <div css={leftContainerStyle}>
          <PrefecturesCheckboxList
            {...{
              selectedPrefCodeList,
              prefecturesData,
              prefecturesPopulationData,
              handleChangeCheckbox,
            }}
          />
        </div>
        <div css={rightContainerStyle}>
          <PrefecturesPopulationGraphByYear
            {...{
              selectedPrefCodeList,
              prefecturesData,
              prefecturesPopulationData,
              colors: LINE_GRAPH_COLORS,
            }}
          />
        </div>
      </div>
    </DesktopTemplate>
  )
}

export default PopulationGraphPage

const OuterStyle = css({
  display: 'flex',
})
const leftContainerStyle = css({
  width: '30%',
})

const rightContainerStyle = css({
  width: '70%',
})
