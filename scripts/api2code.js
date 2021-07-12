// const json2ts = require('json2ts');
const chalk = require('chalk');

const api2code = program => {
  program
    .command('api2code <type>')
    .alias('a2c')
    .description('🌽 API接口对TypeScript转化')
    .option('-u, --url <url>', 'api接口地址')
    .option('-o, --output <output>', '生成文件地址', './')
    .action((type, options) => {
      if (type !== 'ts' || type !== 'js') {
        console.log(`🐝 ${chalk.red('✘ 请正确传递代码模板引擎ts或js')}`);
        return;
      }
      console.log('read config from %s', program.opts().config);
      console.log(
        'exec "%s" using %s mode and config %s',
        type,
        options.url,
        program.opts().config,
      );
    });
};
module.exports = api2code;
