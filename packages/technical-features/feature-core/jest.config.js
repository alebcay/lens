let config = require("@meniscus/jest").monorepoPackageConfig(__dirname).configForReact;
config.coverageProvider = "babel";
module.exports = config;
