const xl = require('exceljs');
const { timeFormat } = require('./utils');

const workBook = new xl.Workbook();

class Excel {
    constructor(path, branch) {
        this.path = path;
        this.branch = branch;
        this.today = timeFormat(new Date());
        this.filenames = ['долги.xlsx', 'склад.xlsx'];
        this.enumBranch = ['null', 'main', 'feendo', 'conti'];
    }

    async processDebtors() {
        try {
            const file = `${this.today} ${this.filenames[0]}`;
            const fullName = `${this.path}${this.enumBranch[this.branch]}\\${this.today}\\${file}`;

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
        } catch (err) {
            console.log(err);
        }
    }

    async processWarehouse() {
        const file = `${this.today} ${this.filenames[1]}`;
        const fullName = `${this.path}${this.enumBranch[this.branch]}\\${this.today}\\${file}`;

        await workBook.xlsx.readFile(fullName);
        let ws = workBook.getWorksheet(1);

        for (let i = 8; i < Infinity; i++) {
            const cell = ws.getCell(`A${i}`).model.value;

            if (cell === 'Итого') {
                ws.getCell(`H${i}`).value = { formula: `SUM(H8:H${i - 1})` };

                await workBook.xlsx.writeFile(fullName);
                break;
            } else {
                ws.getCell(`H${i}`).value = { formula: `PRODUCT(F${i}, G${i})` };
            }
        }
    }
}

module.exports = Excel;

// (async function () {
//     await workBook.xlsx.readFile('C:\\Users\\FEENDO\\Desktop\\тест\\feendo\\2020.08.14\\test.xlsx');
//     let ws = workBook.getWorksheet(1);
//     let row = ws.getRow(8);
//     row.getCell(1).value = '0000000000000';
//     row.commit();
//     workBook.xlsx.writeFile('C:\\Users\\FEENDO\\Desktop\\тест\\feendo\\2020.08.14\\test.xlsx');
//     console.log(!row.getCell(1).style.font.bold);
// })();
