import { convertPrefCodeIntoPrefName } from './prefecture'

const samplePrefecturesData = {
  data: [
    {
      prefCode: 0,
      prefName: '新潟県',
    },
    {
      prefCode: 1,
      prefName: '山形県',
    },
  ],
  isLoading: false,
  isError: false,
}

describe('convertPrefCodeIntoPrefName', () => {
  describe('prevCode が PrefecturesData に入っていること', () => {
    it('都道府県名が返ってくること', () => {
      expect(convertPrefCodeIntoPrefName(1, samplePrefecturesData)).toEqual('山形県')
    })
  })
  describe('prevCode が PrefecturesData に入っていない', () => {
    it('空文字列が返ってこないこと', () => {
      expect(convertPrefCodeIntoPrefName(3, samplePrefecturesData)).toEqual('')
    })
  })
})
