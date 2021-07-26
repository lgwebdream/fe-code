const {
  readdirSync,
  readFile,
  writeFile,
  createReadStream,
  createWriteStream,
  existsSync,
  mkdirSync,
} = require('fs');
const { join } = require('path');

// ignore file
const ignoreFiles = [
  'node_modules',
  '.DS_Store',
  'dist',
  'yarn.lock',
  'package-lock.json',
  'package.json',
  'tsconfig.json',
];

// 基础组件
const baseComponentPath = 'components';
// 基础 crud 模板
const baseCrudTemplatePath = 'template/crud';

const handleError = err => err && console.error(err) && process.exit(-1);

/**
 * replace file
 *
 * @param {*} fromFile
 * @param {*} toFile
 * @param {*} options
 * @returns
 */
const replaceArgsToFile = (fromFile, toFile, options) => {
  if (!options || !existsSync(fromFile)) return;

  const {
    title, // 标题
    containerType = 'Modal', // 交互方式
    isNeedQuery, // 是否需要筛选
    isNeedAdd,
    isNeedEdit,
    isNeedDelete,
    isNeedBatchDelete,
    isNeedDefine,
    isNeedBatchDefine,
  } = options;

  readFile(fromFile, 'utf8', (err, data) => {
    if (err) {
      handleError(err);
      return;
    }

    const apiConfig = { list: '/api/json/list' };
    const batchToolbar = [];
    const rowToolbar = [];

    if (isNeedAdd) {
      apiConfig.add = '/api/json/add';
      batchToolbar.push(`{
      label: '添加',
      type: 'primary',
      toolbarType: ICrudToolbarTypeEnum.Add,
      request: (row) =>
        request(apiConfig.add, { method: 'post', data: row }).then(() => {
          message.success('添加成功');
        }),
    }`);
    }

    if (isNeedEdit) {
      apiConfig.edit = '/api/json/edit';
      rowToolbar.push(`{
      label: '编辑',
      type: 'link',
      toolbarType: ICrudToolbarTypeEnum.Edit,
      request: (row) =>
        request(apiConfig.edit, { method: 'post', data: row }).then(() => {
          message.success('编辑成功');
        }),
    }`);
    }

    if (isNeedDelete) {
      apiConfig.delete = '/api/json/delete';
      rowToolbar.push(`{
      label: '删除',
      type: 'link',
      danger: true,
      toolbarType: ICrudToolbarTypeEnum.Delete,
      request: (row) =>
        request(apiConfig.delete, { method: 'post', data: row }).then(() => {
          message.success('删除成功');
        }),
    }`);
    }

    if (isNeedBatchDelete) {
      apiConfig.batchDelete = '/api/json/delete';
      batchToolbar.push(`{
      label: '批量删除',
      type: 'dashed',
      danger: true,
      toolbarType: ICrudToolbarTypeEnum.DeleteBatch,
      request: (row) =>
        request(apiConfig.delete, { method: 'post', data: row }).then(() => {
          message.success('删除成功');
        }),
    }`);
    }

    if (isNeedDefine) {
      rowToolbar.push(`{
      render: (row, index) => {
        return (
          <Button
            type="link"
            onClick={() => {
              message.warning('自定义事件处理');
              console.log(1111, row, index);
            }}
          >
            行级操作
          </Button>
        );
      }
    }`);
    }

    if (isNeedBatchDefine) {
      batchToolbar.push(`{
      render: (rows, rowKeys) => {
        console.log(rows, rowKeys);
        return (
          <Button type="text" onClick={() => message.warning('自定义事件处理')}>
            自定义按钮
          </Button>
        );
      },
    }`);
    }

    // 移除筛选
    !isNeedQuery && data.replace(/isFilter: true,/g, 'isFilter: false,');

    // replace content
    const replaceData = `import { Button, message } from 'antd';\n${data
      .replace(/\/\/ @ts-ignore/g, '')
      .replace(
        /\} from '..\/components\/index';/g,
        `, ICrudToolbarTypeEnum, ICurdContainerTypeEnum } from '../components/index';\n`,
      )
      .replace(/\{crud.title\}/g, title)
      .replace(/'\{crud.apiConfig\}'/g, JSON.stringify(apiConfig))
      .replace(
        /'\{crud.containerType\}'/g,
        `ICurdContainerTypeEnum.${containerType}`,
      )
      .replace(/'\{crud.batchToolbar\}'/g, `[${batchToolbar.join(',')}]`)
      .replace(/'\{crud.rowToolbar\}'/g, `[${rowToolbar.join(',')}]`)}`;

    writeFile(toFile, replaceData, 'utf8', handleError);
  });
};

/**
 * 迁移文件到固定目录
 *
 * @param {*} fromPath
 * @param {*} toPath
 * @param {*} cb
 * @returns
 */
const copyFiles = (fromPath, toPath) => {
  if (!existsSync(fromPath)) return;

  // not exist and mkdir
  !existsSync(toPath) && mkdirSync(toPath);

  const files = readdirSync(fromPath, { withFileTypes: true });

  for (const file of files) {
    if (!ignoreFiles.includes(file.name)) {
      const fromFilePath = join(fromPath, file.name);
      const toFilePath = join(toPath, file.name);

      if (file.isFile()) {
        // copy file
        const reader = createReadStream(fromFilePath);
        const writer = createWriteStream(toFilePath);
        reader.pipe(writer);
      } else {
        copyFiles(fromFilePath, toFilePath);
      }
    }
  }
};

/**
 * copy file
 *
 * @param {*} fromPath
 * @param {*} toPath
 * @param {*} options
 */
const generateReactCode = (fromPath, toPath, options) => {
  const { isTs, file, model } = options;

  const templateSuffix = isTs ? 'tsx' : 'jsx';
  const templateFromPath = join(
    fromPath,
    `${baseCrudTemplatePath}.${templateSuffix}`,
  );
  const templateToPath = join(toPath, model);

  if (!existsSync(templateFromPath)) return;

  // 模块不存在则新建
  !existsSync(templateToPath) && mkdirSync(templateToPath);

  // replace args
  replaceArgsToFile(
    templateFromPath,
    join(templateToPath, `${file}.${templateSuffix}`),
    options,
  );
};

/**
 * 初始化 react crud 基础组件
 *  用作生成基础组件到项目基架中
 *
 * @param {*} fromPath
 * @param {*} toPath
 */
const initReactBase = (fromPath, toPath) => {
  const baseFromPath = join(fromPath, baseComponentPath);
  const baseToPath = join(toPath, baseComponentPath);

  copyFiles(baseFromPath, baseToPath);
};

module.exports = {
  initReactBase,
  generateReactCode,
};
