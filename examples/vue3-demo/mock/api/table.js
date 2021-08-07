const demoList = [
  {
    id: 1,
    key: 0,
    name: '锺霞',
    age: 75,
    score: 24,
    level: 3,
    birthday: '1981-03-13',
    address: '上海 上海市 静安区',
    description: '美老总矿不器身京片表变将看来复正根生。',
    title: 'cto',
    department: 'light2',
    mapping: '优秀',
    flag: false,
    tags: ['脾气差', '外向'],
  },
  {
    id: 2,
    key: 1,
    name: '赖静',
    age: 14,
    score: 26,
    level: 2,
    birthday: '1976-07-30',
    address: '重庆 重庆市 双桥区',
    description: '件火到么八社公要入出同铁通己正头除特。',
    title: 'cto',
    department: 'light',
    mapping: '良好',
    flag: true,
    tags: ['善于沟通'],
  },
  {
    id: 3,
    key: 2,
    name: '马霞',
    age: 4,
    score: 1,
    level: 3,
    birthday: '1985-12-16',
    address: '澳门特别行政区 澳门半岛 -',
    description: '理资决斯广见置效路白观于完教。了理部往石史手况越力放约东入。',
    title: 'coo',
    department: 'light',
    mapping: '差',
    flag: false,
    tags: ['外向', '善于沟通'],
  },
  {
    id: 4,
    key: 3,
    name: '孟强',
    age: 12,
    score: 26,
    level: 3,
    birthday: '1982-07-29',
    address: '福建省 厦门市 同安区',
    description: '标见发交外二设观与江战象影斯非多们。后理起自速入万图电量集么白将题。',
    title: 'coo',
    department: 'light',
    mapping: '差',
    flag: true,
    tags: ['脾气差'],
  },
  {
    id: 5,
    key: 4,
    name: '范娟',
    age: 28,
    score: 30,
    level: 3,
    birthday: '2002-10-17',
    address: '江苏省 无锡市 南长区',
    description:
      '出感日处深当定具手二置数新。统听此政展政团京金同越步。出电分而度同采率新东基资至。',
    title: 'cto',
    department: 'light',
    mapping: '差',
    flag: false,
    tags: ['外向'],
  },
  {
    id: 6,
    key: 5,
    name: '江明',
    age: 60,
    score: 25,
    level: 1,
    birthday: '2002-12-29',
    address: '上海 上海市 浦东新区',
    description: '整常般白务引设准表最里定每。',
    title: 'ceo',
    department: 'light',
    mapping: '良好',
    flag: false,
    tags: ['善于沟通'],
  },
  {
    id: 7,
    key: 6,
    name: '石丽',
    age: 64,
    score: 26,
    level: 3,
    birthday: '2014-05-05',
    address: '山西省 晋城市 高平市',
    description: '已有里车白或做自情比置极少更圆该速。',
    title: 'coo',
    department: 'light2',
    mapping: '良好',
    flag: true,
    tags: ['脾气差', '脾气差'],
  },
  {
    id: 8,
    key: 7,
    name: '谢刚',
    age: 74,
    score: 2,
    level: 2,
    birthday: '2005-02-04',
    address: '贵州省 黔西南布依族苗族自治州 兴义市',
    description:
      '备身社但基声去易已准角地北表它交更。全专历组现青造带它验比命。开算但意织群没论最论实工。',
    title: 'cto',
    department: 'light',
    mapping: '优秀',
    flag: true,
    tags: ['脾气差', '外向'],
  },
  {
    id: 9,
    key: 8,
    name: '任强',
    age: 25,
    score: 29,
    level: 2,
    birthday: '1988-06-03',
    address: '广东省 梅州市 梅县',
    description: '别建设她书众器采效片响力治素角再样声。识不建口特运是两高经始广内身连业正道。',
    title: 'ceo',
    department: 'light',
    mapping: '良好',
    flag: false,
    tags: ['善于沟通', '外向'],
  },
  {
    id: 10,
    key: 9,
    name: '康霞',
    age: 34,
    score: 27,
    level: 3,
    birthday: '2009-04-29',
    address: '云南省 昭通市 鲁甸县',
    description: '适至形信必民比消多平计放。',
    title: 'ceo',
    department: 'light',
    mapping: '优秀',
    flag: false,
    tags: ['外向', '善于沟通'],
  },
];

module.exports = app => {
  app.get('/api/json/list', (req, res) => {
    const list = demoList || [];

    // for (let i = 1; i < 10; i++) {
    //   list.push({
    //     date: `2016-05-0${i}`,
    //     name: `王小虎${i}`,
    //     address: `上海市普陀区金沙江路 151${i} 弄`,
    //   });
    // }
    res.json({
      code: 1,
      data: list,
      total: list.length * 10,
    });
  });
  app.post('/api/json/add', (req, res) => {
    res.json({
      code: 1,
      data: [],
    });
  });
  app.post('/api/json/edit', (req, res) => {
    res.json({
      code: 1,
    });
  });
  app.post('/api/json/delete', (req, res) => {
    res.json({
      code: 1,
    });
  });
};
