const { pathsToModuleNameMapper } = require('ts-jest/utils');

// const { defaults: tsjPreset } = require('ts-jest/presets');
// const { jsWithTs: tsjPreset } = require('ts-jest/presets');
// const { jsWithBabel: tsjPreset } = require('ts-jest/presets');
// console.log(tsjPreset.transform);

const { compilerOptions } = require("./tsconfig");
// const fs = require("fs");
// const compilerOptions = JSON.parse(fs.readFileSync("./tsconfig.json", { encoding: "utf8" })).compilerOptions;

const pathMaps = pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/" } );
// console.log(pathMaps);
const moduleNameMapper = {
    "readium-desktop/main/di": "<rootDir>/test/main/di.ts", // se src/common/utils.ts convertMultiLangStringToString()
    ...pathMaps,
    // ...{
    //     "^@r2\\-streamer\\-js/(.*)$": "<rootDir>/scripts/jest_void.ts",
    //     "^@r2\\-navigator\\-js/(.*)$": "<rootDir>/scripts/jest_void.ts",
    // },
};
// console.log(moduleNameMapper);

module.exports = {
    verbose: true,
    testEnvironment: "node",
    preset: "ts-jest",
    globals: {
        "ts-jest": {
            babelConfig: false,
            tsConfig: "<rootDir>/tsconfig.json",
        }
    },
    transform: {
        "\\.ts$": "<rootDir>/scripts/jest_preprocessor.js",
        // ...tsjPreset.transform,
        // "^.+\\.tsx?$": ["ts-jest", {}],
    },
    transformIgnorePatterns: ["<rootDir>/node_modules/"],
    moduleNameMapper,
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
    ],
    testPathIgnorePatterns: [
        "<rootDir>/node_modules/",
        "<rootDir>/dist/",
        "<rootDir>/src/",
    ],
    setupFilesAfterEnv: ['<rootDir>/scripts/jest_setup.js'],
    // runner: '@jest-runner/electron/main', // package.json dev dep: @jest-runner/electron
};
