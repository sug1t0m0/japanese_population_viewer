# 開発サーバ起動

## 動作確認環境


- node: v12.18.2
- yarn: 1.22.10


## 初期設定

node modules のインストール

```bash
yarn install
```

APIキーの設定

- APIキーについては[API詳細仕様](https://opendata.resas-portal.go.jp/docs/api/v1/detail/index.html)参照
- プロジェクトのルートに `.env`を作成
- 以下の環境変数を追加

```
REACT_APP_RESAS_API_KEY=RESASのApiKey
```

## 開発サーバ起動

以下のコマンドで開発サーバが起動するので, [http://localhost:3000/](http://localhost:3000/)にwebブラウザでアクセスすることで、本アプリを閲覧可能
```bash
yarn start
```

## ビルド

```bash
yarn build
```


# アプリ内容

都道府県別の人口推移を表示するシンプルな SPA を開発してください。

- 選択された都道府県の人口推移を、X軸:年・Y軸:人口数の折れ線グラフとして動的表示
- 複数都道府県を同時選択可能

細かい部分の表現についてはお任せします。

# 制約事項

- 都道府県一覧および総人口情報は RESAS (地域経済分析システム)  API のデータを用いること
  - https://opendata.resas-portal.go.jp/
  - 無料の利用登録が必要です
- グラフは Highcharts や Rechart.js 等サードパーティ製のグラフライブラリを用いて描画すること
- ReactもしくはVueの最新版で構築すること
  - できればReactで作っていただけるとありがたいですがVueでも結構です
- Google Chrome 最新版で正しく動くこと
- UnitTest を行うこと
  - 一部でも構いません

# 提出方法

- GitHub/BitBucket にてリポジトリを提出してください
- 作成の経過がわかるように、commitも意識してください


