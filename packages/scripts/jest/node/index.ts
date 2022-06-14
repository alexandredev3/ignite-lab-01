export default {
  clearMocks: true,
  coverageProvider: "v8",
  maxWorkers: "50%",
  moduleDirectories: ['node_modules', 'src'],
  rootDir: "./src",
  testMatch: [
    "**/*.test.ts",
  ],
  testPathIgnorePatterns: [
    "/node_modules/"
  ],
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  transformIgnorePatterns: [
    "/node_modules/",
    "\\.pnp\\.[^\\/]+$"
  ],
};
