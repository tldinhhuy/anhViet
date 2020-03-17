'use strict';

var fse = require('fs-extra');

class FileManagerService {
  constructor () {}

  createFile(filePath, data) {
    // overwrites existing file
    return fse.outputFile(filePath, data);
  }

  readFile(path, options) {
    return fse.readFile(path, options);
  }

}

module.exports = new FileManagerService();
