module.exports = app => {
  app.get('/api/json/list', (req, res) => {
    res.json({
      code: 1,
      data: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        },
      ],
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
  app.post('/api/json/del', (req, res) => {
    res.json({
      code: 1,
    });
  });
};
