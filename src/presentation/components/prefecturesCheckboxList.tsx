import React from 'react'
import { PrefecturesData } from '../../domain/prefecture'
import { CheckboxListItem } from './checkboxListItem'
import { PrefecturesPopulationData } from '../../domain/prefecturesPopulation'

type Props = {
  selectedPrefCodeList: number[]
  prefecturesData: PrefecturesData
  prefecturesPopulationData: PrefecturesPopulationData
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
