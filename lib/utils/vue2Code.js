const { join } = require('path');
const { existsSync, mkdirSync } = require('fs');
const { transferDir, transferFile } = require('./file');
const {logSuccess} =require('./log')
/**
 * 生成 vue crud 模板代码
 *
 * @param {*} fromFile
 * @param {*} toFile
 * @param {*} options
 * @returns Promise<boolean>
 */
const replaceArgsToFile = (fromFile, toFile, options) => {
  if (!options) return null;

  const {
    title, // 标题
    containerType = 'Modal', // 交互方式
    isNeedQuery, // 是否需要筛选
    isNeedAdd,
    isNeedEdit,
    isNeedDelete,
    isNeedBatchDelete,
  } = options;

  return transferFile(fromFile, toFile, data => {
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
      axios(apiConfig.add, { method: 'post', data: row }).then(() => {
        ElMessage.success('添加成功');
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
      axios(apiConfig.edit, { method: 'post', data: row }).then(() => {
        ElMessage.success('编辑成功');
        }),
    }`);
    }

    if (isNeedDelete) {
      apiConfig.delete = '/api/json/delete';
      batchToolbar.push(`{
      label: '删除',
      type: 'link',
      toolbarType: ICrudToolbarTypeEnum.Delete,
      request: (row) =>
      axios(apiConfig.delete, { method: 'post', data: row }).then(() => {
        ElMessage.success('删除成功');
        }),
    }`);
    }

    if (isNeedBatchDelete) {
      apiConfig.batchDelete = '/api/json/delete';
      batchToolbar.push(`{
      label: '批量删除',
      type: 'dashed',
      toolbarType: ICrudToolbarTypeEnum.DeleteBatch,
      request: (row) =>
      axios(apiConfig.delete, { method: 'post', data: row }).then(() => {
        ElMessage.success('删除成功');
        }),
    }`);
    }

   
    // 移除筛选
    !isNeedQuery && data.replace(/isFilter: true,/g, 'isFilter: false,');

    // replace content
    const replaceData = `import { ElMessage,Button } from 'element-plus';\n${data
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

    return replaceData;
  });
};

/**
 * 生成 vue 模板代码
 *
 * @param {*} fromPath
 * @param {*} toPath
 * @param {*} options
 */
const generateVueCode = (fromPath, toPath, options) => {
  const { isTs, file, model,component } = options;

  // 基础 crud 模板
  component.forEach(item=>{
    const baseCrudTemplatePath = `components/${item}/config`;
    const templateSuffix = isTs ? 'ts' : 'ts';
    const templateFromPath = join(
      fromPath,
      `${baseCrudTemplatePath}.${templateSuffix}`,
    );
    const templateToPath = join(toPath, model,'components',item);
  
    if (!existsSync(templateFromPath)) return;
  
    // 模块不存在则新建
  
    !existsSync(templateToPath) && mkdirSync(templateToPath);
  
    // replace args
    replaceArgsToFile(
      templateFromPath,
      join(templateToPath, `config.${templateSuffix}`),
      options,
    )?.then(isSuccess => {});
  })

};

/**
 * 初始化 Vue crud 基础组件
 *  用作生成基础组件到项目基架中
 *
 * @param {*} fromPath
 * @param {*} toPath
 */
const initVueBase = (fromPath, toPath,options) => {
  const { model,component } = options;

  
  const baseModelPath = join(toPath, model);
  !existsSync(baseModelPath) && mkdirSync(baseModelPath);
  // 基础组件
  const baseComponentPath = 'components';
 
  let templateFiles = ['Form','Table','Button','ToolBar']
  // ignore file
  const ignoreFiles = [
    'node_modules',
    '.DS_Store',
    'dist',
    'yarn.lock',
    '.prettierrc',
    'README.md',
    'package-lock.json',
    'package.json',
    'tsconfig.json',
  ].concat(templateFiles.filter(item=>!component.includes(item)));
  
  

  const baseFromPath = join(fromPath, baseComponentPath);
  const baseToPath = join(toPath, model,baseComponentPath);
  transferDir(baseFromPath, baseToPath, ignoreFiles);
};

module.exports = {
  initVueBase,
  generateVueCode,
};
