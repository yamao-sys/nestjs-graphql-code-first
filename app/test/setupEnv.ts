import * as dotenv from 'dotenv';
import * as path from 'path';

const testEnv = dotenv.config({
  path: path.join(process.cwd(), 'src/envs/.env.test'),
});

// 環境変数をtest環境に上書き
Object.assign(process.env, {
  ...testEnv.parsed,
});

// CI環境の時はDB_HOSTをlocalhostに変更
if (process.env?.IS_CI) {
  process.env.DB_HOST = '127.0.0.1';
}
