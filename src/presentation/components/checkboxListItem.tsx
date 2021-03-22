/** @jsxImportSource @emotion/react */
import React from 'react'
import { css } from '@emotion/react'

type Props = {
  itemName: string
  isChecked: boolean
  handleChangeCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export const CheckboxListItem = (props: Props) => {
  return (
    <li css={outerStyle}>
      <input
        type="checkbox"
        id="scales"
        name="scales"
        checked={props.isChecked}
        onChange={props.handleChangeCheckbox}
      />
      <div>{props.itemName}</div>
    </li>
  )
}

const outerStyle = css({
  display: 'flex',
})
