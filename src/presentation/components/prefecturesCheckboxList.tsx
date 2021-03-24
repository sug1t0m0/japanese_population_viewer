import React from 'react'
import { PrefecturesData } from '../../domain/prefecture'
import { CheckboxListItem } from './checkboxListItem'
import { PrefecturesPopulationData } from '../../domain/prefecturesPopulation'
import { defaultProps, UiStackWrapper } from './uiStackWrapper'

type Props = {
  selectedPrefCodeList: number[]
  prefecturesData: PrefecturesData
  prefecturesPopulationData: PrefecturesPopulationData
  handleChangeCheckbox: (prefCode: number) => void
}
export const PrefecturesCheckboxList = (props: Props) => {
  const { selectedPrefCodeList, prefecturesData, prefecturesPopulationData, handleChangeCheckbox } = props
  return (
    <UiStackWrapper
      {...{
        ...defaultProps,
        isError: props.prefecturesPopulationData.isError || props.prefecturesData.isError,
        isLoading: props.prefecturesData.isLoading,
        loadingComponent: <p>ロード中</p>,
        idealComponent: (
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
        ),
      }}
    />
  )
}
