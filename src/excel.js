const xl = require('exceljs');
const { timeFormat } = require('./utils');

const workBook = new xl.Workbook();

class Excel {
    constructor(root, branch) {
        this.root = root;
        this.branch = branch;
        this.filenames = ['долги.xlsx', 'склад.xlsx'];
        this.enumBranch = ['null', 'main', 'feendo', 'conti'];
    }

    async processDebtors() {
        try {
            const today = timeFormat(new Date());
            const file = `${today} ${this.filenames[0]}`;
            const fullName = `C:\\Users\\FEENDO\\Desktop\\тест\\${this.enumBranch[this.branch]}\\${today}\\${file}`;

            await workBook.xlsx.readFile(fullName);
            let ws = workBook.getWorksheet(1);

            for (let i = 1; i < Infinity; i++) {
                const cell = ws.getRow(i).getCell(2).model.value;
                if (!cell) {
                    ws.getCell(`D${i}`).value = { formula: `SUM(D2:D${i - 1})` };
                    ws.getCell(`E${i}`).value = { formula: `SUM(E2:E${i - 1})` };

                    await workBook.xlsx.writeFile(fullName);
                    break;
                }
            }

            console.log('Finished');
        } catch (err) {
            console.log(err);
        }
    }
}

const exl = new Excel('C:\\Users\\FEENDO\\Desktop\\тест\\', 2);
exl.processDebtors();

// (async function () {
//     await workBook.xlsx.readFile('C:\\Users\\FEENDO\\Desktop\\тест\\feendo\\2020.08.14\\test.xlsx');
//     let ws = workBook.getWorksheet(1);
//     let row = ws.getRow(8);
//     row.getCell(1).value = '0000000000000';
//     row.commit();
//     workBook.xlsx.writeFile('C:\\Users\\FEENDO\\Desktop\\тест\\feendo\\2020.08.14\\test.xlsx');
//     console.log(!row.getCell(1).style.font.bold);
// })();
