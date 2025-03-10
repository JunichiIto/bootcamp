[![CircleCI](https://circleci.com/gh/fjordllc/bootcamp.svg?style=shield)](https://app.circleci.com/pipelines/github/fjordllc/bootcamp)
[![Create a release pull-request](https://github.com/fjordllc/bootcamp/actions/workflows/git-pr-release-action.yml/badge.svg)](https://github.com/fjordllc/bootcamp/actions/workflows/git-pr-release-action.yml)

# Bootcamp

エンジニア向けEラーニングシステム。

## インストールと起動

### 1. 画像処理ライブラリのインストール
   wiki 内の[画像処理ライブラリのインストール](https://github.com/fjordllc/bootcamp/wiki/%E7%94%BB%E5%83%8F%E5%87%A6%E7%90%86%E3%83%A9%E3%82%A4%E3%83%96%E3%83%A9%E3%83%AA%E3%81%AE%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB)ページを参照してください。

### 2. セットアップとサーバーの起動

```
$ bin/setup
$ foreman start -f Procfile.dev
```

http://localhost:3000/ にアクセス。

## テスト

### ヘッドレスブラウザーでテスト

```
$ rails test:all
```

### 普通のブラウザーでテスト

```
$ HEADFUL=1 rails test:all
```

### 並列実行せずにテスト

```
$ PARALLEL_WORKERS=1 rails test:all
```

## Lint

次のコマンドでlintを実行します。

```
$ ./bin/lint
```

実行されるlint

* Ruby
  * rubocop
  * slim-lint
* JavaScript
  * eslint
  * prettier
* eslintの警告は以下のコマンドで修正されますが、修正されない場合は手動で修正してください。

```shell
$ eslint 'app/javascript/**/*.{js,vue,jsx}' --fix
```

* prettierの警告が出ている場合には、以下のコマンドで修正できます。

```shell
$ prettier app/javascript/**/*.{js,vue,jsx} --write
```

## Profiler

rack-mini-profilerによりプロファイリングはデフォルトではOFFになっています。ONにする場合は下記のようにサーバーと立ち上げます。

```
$ PROFILE=1 rails server
```

## 環境構築

- [Develop環境でログインする方法](https://github.com/fjordllc/bootcamp/wiki/Develop%E7%92%B0%E5%A2%83%E3%81%A7%E3%83%AD%E3%82%B0%E3%82%A4%E3%83%B3%E3%81%99%E3%82%8B%E6%96%B9%E6%B3%95)
- [Develop環境でのメールの確認方法](https://github.com/fjordllc/bootcamp/wiki/Develop%E7%92%B0%E5%A2%83%E3%81%A7%E3%81%AE%E3%83%A1%E3%83%BC%E3%83%AB%E3%81%AE%E7%A2%BA%E8%AA%8D%E6%96%B9%E6%B3%95)
- [nodeのバージョン切り替え](https://github.com/fjordllc/bootcamp/wiki/node%E3%81%AE%E3%83%90%E3%83%BC%E3%82%B8%E3%83%A7%E3%83%B3%E5%88%87%E3%82%8A%E6%9B%BF%E3%81%88)
- [Develop環境をDockerで動かす方法](doc/development_on_docker.md)

## その他

- [Bootcamp Wiki](https://github.com/fjordllc/bootcamp/wiki)
