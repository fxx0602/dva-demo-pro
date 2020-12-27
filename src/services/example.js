import request from '../utils/request';
//const proxy = '/pppp'

export function query() {
  return request('/api/users');
}

export function text() {
  return request('/api/v1/topics');
}

