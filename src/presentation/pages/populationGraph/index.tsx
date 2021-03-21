/** @jsxImportSource @emotion/react */
import React from 'react'
import DesktopTemplate from '../../templates/desktop'
import { css } from '@emotion/react'

const PopulationGraphPage: React.FunctionComponent = () => {
  return (
    <DesktopTemplate>
      <div css={OuterStyle}>
        <div css={leftContainerStyle}>都道府県のチェックボックスリスト</div>
        <div css={rightContainerStyle}>チェックボックスリストの状態に応じたグラフ</div>
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
