const Time = require('./time');

const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
];

class File {
    constructor(downloadPath, branch, copyFromOffset = -1) {
        this.time = new Time(new Date());
        this.path = `${downloadPath}${branch}\\${months[this.time.month]}\\${this.time.getCurrent()}\\`;

        // case for Monday (as Sunday not work day)
        if (this.time.day === 1) copyFromOffset = -2;
        // case when offset larger than the day of month is also considered ("template copy from" folder is in previous month)

        this.time.init(copyFromOffset);
        const month = months[this.time.month];
        this.copyFrom = `${downloadPath}${branch}\\${months[this.time.month]}\\${this.time.getCurrent()}`; // previous folder path to copy templates from

        // file names
        this.fnOld = [
            'Взаиморасчеты с клиентами.xlsx',
            'Сводный+отчёт+по+складам.xlsx',
            'Д.Долг Феендо.xlsx',
            'наличка.xlsx',
        ];
        this.fnNew = ['долги.xlsx', 'склад.xlsx', 'Д.Долг Феендо.xlsx', 'наличка.xlsx'];
    }
}

const t = new File('~base\\', 'Feendo', -18);
console.log(t.path, t.copyFrom);
