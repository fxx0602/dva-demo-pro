import requestPost from '../utils/request';
import base from './base';

export function login(data) {
    return requestPost(base.login,data);
}

export function version(data) {
  return requestPost(base.version,data);
}

export function modifyPassword(data) {
  return requestPost(base.modifyPassword,data);
}

export function queryLog(data) {
  return requestPost(base.log,data);
}
 