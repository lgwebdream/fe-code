const { outputFileSync } = require('fs-extra');
const utils = {
  template (str, matches) {
    return str.replace(/{\s*(\w+)\s*}/g, ($1, $2) => matches[$2]);
  },
  generateHead (arr) {
    return arr.join('');
  },
  style2Str (style) {
    return Object.entries(style)
      .reduce((pre, cur) => `${pre} ${cur[0]}:${cur[1]};`, '')
      .trim();
  },
  generateBody (input) {
    const { tag } = input;
    let result = '';
    
    if (!tag) return result;
    
    const traverseList = (item) => {
      const { tag, style, text, children = [] } = item;
      const styleStr = utils.style2Str(style);
      let temp = '';
    
      if (tag) {
        temp += `<${tag}`;
        if (styleStr) {
          temp += ` style="${styleStr}"`;
        }
        temp += '>';
      }
    
      if (typeof text !== 'undefined') {
        temp += text;
      }
    
      result += temp;
    
      if (children.length === 0) {
        if (tag) {
          result += `</${tag}>`;
        }
        return;
      }
    
      for (const child of children) {
        traverseList(child);
      }
    
      if (tag) {
        result += `</${tag}>`;
      }
    };
    traverseList(input);
    return result;
  },
  output (str, path) {
    outputFileSync(path, str);
  }
};
module.exports = utils;
