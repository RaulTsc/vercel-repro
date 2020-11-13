import * as v from "../validatorsService";

describe("WHEN testing validatorsService", () => {
  describe("WHEN testing IBAN validator", () => {
    const testSandbox = (value: any, isValid: boolean) => {
      it(`SHOULD have "${value}" ${isValid ? "valid" : "invalid"}`, () =>
        isValid
          ? expect(v.iban()(value)).toBe(undefined)
          : expect(v.iban()(value)).not.toBe(undefined));
    };
    testSandbox("invalid iban", false);
    testSandbox("DE12500105170648489890", true);
    testSandbox("DK5750510001322617", true);
    testSandbox("AT022050302101023600", true);
    testSandbox("CH3908704016075473007", true);
  });

  describe("WHEN testing url validator", () => {
    const testSandbox = (value: any, isValid: boolean) => {
      it(`SHOULD have "${value}" ${isValid ? "valid" : "invalid"}`, () =>
        isValid
          ? expect(v.validUrl(value)).toEqual(undefined)
          : expect(v.validUrl(value)).not.toEqual(undefined));
    };
    testSandbox("invalid iban", false);
    testSandbox("https://www.example.com", true);
    testSandbox("https://www.example.com:9000", true);
    testSandbox("http://www.example.com#up", true);
    testSandbox("http://www.example.com/products?id=1&page=2", true);
    testSandbox("http://www.example.com/products?id=1&page=2", true);
    testSandbox("www.example.com", true);
  });

  describe("WHEN testing dateBetweenDays validator", () => {
    const testSandbox = (
      value: any,
      minDay: number,
      maxDay: number,
      isValid: boolean
    ) => {
      it(`SHOULD have "${value}" between ${minDay} and ${maxDay} days ${
        isValid ? "valid" : "invalid"
      }`, () =>
        isValid
          ? expect(v.dateBetweenDays(minDay, maxDay)(value)).toBe(undefined)
          : expect(v.dateBetweenDays(minDay, maxDay)(value)).not.toBe(
              undefined
            ));
    };
    testSandbox(new Date(), 1, 100, false);
    testSandbox(new Date(), -1, 100, true);
    testSandbox(dateAddDay(10), 1, 365, true);

    let expectedDate = new Date();
    expectedDate.setMilliseconds(0);
    expectedDate.setSeconds(0);
    expectedDate.setMinutes(0);
    expectedDate.setHours(0);
    expectedDate.setDate(expectedDate.getDate() + 1);
    testSandbox(expectedDate, 1, 100, true);

    expectedDate = new Date();
    expectedDate.setMilliseconds(1);
    expectedDate.setSeconds(0);
    expectedDate.setMinutes(0);
    expectedDate.setHours(0);
    expectedDate.setDate(expectedDate.getDate() + 101);
    testSandbox(expectedDate, 1, 100, false);
  });

  describe("WHEN testing ageGreaterThan validator", () => {
    const testSandbox = (value: any, years: number, isValid: boolean) => {
      it(`SHOULD have "${value}" younger than ${years} ${
        isValid ? "valid" : "invalid"
      }`, () =>
        isValid
          ? expect(v.ageGreaterThan(years)(value)).toBe(undefined)
          : expect(v.ageGreaterThan(years)(value)).not.toBe(undefined));
    };

    testSandbox(new Date(), 18, false);
    testSandbox(dateAddYear(-17), 18, false);
    testSandbox(dateAddYear(-19), 18, true);
  });
});

function dateAddDay(day: number, date = new Date()) {
  date.setDate(date.getDate() + day);
  return date;
}

function dateAddYear(year: number, date = new Date()) {
  date.setFullYear(date.getFullYear() + year);
  return date;
}
