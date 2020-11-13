import {
  formatInputString,
  ensureValueIsNumber,
} from "./../NumberTextField.utilities";

const testSandboxFormatInputString = (
  value: string | null,
  expectedValue: number | string | null
) => {
  it(`SHOULD return ${expectedValue} for value=${value}`, () => {
    expect(formatInputString(value as string)).toBe(expectedValue);
  });
};

const testSandboxEnsureValueIsNumber = (
  value: string | number | null,
  expectedValue: number | string | null
) => {
  it(`SHOULD return ${expectedValue} for value=${value}`, () => {
    expect(ensureValueIsNumber(value as string)).toBe(expectedValue);
  });
};

describe("WHEN testing NumberTextField.utilities.test", () => {
  describe("WHEN testing formatInputString", () => {
    testSandboxFormatInputString(null, null);
    testSandboxFormatInputString("123", 123);
    testSandboxFormatInputString("0,50", 0.5);
    testSandboxFormatInputString("999,99", 999.99);
    testSandboxFormatInputString("10.000,12", 10000.12);
    testSandboxFormatInputString("1.000,50", 1000.5);
    testSandboxFormatInputString("1.000.000,24", 1000000.24);
    testSandboxFormatInputString("1.000.000,2356", 1000000.2356);
    testSandboxFormatInputString("1.000.000,235610", 1000000.23561);
    testSandboxFormatInputString("1.000.000,20", 1000000.2);
    testSandboxFormatInputString("1.000.000", 1000000);
    testSandboxFormatInputString("", null);
    testSandboxFormatInputString("as", null);
    testSandboxFormatInputString("1..", 1);
    testSandboxFormatInputString("1,", "1,");
    testSandboxFormatInputString("1,,", "1,");
    testSandboxFormatInputString("1,1,", 1.1);
    testSandboxFormatInputString("1,0", "1,0");
  });

  describe("WHEN testing ensureValueIsNumber", () => {
    testSandboxEnsureValueIsNumber(null, null);
    testSandboxEnsureValueIsNumber(123, 123);
    testSandboxEnsureValueIsNumber("123", 123);
    testSandboxEnsureValueIsNumber("0,50", 0.5);
    testSandboxEnsureValueIsNumber("999,99", 999.99);
    testSandboxEnsureValueIsNumber("10.000,12", 10000.12);
    testSandboxEnsureValueIsNumber("1.000,50", 1000.5);
    testSandboxEnsureValueIsNumber("1.000.000,24", 1000000.24);
    testSandboxEnsureValueIsNumber("1.000.000,2356", 1000000.2356);
    testSandboxEnsureValueIsNumber("1.000.000,235610", 1000000.23561);
    testSandboxEnsureValueIsNumber("1.000.000,20", 1000000.2);
    testSandboxEnsureValueIsNumber("1.000.000", 1000000);
    testSandboxEnsureValueIsNumber("1.000.000.", 1000000);
    testSandboxEnsureValueIsNumber("", null);
    testSandboxEnsureValueIsNumber("as", null);
    testSandboxEnsureValueIsNumber("1..", 1);
    testSandboxEnsureValueIsNumber("1,", 1);
    testSandboxEnsureValueIsNumber("1,,", 1);
    testSandboxEnsureValueIsNumber("1,1", 1.1);
    testSandboxEnsureValueIsNumber("1,0", 1);
    testSandboxEnsureValueIsNumber("1,05", 1.05);
    testSandboxEnsureValueIsNumber("1,50", 1.5);
  });
});
