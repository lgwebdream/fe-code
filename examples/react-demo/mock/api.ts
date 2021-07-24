// @ts-ignore
import Mock from 'mockjs';

export default {
  'POST /api/json/list': {
    data: Mock.mock({
      'data|100': [
        {
          'id|+1': 1,
          'key|+1': 0,
          name: '@cname',
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
  'POST /api/json/add': {
    result: { id: 2, name: '张三', age: 18, title: 'cto' },
    success: true,
  },
  'POST /api/json/edit': {
    result: { id: 3, name: '张三', age: 18, title: 'cto' },
    success: true,
  },
  'POST /api/json/delete': {
    result: 3,
    success: true,
  },
  'POST /api/json/export': {
    result: 'hello world',
    success: true,
  },
};
