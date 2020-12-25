import requestPost from '../utils/request';

export function login(data) {
    return requestPost('/HISOMEAPI/userMgnt/loginMgnt',data);
  }