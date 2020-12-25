1.npm install antd babel-plugin-import --save
2.cnpm install --save history
   修改入库文件
   import { createBrowserHistory as createHistory} from 'history';
   const app = dva({
  history: createHistory(),
  });