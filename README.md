# nestjs-graphql-code-first
NestJSのGraphQL(コードファースト)のキャッチアップリポジトリ

## GraphQLのメリット
- オーバーフェッチ・アンダーフェッチを防げる
- 1回のリクエストで必要なデータを取ってこれる
- リクエスト数が最小限で済むので、アプリのパフォーマンスが最適化しやすい

## REST　APIからGraphQLへの移行
- 事例1
	- https://gabu.hatenablog.com/entry/2023/08/02/130000
		- REST APIによるサービス開発が進んできたフェーズ
			- フロントエンドがNext.js
				- GraphQL × React Hooksの開発体験の良さ
				- フロントエンドの改修だけで目的が達成できることがある
					- フロントエンドで取得したいデータを選択できるメリット
						- https://gabu.hatenablog.com/entry/2023/08/02/130000
			- クライアント側のデータ取得の柔軟性を向上しようのモチベーションかも
				- ObjectTypeが共通化されていればこそなせる
- 事例2
	- ttps://tech-blog.yayoi-kk.co.jp/entry/entry/2021/12/23/000000
		- BFF(GraphQL)とバックエンドAPI(REST API)のプロトコル変換による開発スピードの低下に対するアプローチ
			- API Gatewayで複数のGraphQLエンドポイントを1つにまとめ、クエリの分配や結果の結合を行えるようにする(GraphQL Federation)
				- NestJSのGraphQLがサポートしている
				- NestJSであればバックエンド・フロントエンドでTypeScriptで統一できるのも嬉しい
- 事例3
	- https://buildersbox.corp-sansan.com/entry/2020/07/17/110000
		- 1つのエンドポイントで複数ドメインのデータを組み合わせるようになり、仕様が複雑で改修が辛くなってきた
			- 影響範囲が広い
			- 修正時にフロントエンド・バックエンド間のコミュニケーションコストがかかる
		- クエリで関連情報も取得できるGraphQLであれば複雑な仕様変更にも耐えやすくできるのではないか？というモチベーション

まとめると、以下のような状況でREST API → GraphQLに移行するモチベーションがある...

**・サービス開発が進み、仕様がどんどん複雑になってきた(複数ドメインを1つのエンドポイントで扱うようになってきたり)**

**・取得するデータをクライアント側で指定したいケースが増えてきた(クライアント起点)**


## 参考
- https://docs.nestjs.com/graphql/quick-start
- https://zenn.dev/youcangg/articles/33a8ff2accb774

## GraphQL playground
[http://localhost:8000/graphql](http://localhost:8000/graphql)

## コマンド類
### 開発環境の立ち上げ
```
docker-compose build

docker-compose up
```

### NestJSでresource(resolver, service, module, entity)を一式作成する
```
nest g resource [name]
```

### マイグレーション作成
```
npx ts-node ./node_modules/.bin/typeorm migration:generate -d ./data-source.ts ./migrations/
```

### マイグレーション実行
```
npx ts-node ./node_modules/.bin/typeorm migration:run -d ./data-source.ts
```
