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
          'score|1-32': 32,
          'level|1-5': 5,
          birthday: '@date',
          address: '@county(true)',
          description: '@cparagraph(1, 3)',
          title: '@pick(["cto","ceo","coo"])',
          department: '@pick(["light","light2"])',
          mapping: '@pick(["优秀","良好","差"])',
          flag: '@pick([true,false])',
          'tags|1-2': ['@pick(["外向","善于沟通","脾气差"])'],
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
