import React from 'react'
import { Prefecture } from '../../domain/prefecture'
import { ApiData, ApiDataWithPrefCode } from '../hooks/useDataApiHook'
import { CheckboxListItem } from './checkboxListItem'
import { PrefecturesPopulation } from '../../domain/prefecturesPopulation'

type Props = {
  selectedPrefCodeList: number[]
  prefecturesData: ApiData<Prefecture[]>
  prefecturesPopulationData: ApiDataWithPrefCode<PrefecturesPopulation>
  handleChangeCheckbox: (prefCode: number) => void
}
export const PrefecturesCheckboxList = (props: Props) => {
  const { selectedPrefCodeList, prefecturesData, prefecturesPopulationData, handleChangeCheckbox } = props
  return (
    <>
      {prefecturesData.isLoading && <p>ロード中</p>}
      {!prefecturesData.isLoading && (
        <ul>
          {prefecturesData.data.map((prefecture, i) => {
            return (
              <CheckboxListItem
                key={i}
                {...{
                  itemName: prefecture.prefName,
                  isChecked: new Set(selectedPrefCodeList).has(prefecture.prefCode),
                  isDisabled: prefecturesPopulationData.isLoading,
                  handleChangeCheckbox: () => handleChangeCheckbox(prefecture.prefCode),
                }}
              />
            )
          })}
        </ul>
      )}
    </>
  )
}
