import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["src/test-utils", "dist"],
  testPathIgnorePatterns: ["src/test-utils", "dist"],
};

export default config;
