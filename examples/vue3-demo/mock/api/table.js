module.exports = app => {
  app.get('/api/json/list', (req, res) => {
    const list = [];

    for (let i = 1; i < 10; i++) {
      list.push({
        date: `2016-05-0${i}`,
        name: `王小虎${i}`,
        address: `上海市普陀区金沙江路 151${i} 弄`,
      });
    }
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
