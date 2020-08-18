require('dotenv').config();
const Smartup = require('./src/smartup');
const Excel = require('./src/excel');
const { createFolder } = require('./src/fileSystem');

async function start() {
    try {
        await createFolder(0, true);

        const smt = new Smartup(`C:\\Users\\FEENDO\\Desktop\\тест\\`);
        await smt.init();
        // await smt.login();
        // await smt.changeBranch(2);
        // await smt.getDebtors();
        // await smt.getWarehouse([1], 1);
        await smt.getCredit();
        await smt.getCash();

        const exl = new Excel('C:\\Users\\FEENDO\\Desktop\\тест\\', 2);
        exl.processDebtors();
        exl.processWarehouse();
        console.log('Finished');
    } catch (err) {
        console.log(err);
    }
}

start();
