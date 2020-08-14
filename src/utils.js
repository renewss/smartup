exports.timeFormat = (time) => {
    const year = 1900 + time.getYear(); // getYear function() returns 120 for 2020
    const month = `${time.getMonth() + 1}`.length === 1 ? '0' + `${time.getMonth() + 1}` : time.getMonth() + 1; // starts from 0
    const day = `${time.getDate()}`.length === 1 ? '0' + `${time.getDate()}` : time.getDate();

    return `${year}.${month}.${day}`;
};
