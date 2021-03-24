import React from 'react'

type Props = {
  isError: boolean
  isLoading: boolean
  isBlank: boolean
  isPartial: boolean
  errorComponent: React.ReactNode
  loadingComponent: React.ReactNode
  blankComponent: React.ReactNode
  idealComponent: React.ReactNode
  partialComponent: React.ReactNode
}

export const defaultProps: Props = {
  isError: false,
  isLoading: false,
  isBlank: false,
  isPartial: false,
  errorComponent: null,
  loadingComponent: null,
  blankComponent: null,
  idealComponent: null,
  partialComponent: null,
}

export const UiStackWrapper = (props: Props) => {
  let state
  if (props.isError) {
    state = 'error'
  } else if (props.isLoading) {
    state = 'loading'
  } else if (props.isBlank) {
    state = 'blank'
  } else if (props.isPartial) {
    state = 'partial'
  } else {
    state = 'ideal'
  }

  return (
    <>
      {state === 'error' && props.errorComponent}
      {state === 'loading' && props.loadingComponent}
      {state === 'blank' && props.blankComponent}
      {state === 'partial' && props.partialComponent}
      {state === 'ideal' && props.idealComponent}
    </>
  )
}
