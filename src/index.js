import "babel-polyfill";
import dva from 'dva';
import { createBrowserHistory as createHistory} from 'history';

import createLoading from 'dva-loading';
import './index.css';
import 'moment/locale/zh-cn';
import moment from 'moment';
moment.locale('zh-cn');

// 1. Initialize
const app = dva();
// const app = dva({
//   history: createHistory(),
// });

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./models/login').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
