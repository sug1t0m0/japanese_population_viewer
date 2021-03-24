import React from 'react'
import { render, screen } from '@testing-library/react'
import { defaultProps, UiStackWrapper } from './uiStackWrapper'

describe('UiStackWrapper', () => {
  describe('エラー状態の場合', () => {
    it('エラーコンポーネントがレンダリングされること', () => {
      render(
        <UiStackWrapper
          {...{
            ...defaultProps,
            isError: true,
            isLoading: true,
            errorComponent: <p>error</p>,
            loadingComponent: <p>loading</p>,
            blankComponent: <p>blank</p>,
            partialComponent: <p>partial</p>,
            idealComponent: <p>ideal</p>,
          }}
        />
      )
      const linkElement = screen.getByText(/error/)
      const loadingElement = screen.queryByText(/loading/)
      const blankElement = screen.queryByText(/blank/)
      const partialElement = screen.queryByText(/partial/)
      const idealElement = screen.queryByText(/ideal/)

      expect(linkElement).toBeInTheDocument()
      expect(loadingElement).toBeNull()
      expect(blankElement).toBeNull()
      expect(partialElement).toBeNull()
      expect(idealElement).toBeNull()
    })
  })
  describe('ローディング状態の場合', () => {
    it('ローディングコンポーネントのみがレンダリングされること', () => {
      render(
        <UiStackWrapper
          {...{
            ...defaultProps,
            isLoading: true,
            isBlank: true,
            errorComponent: <p>error</p>,
            loadingComponent: <p>loading</p>,
            blankComponent: <p>blank</p>,
            partialComponent: <p>partial</p>,
            idealComponent: <p>ideal</p>,
          }}
        />
      )
      const errorElement = screen.queryByText(/error/)
      const loadingElement = screen.getByText(/loading/)
      const blankElement = screen.queryByText(/blank/)
      const partialElement = screen.queryByText(/partial/)
      const idealElement = screen.queryByText(/ideal/)

      expect(errorElement).toBeNull()
      expect(loadingElement).toBeInTheDocument()
      expect(blankElement).toBeNull()
      expect(partialElement).toBeNull()
      expect(idealElement).toBeNull()
    })
  })
  describe('ブランク状態の場合', () => {
    it('ブランクコンポーネントのみがレンダリングされること', () => {
      render(
        <UiStackWrapper
          {...{
            ...defaultProps,
            isBlank: true,
            isPartial: true,
            errorComponent: <p>error</p>,
            loadingComponent: <p>loading</p>,
            blankComponent: <p>blank</p>,
            partialComponent: <p>partial</p>,
            idealComponent: <p>ideal</p>,
          }}
        />
      )
      const errorElement = screen.queryByText(/error/)
      const loadingElement = screen.queryByText(/loading/)
      const blankElement = screen.getByText(/blank/)
      const partialElement = screen.queryByText(/partial/)
      const idealElement = screen.queryByText(/ideal/)

      expect(errorElement).toBeNull()
      expect(loadingElement).toBeNull()
      expect(blankElement).toBeInTheDocument()
      expect(partialElement).toBeNull()
      expect(idealElement).toBeNull()
    })
  })
  describe('部分達成(Partial)状態の場合', () => {
    it('部分達成(Partial)コンポーネントのみがレンダリングされること', () => {
      render(
        <UiStackWrapper
          {...{
            ...defaultProps,
            isPartial: true,
            errorComponent: <p>error</p>,
            loadingComponent: <p>loading</p>,
            blankComponent: <p>blank</p>,
            partialComponent: <p>partial</p>,
            idealComponent: <p>ideal</p>,
          }}
        />
      )
      const errorElement = screen.queryByText(/error/)
      const loadingElement = screen.queryByText(/loading/)
      const blankElement = screen.queryByText(/blank/)
      const partialElement = screen.getByText(/partial/)
      const idealElement = screen.queryByText(/ideal/)

      expect(errorElement).toBeNull()
      expect(loadingElement).toBeNull()
      expect(blankElement).toBeNull()
      expect(partialElement).toBeInTheDocument()
      expect(idealElement).toBeNull()
    })
  })
  describe('理想(Ideal)状態の場合', () => {
    it('理想(ideal)コンポーネントのみがレンダリングされること', () => {
      render(
        <UiStackWrapper
          {...{
            ...defaultProps,
            isPartial: false,
            errorComponent: <p>error</p>,
            loadingComponent: <p>loading</p>,
            blankComponent: <p>blank</p>,
            partialComponent: <p>partial</p>,
            idealComponent: <p>ideal</p>,
          }}
        />
      )
      const errorElement = screen.queryByText(/error/)
      const loadingElement = screen.queryByText(/loading/)
      const blankElement = screen.queryByText(/blank/)
      const partialElement = screen.queryByText(/partial/)
      const idealElement = screen.getByText(/ideal/)

      expect(errorElement).toBeNull()
      expect(loadingElement).toBeNull()
      expect(blankElement).toBeNull()
      expect(partialElement).toBeNull()
      expect(idealElement).toBeInTheDocument()
    })
  })
})
