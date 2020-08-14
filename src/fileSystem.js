const fs = require('fs');
const util = require('util');
const { timeFormat } = require('./utils');

const mkdir = util.promisify(fs.mkdir);
const stat = util.promisify(fs.exists);
const renameFile = util.promisify(fs.rename);
const copyFile = util.promisify(fs.copyFile);

exports.createFolder = async (branch, rewrite = false) => {
    let base = 'C:\\Users\\FEENDO\\Desktop\\тест\\';
    base += branch ? 'conti\\' : 'feendo\\';
    const folderName = timeFormat(new Date());
    const isExist = await stat(`${base}\\${folderName}`);

    if (isExist) {
        if (rewrite) return;
        throw new Error('Folder with this date already exists');
    }

    mkdir(`${base}${folderName}`);
};

exports.rename = async (oldName, newName) => {
    renameFile(oldName, newName);
};

exports.copy = async (oldName, newName) => {
    copyFile(oldName, newName);
};
