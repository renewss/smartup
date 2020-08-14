const pptr = require('puppeteer');
const { timeFormat } = require('./utils');
const files = require('./fileSystem');

class Smartup {
    constructor(downloadPath) {
        this.path = downloadPath;
        this.folder = timeFormat(new Date());
        this.branch = 2;
        this.enumBranch = ['null', 'main', 'feendo', 'conti']; // 'null' for matching browser html count system
        this.fnOld = [
            'Взаиморасчеты с клиентами.xlsx',
            'Сводный+отчёт+по+складам.xlsx',
            'Д.Долг Феендо.xlsx',
            'наличка.xlsx',
        ];
        this.fnNew = ['долги.xlsx', 'склад.xlsx', 'Д.Долг Феендо.xlsx', 'наличка.xlsx'];
    }
    fullPath(dateFolder = this.folder) {
        return `${this.path}${this.enumBranch[this.branch]}\\${dateFolder}\\`;
    }

    async init() {
        this.browser = await pptr.launch({
            headless: false,
        });

        this.page = await this.browser.newPage();
        await this.page.setViewport({ width: 1366, height: 768 });
    }

    async login() {
        await this.page.goto('https://feendopeak.smartup.one/login.html');
        await this.page.type('input.form-control[type="text"]', process.env.LOGIN);
        await this.page.type('input.form-control[type="password"]', process.env.PASSWORD);
        await this.page.click('button.btn[type="submit"]');
        await this.page.waitFor('li.dropdown-module');
        await this.page.waitFor(2000);
    }

    async changeBranch(branch) {
        await this.page.click('li.dropdown-module > a');
        await this.page.waitFor(1000);
        await this.page.click(`li.dropdown-module > ul > li:nth-child(${branch})`);
        await this.page.waitFor(2000);

        this.branch = branch;
    }

    // internal method to navigate inside branches through navbar
    async navigate(nav) {
        await this.page.click(`ul.nav > li:nth-child(${nav[0]})`);

        await this.page.waitFor(1000);
        await this.page.click(
            `ul.nav > li:nth-child(${nav[0]}) > ul > li > div > div:nth-child(2) > ul:nth-child(${nav[1]}) > li:nth-child(${nav[2]}) > a`,
        );
        await this.page.waitFor(1500);
    }

    async getDebtors() {
        await this.navigate([4, 1, 1]);
        await this.page.click('div.input-group-btn > div:nth-child(5)');

        // setting download path, works for next downloads also
        await this.page._client.send('Page.setDownloadBehavior', {
            behavior: 'allow',
            downloadPath: this.fullPath(),
        });

        await this.page.click('div.input-group-btn > div:nth-child(5) > ul > li:nth-child(3)');
        await this.page.waitFor(2000);
        // change file location and name
        await files.rename(`${this.fullPath()}${this.fnOld[0]}`, `${this.fullPath()}${this.folder} ${this.fnNew[0]}`);
    }

    async getWarehouse(warehouses, price) {
        // navigation
        await this.navigate([3, 4, 2]);
        await this.page.click('form.form-horizontal > div:nth-child(2) > div:nth-child(2) > div > div > span > input');

        // selecting warehouses
        await this.page.click(
            'form.form-horizontal > div:nth-child(2) > div:nth-child(2) > div > div > div > b-input-multiple > div > input',
        );
        await this.page.waitFor(200);
        warehouses.forEach(async (el) => {
            await this.page.click(
                `form.form-horizontal > div:nth-child(2) > div:nth-child(2) > div > div > div > b-input-multiple > div:nth-child(2) > div > div > div > div > div:nth-child(${el})`,
            );
        });

        // selecting price type
        await this.page.waitFor(200);
        await this.page.click(
            'form.form-horizontal > div:nth-child(2) > div:nth-child(5) > div > div > div > div > b-input > div',
        );
        await this.page.waitFor(200);
        await this.page.click(
            `form.form-horizontal > div:nth-child(2) > div:nth-child(5) > div > div > div > div > b-input > div > div > div > div > div > div:nth-child(${price})`,
        );

        // pressing on download button
        await this.page.waitFor(200);
        await this.page.click(`form.form-horizontal > div:nth-child(2) > div:nth-child(9) > div > button:nth-child(3)`);
        await this.page.waitFor(2000);
        // change file location and name
        await files.rename(`${this.fullPath()}${this.fnOld[1]}`, `${this.fullPath()}${this.folder} ${this.fnNew[1]}`);
    }

    async getCredit() {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        files.copy(
            `${this.fullPath(timeFormat(yesterday))}${timeFormat(yesterday)} ${this.fnOld[2]}`,
            `${this.fullPath(timeFormat(new Date()))}${this.folder} ${this.fnNew[2]}`,
        );
    }

    async getCash() {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        files.copy(
            `${this.fullPath(timeFormat(yesterday))}${timeFormat(yesterday)} ${this.fnOld[3]}`,
            `${this.fullPath(timeFormat(new Date()))}${this.folder} ${this.fnNew[3]}`,
        );
    }
}
// TODO copy functions problem with date

module.exports = Smartup;
