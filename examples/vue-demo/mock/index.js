const path = require('path');
const fs = require('fs');
const getPathInfo = p => path.parse(p);

function autoLoadFile(directory, useSubdirectories = false, extList = ['.js']) {
  const filesList = [];
  // 递归读取文件
  function readFileList(directory, useSubdirectories, extList) {
    const files = fs.readdirSync(directory);
    files.forEach(item => {
      const fullPath = path.join(directory, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory() && useSubdirectories) {
        readFileList(path.join(directory, item), useSubdirectories, extList);
      } else {
        const info = getPathInfo(fullPath);
        extList.includes(info.ext) && filesList.push(fullPath);
      }
    });
  }
  readFileList(directory, useSubdirectories, extList);
  // 生成需要的对象
  const res = filesList.map(item => ({
    path: item,
    data: require(item),
    ...getPathInfo(item),
  }));

  return res;
}

const UseMock = app => {
  const modulesFiles = autoLoadFile(path.join(__dirname, './api'), true);
  modulesFiles.forEach(item => item.data(app));
};

module.exports = app => {
  UseMock(app);
};
