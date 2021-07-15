const {
  quicktype,
  InputData,
  jsonInputForTargetLanguage,
} = require('quicktype-core');

async function quicktypeJSON(targetLanguage, typeName, jsonString) {
  const jsonInput = jsonInputForTargetLanguage(targetLanguage);

  await jsonInput.addSource({
    name: typeName,
    samples: [jsonString],
  });

  const inputData = new InputData();
  inputData.addInput(jsonInput);

  return quicktype({
    inputData,
    lang: targetLanguage,
    rendererOptions: {
      'just-types': true,
    },
  });
}

module.exports = quicktypeJSON;
