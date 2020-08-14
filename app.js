require('dotenv').config();
const Smartup = require('./src/smartup');
const { createFolder } = require('./src/fileSystem');

async function start() {
    try {
        await createFolder(0, true);

        const smt = new Smartup(`C:\\Users\\FEENDO\\Desktop\\тест\\`);
        await smt.init();
        await smt.login();
        await smt.changeBranch(2);
        await smt.getDebtors();
        smt.getWarehouse([1], 1);
        smt.getCredit();
        smt.getCash();
    } catch (err) {
        console.log(err);
    }
}

start();
