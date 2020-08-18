const clone = require('rfdc')();

class Time {
    constructor(time = new Date()) {
        this.time = time;
        this.time.setHours(this.time.getHours() + 5);
    }

    // returns date in "folder/name" format xxxx.yy.zz
    getCurrent() {
        const year = 1900 + this.time.getYear(); // getYear function() returns 120 for 2020
        const month =
            `${this.time.getMonth() + 1}`.length === 1 ? '0' + `${this.time.getMonth() + 1}` : this.time.getMonth() + 1; // starts from 0
        const day = `${this.time.getDate()}`.length === 1 ? '0' + `${this.time.getDate()}` : this.time.getDate();

        return `${year}.${month}.${day}`;
    }

    getYesterday() {
        const t = clone(this.time);
        t.setDate(t.getDate() - 1);

        const year = 1900 + t.getYear(); // getYear function() returns 120 for 2020
        const month = `${t.getMonth() + 1}`.length === 1 ? '0' + `${t.getMonth() + 1}` : t.getMonth() + 1; // starts from 0
        const day = `${t.getDate()}`.length === 1 ? '0' + `${t.getDate()}` : t.getDate();

        return `${year}.${month}.${day}`;
    }
}

module.exports = Time;
