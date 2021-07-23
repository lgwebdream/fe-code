// @ts-ignore
import Mock from 'mockjs';

export default {
  'POST /api/json/list': {
    data: Mock.mock({
      'data|100': [
        {
          'id|+1': 1,
          'key|+1': 0,
          'name|+1': '@cname',
          'age|1-100': 100,
          address: '@county(true)',
          description: '@cparagraph(1, 3)',
          title: '@pick(["cto","ceo","coo"])',
        },
      ],
    }),
    code: 200,
    msg: '服务器成功返回数据',
  },
  'GET /api/json/add': {
    result: { id: 2, name: '张三', age: 18, title: 'cto' },
    success: true,
  },
  'GET /api/json/edit': {
    result: { id: 3, name: '张三', age: 18, title: 'cto' },
    success: true,
  },
  'GET /api/json/delete': {
    result: 3,
    success: true,
  },
  'GET /api/json/export': {
    result: 'hello world',
    success: true,
  },
};
