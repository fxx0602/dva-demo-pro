import * as api from '../services/login';

export default {

    namespace: 'login',
  
    state: {
        userID:'',
        userName:'',
        groupName:'',
        channels:'',
        preview:'',
        replay:'',
        userMgnt:'',
        PTZ:'',
        storeMgnt:'',
        sysCfg:'',
        eventCfg:'',
        networkCfg:'',
        defaultUpgrade:'',
        fileBackup:'',
        ipcCfg:'',
        sysInfo:'',
        otherCfg:'',



        // 版本信息的
        devType:'',
				recordChNum:'',
				alarmOutChNum:'',
				alarmInChNum:'',
				dispNum:'',
				diskNum:'',
				capNum:'',
				serialNo:'',
				appVersion:'',
				onvifVersion:'',
				firmwareVersion:'',
				systemVersion:'',
				devModule:'',
				sipVersion:'',
				HISOME_EDUStatus:'',
				sipStatus:'',
				GB35114Status:'',
				PlatformStatus:'',
				videoOutStatus:'',
				ZeroChannelNum:'',
    },

    reducers: {
      save(state, action) {
        return { ...state, ...action.payload };
      },
      updateAuthority(state,action) {
        let _state = deepClone(state);
        return Object.assign(_state,action.payload);
      },
    }, 
  
    effects: {
      *fetch({ payload }, { call, put }) {  // eslint-disable-line
        yield put({ type: 'save' });
      },
      *getVersion({payload},{call,put}) {
        const result = yield call(api.version,payload);
        const data = result.data[0].data[0];
       if (data) {
         yield put({
          type:'updateAuthority',
          payload:data,
         });
       }
      },
      *getInfoFromLocalStorage({payload}, {call,put,select}) {
        const user = yield select(state => state.login);
        console.log(user);
        if (user.userID === undefined || user.userID === null || user.userID === '') {
          yield put({
            type:'updateAuthority',
            payload:{
             userID:localStorage.getItem("userID"),
             userName:localStorage.getItem("userName"),
            }
          })
        }
      }
    },
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
        
         history.listen((location) => {
           dispatch({
             type:'getInfoFromLocalStorage'
           });
         })
      },
    },
  
  }

  function deepClone(arr) {
    let _obj=JSON.stringify(arr),
    objClone = JSON.parse(_obj);
    return objClone;
}
