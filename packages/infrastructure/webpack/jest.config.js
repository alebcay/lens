const {
  configForNode: { coverageThreshold, ...config },
} = require("@meniscus/jest").monorepoPackageConfig(__dirname);

module.exports = config;
