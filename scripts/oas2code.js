const { getCwdPath } = require('../lib/utils');
const handleOpenapi = require('../lib/api2code/openapi');
const { oasGenStatus } = require('../lib/api2code/openapi/oraState');

const oas2code = program => {
  program
    .command('oas2code')
    .alias('o2c')
    .description(
      'Generates Typescript clients based on the OpenAPI specification.',
    )
    .requiredOption('-i, --input <input>', 'path of OpenAPI specification')
    .requiredOption('-o, --output <output>', 'path of generation file')
    .action(options => {
      oasGenStatus.start();
      const { input, output } = options;
      handleOpenapi({
        input,
        output: getCwdPath(output),
      });
    });
};

module.exports = oas2code;
