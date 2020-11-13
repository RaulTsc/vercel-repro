import { getNameInitials } from "../commonService";

describe("GIVEN commonService", () => {
  describe("WHEN calling getNameInitials('Raul Tomescu')", () => {
    it("SHOULD return RT", () => {
      expect(getNameInitials({ firstName: "Raul", lastName: "Tomescu" })).toBe(
        "RT"
      );
    });
  });

  describe("WHEN calling getNameInitials(null)", () => {
    it("SHOULD return ''", () => {
      expect(getNameInitials(null)).toBe("");
    });
  });

  describe("WHEN calling getNameInitials('Raul')", () => {
    it("SHOULD return 'RA'", () => {
      expect(getNameInitials({ firstName: "Raul" })).toBe("RA");
    });
  });

  describe("WHEN calling getNameInitials('R')", () => {
    it("SHOULD return 'R'", () => {
      expect(getNameInitials({ firstName: "R" })).toBe("R");
    });
  });

  describe("WHEN calling getNameInitials('Raul Cristian Tomescu')", () => {
    it("SHOULD return 'RC'", () => {
      expect(
        getNameInitials({ firstName: "Raul", lastName: "Cristian Tomescu" })
      ).toBe("RC");
    });
  });
});
