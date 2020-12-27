import fetch from 'dva/fetch';
//import ip from './ip';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}




/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}


export default function requestPost(url,data) {
  //console.log(ip.ip+url);
   return fetch(url,{
     method:'POST',
     mode: 'cors',
     headers:{
      "Content-Type":"application/json;charset=UTF-8"
     },
     body:JSON.stringify(data)
   })
   .then(checkStatus)
   .then(parseJSON)
   .then(data => ({ data }))
   .catch(err => ({ err }));
}
