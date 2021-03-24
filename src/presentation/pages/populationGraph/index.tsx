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
import { useDataApiWithPrefCodeHook } from '../../hooks/useDataApiWithPrefCodeHook'
import { PrefecturesPopulationGraphByYear } from '../../components/prefecturesPopulationGraphByYear'

const PopulationGraphPage: React.FunctionComponent = () => {
  const [prefecturesData] = useDataApiHook<Prefecture[]>([], fetchPrefectures)
  const [prefecturesPopulationData, setCurrentPrefCode] = useDataApiWithPrefCodeHook<PrefecturesPopulation>(
    [],
    fetchPrefecturesPopulation
  )
  const [selectedPrefCodeList, setSelectedPrefCodeList] = useState<number[]>([])

  const handleChangeCheckbox = (prefCode: number) => {
    if (new Set(selectedPrefCodeList).has(prefCode)) {
      setCurrentPrefCode(NaN)
      setSelectedPrefCodeList(selectedPrefCodeList.filter((pc) => pc !== prefCode))
    } else {
      setCurrentPrefCode(prefCode)
      setSelectedPrefCodeList(selectedPrefCodeList.concat(prefCode))
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
