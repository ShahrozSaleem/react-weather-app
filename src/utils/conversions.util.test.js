import convert from "./conversions.util";
import { TEMP_UNITS } from "./helpers.util";

test('should test conversions', () => {

    // kelvin => celcius
    expect(convert.toCelcius(289.36)).toBe(16.21.toFixed(0));
    expect(convert.toCelcius(287.07)).toBe(13.92.toFixed(0));

    // kelvin => farenheit
    expect(convert.toFarenheit(289.36)).toBe(61.178.toFixed(0));
    expect(convert.toFarenheit(287.07)).toBe(57.056.toFixed(0));

    // kelvin => given temp unit
    expect(convert.fromKelvinToUnit(289.36, TEMP_UNITS.CELCIUS)).toBe(16.21.toFixed(0));
    expect(convert.fromKelvinToUnit(289.36, TEMP_UNITS.FARENHEIT)).toBe(61.178.toFixed(0));

    // meter => kilometer
    expect(convert.toKilometer(3456)).toBe(3.456.toFixed(2));
    expect(convert.toKilometer(9222)).toBe(9.222.toFixed(2));

    // seconds => milliseconds
    expect(convert.toMilliseconds(1627757513)).toBe(1627757513000);
    expect(convert.toMilliseconds(1627786800)).toBe(1627786800000);

    // milliseconds => display date
    expect(convert.toDisplayDate(1627757513000)).toBe("Sat 31");
    // seconds => display date
    expect(convert.fromSecToDisplayDate(1627757513)).toBe("Sat 31");

    // milliseconds => display time
    expect(convert.toDisplayTime(1627757513000)).toBe("06:51 PM");
    // seconds => display time
    expect(convert.fromSecToDisplayTime(1627757513)).toBe("06:51 PM");

    // milliseconds => display date time
    expect(convert.toDateTime(1627757513000)).toBe("Sat 31 06:51 PM");
    // seconds => display date time
    expect(convert.fromSecToDateTime(1627757513)).toBe("Sat 31 06:51 PM");
});
