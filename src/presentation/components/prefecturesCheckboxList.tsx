import React from 'react'
import { Prefecture } from '../../domain/prefecture'
import { ApiData } from '../hooks/useDataApiHook'
import { CheckboxListItem } from './CheckboxListItem'

type Props = {
  prefecturesData: ApiData<Prefecture[]>
}
export const PrefecturesCheckboxList = (props: Props) => {
  const { prefecturesData } = props
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
                  isChecked: false,
                  handleChangeCheckbox: () => {
                    console.log('toggled')
                  },
                }}
              />
            )
          })}
        </ul>
      )}
    </>
  )
}
