/**
 * define all the CRUD code templates, the generator name schema is:
 *  [language]_[requestLib]_[codeStyle], for example, JavaScript_JQuery_CodeSnippet
 * the signature of all the generators :
 *  @param {*} apiInfo
 *  @param {*} serviceName
 *  @returns void
 * the generated code will be mounted to apiInfo.code which will be assembled later
 */
const { JS, TS, CodeSnippet, Axios, GET } = require('../../constants/concept');

module.exports = {
  // JavaScript_Axios_CodeSnippet
  [`${JS}_${Axios}_${CodeSnippet}`]: apiInfo => {
    const { path, method, name } = apiInfo;
    let code;
    if (method.toUpperCase() === GET) {
      // GET method
      code = `function ${name}(params={}){
        return axios.request({
          url:'${path}',
          method:'${method}',
          params
        }).catch(err=>{
          throw new Error(err ? err.message :'服务端错误');
       })
      }`;
    } else {
      code = `function ${name}(data={}){
        return axios.request({
          url:'${path}',
          method:'${method}',
          data
        }).catch(err=>{
          throw new Error(err ? err.message :'服务端错误');
       })
      }`;
    }
    return {
      ...apiInfo,
      code,
    };
  },
  // TypeScript_Axios_CodeSnippet
  [`${TS}_${Axios}_${CodeSnippet}`]: (apiInfo, serviceName) => {
    const { path, name, method } = apiInfo;
    const apiName = `${serviceName}${name[0].toUpperCase()}${name.slice(1)}API`;
    let code;
    if (method.toUpperCase() === GET) {
      // GET method
      code = `
      import * as ${apiName} from '@typings/api.${serviceName}.${name}';

      function ${name}(params:${apiName}.Request):Promise<${apiName}.Response>{
        return axios.request({
          url:'${path}',
          method:'${method}',
          params:params || {}
        }).catch(err=>{
          throw new Error(err ? err.message :'服务端错误');
       })
      }`;
    } else {
      code = `
      import * as ${apiName} from '@typings/api.${serviceName}.${name}';

      function ${name}(data:${apiName}.Request):Promise<${apiName}.Response>{
        axios.request({
          url:'${path}',
          method:'${method}',
          data:data || {}
        }).catch(err=>{
          throw new Error(err ? err.message :'服务端错误');
       })
      }`;
    }
    return {
      ...apiInfo,
      code,
    };
  },
};
