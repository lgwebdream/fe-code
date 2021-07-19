/**
 * save generated code to disk
 */
 const fs = require('promise-fs');
 const FileError = require('../../constants/error');
 const { logError } = require('./log');
 
 const emitFile = (path, data) => {
   try {
     fs.accessSync(path, fs.constants.W_OK);
     return fs.writeFile(path, data).catch(logError);
   } catch ({errno, message}) {
     // continue to write when the path does not exists
     if(errno === FileError.FileNotFound.errno){
      return fs.writeFile(path, data).catch(logError);
     }else{
       logError(message || `can not save the code to ${path}`)
     }
   }
 };
 
 module.exports = emitFile;
 