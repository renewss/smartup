// const clone = require('rfdc')();

class Time {
    constructor(time = new Date()) {
        this.time = time;
        this.time.setHours(this.time.getHours());

        this.init();
    }
    // method to change object time
    init(offset = 0) {
        this.time.setDate(this.time.getDate() + offset);

        this.day = this.time.getDay();
        this.date = this.time.getDate();
        this.month = this.time.getMonth();
        this.year = this.time.getFullYear();
    }

    // return month in "index starting from 1" format
    getMonthFormat() {
        return `${this.month + 1}`.length === 1 ? `0${this.month + 1}` : this.month + 1;
    }
    getDateFormat() {
        return `${this.date}`.length === 1 ? `0${this.date}` : this.date;
    }

    // returns date in "folder/name" format xxxx.yy.zz
    getCurrent() {
        return `${this.year}.${this.getMonthFormat()}.${this.getDateFormat()}`;
    }

    getTime(offset) {
        this.init(offset); // changing date to yesterday's
        const resp = `${this.year}.${this.getMonthFormat()}.${day}`;
        this.init(-offset); //returning back to today's date

        return resp;
    }
}

module.exports = Time;
