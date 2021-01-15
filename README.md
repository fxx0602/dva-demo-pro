1.npm install antd babel-plugin-import --save
2.cnpm install --save history
   修改入库文件
   import { createBrowserHistory as createHistory} from 'history';
   const app = dva({
  history: createHistory(),
  });

3.cnpm install dva-loading --save

4.npm install --save js-md5

5.原因是ie不支持es6语法，需要导入依赖包
   npm install --save-dev babel-polyfill 在main.js中引入： import “babel-polyfill”

   6。cnpm install file-saver --save
       cnpm install xlsx --save