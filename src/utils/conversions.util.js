import { TEMP_UNITS } from "./helpers.util";

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function toCelcius(kelvin) {
    let c = kelvin - 273.15;
    return c.toFixed(0);
}

function toFarenheit(kelvin) {
    let f = (kelvin - 273.15) * 9 / 5 + 32;
    return f.toFixed(0);
}

function fromKelvinToUnit(temp, unit) {
    return unit === TEMP_UNITS.CELCIUS ? toCelcius(temp) : toFarenheit(temp);
}

function toKilometer(meter) {
    return (meter / 1000).toFixed(2);

}

function toMilliseconds(seconds) {
    return (seconds * 1000);
}

function toDisplayDate(milliseconds) {
    let d = new Date(milliseconds);
    return DAYS[d.getUTCDay()] + " " + d.getUTCDate();
}

function fromSecToDisplayDate(seconds) {
    return toDisplayDate(toMilliseconds(seconds))
}

function toDisplayTime(milliseconds) {
    let d = new Date(milliseconds);
    let h = d.getUTCHours();
    let min = d.getUTCMinutes();
    if (('' + min).length === 1)
        min = "0" + JSON.stringify(min);
    const unit = h >= 12 ? 'PM' : 'AM';
    h = (h % 12) || 12;
    if (('' + h).length === 1)
        h = "0" + JSON.stringify(h);
    return h + ":" + min + " " + unit;
}

function fromSecToDisplayTime(seconds) {
    return toDisplayTime(toMilliseconds(seconds));
}

function toDateTime(milliseconds) {
    return toDisplayDate(milliseconds) + " " + toDisplayTime(milliseconds);
}

function fromSecToDateTime(sec) {
    return fromSecToDisplayDate(sec) + " " + fromSecToDisplayTime(sec);
}

const convert = Object.seal({
    toCelcius,
    toFarenheit,
    fromKelvinToUnit,
    toKilometer,
    toMilliseconds,
    toDisplayDate,
    fromSecToDisplayDate,
    toDisplayTime,
    fromSecToDisplayTime,
    toDateTime,
    fromSecToDateTime
});

export default convert;