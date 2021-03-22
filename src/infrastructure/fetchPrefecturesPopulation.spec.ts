import { extractPrefecturesPopulation } from './fetchPrefecturesPopulation'

const populations = [
  {
    year: 1980,
    value: 12817,
  },
  {
    year: 1985,
    value: 12707,
  },
  {
    year: 1990,
    value: 12571,
  },
  {
    year: 1995,
    value: 12602,
  },
  {
    year: 2000,
    value: 12199,
  },
  {
    year: 2005,
    value: 11518,
  },
  {
    year: 2010,
    value: 10888,
  },
  {
    year: 2015,
    value: 10133,
  },
  {
    year: 2020,
    value: 9275,
  },
  {
    year: 2025,
    value: 8431,
  },
  {
    year: 2030,
    value: 7610,
  },
  {
    year: 2035,
    value: 6816,
  },
  {
    year: 2040,
    value: 6048,
  },
  {
    year: 2045,
    value: 5324,
  },
]

const sampleResponce = {
  message: null,
  result: {
    boundaryYear: 2015,
    data: [
      {
        label: '総人口',
        data: populations,
      },
    ],
  },
}

describe('extractPrefecturesPopulation', () => {
  describe('総人口のデータが存在するとき', () => {
    it('総人口のデータを正しく抜き出すことができること', () => {
      expect(extractPrefecturesPopulation(sampleResponce)).toEqual({ populations })
    })
  })
  describe('総人口のデータが存在しないとき', () => {
    it('1段目のdataにアクセスできないとき, エラーが発生すること', () => {
      const invalidResponce: any = {}
      expect(() => extractPrefecturesPopulation(invalidResponce)).toThrow()
    })
    it('1段目のdataにアクセスできるとき, エラーが発生すること', () => {
      const invalidResponce: any = {
        message: null,
        result: {
          boundaryYear: 2015,
          data: [
            {
              label: '総人口',
              data: [],
            },
          ],
        },
      }
      expect(() => extractPrefecturesPopulation(invalidResponce)).toThrow()
    })
  })
})
