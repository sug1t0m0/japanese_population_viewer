import {
  convertFromPrefecturesPopulationData,
  genYearsSortedInAsc,
  convertPrefCodeIntoPrefName,
} from './prefecturesPopulationGraphByYear'

const samplePrefecturesPopulationData = {
  data: [
    {
      prefCode: 0,
      populations: [
        {
          year: 2020,
          value: 3,
        },
        {
          year: 2025,
          value: 4,
        },
        {
          year: 2030,
          value: 5,
        },
      ],
    },
    {
      prefCode: 1,
      populations: [
        {
          year: 2020,
          value: 5,
        },
        {
          year: 2025,
          value: 4,
        },
        {
          year: 2030,
          value: 3,
        },
      ],
    },
  ],
  isLoading: false,
  isError: false,
}

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

const sampleSelectedPrefCodeList = [0, 1]

const sampleParams = {
  prefecturesPopulationData: samplePrefecturesPopulationData,
  prefecturesData: samplePrefecturesData,
  selectedPrefCodeList: sampleSelectedPrefCodeList,
}

describe('convertFromPrefecturesPopulationData', () => {
  describe('グラフ表示用のデータが生成できる場合', () => {
    describe('selectedPrefCodeList の要素数 > 0 の場合', () => {
      it('グラフ表示用に整形されたデータと県名の配列が得られること', () => {
        const expectDataForPrefecturePopulationGraph = [
          [
            {
              year: 2020,
              山形県: 5,
              新潟県: 3,
            },
            {
              year: 2025,
              山形県: 4,
              新潟県: 4,
            },
            {
              year: 2030,
              山形県: 3,
              新潟県: 5,
            },
          ],
          ['新潟県', '山形県'],
        ]
        expect(convertFromPrefecturesPopulationData(sampleParams)).toEqual(expectDataForPrefecturePopulationGraph)
      })
    })

    describe('selectedPrefCodeList が空配列の場合', () => {
      it('空配列を要素とする、要素数2の配列が得られること', () => {
        const params = {
          ...sampleParams,
          selectedPrefCodeList: [],
        }
        expect(convertFromPrefecturesPopulationData(params)).toEqual([[], []])
      })
    })
  })
})

describe('genSortedYears', () => {
  describe('キー(year) がすべての県で同じ場合', () => {
    it('キー(year)が重複なし、昇順のnumber型の配列として得られること', () => {
      expect(genYearsSortedInAsc(samplePrefecturesPopulationData)).toEqual([2020, 2025, 2030])
    })
  })
  describe('キー(year) がすべての県で同じではない場合', () => {
    it('キー(year)が重複なし、昇順のnumber型の配列として得られること', () => {
      const prefecturesPopulationData = {
        ...samplePrefecturesPopulationData,
        data: [
          {
            prefCode: 0,
            populations: [
              {
                year: 1992,
                value: 3,
              },
              {
                year: 2025,
                value: 4,
              },
              {
                year: 2030,
                value: 5,
              },
            ],
          },
          {
            prefCode: 2,
            populations: [
              {
                year: 2020,
                value: 5,
              },
              {
                year: 2025,
                value: 4,
              },
              {
                year: 2030,
                value: 3,
              },
            ],
          },
        ],
      }
      expect(genYearsSortedInAsc(prefecturesPopulationData)).toEqual([1992, 2020, 2025, 2030])
    })
  })
})

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
