// @ts-check

const { dirname } = require("path");
const ts = require("typescript");

function findUnusedSymbols(
  /** @type string */ tsconfigPath
) {
  // Initialize a program using the project's tsconfig.json
  const configFile = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
  const parsedConfig = ts.parseJsonConfigFileContent(configFile.config, ts.sys, dirname(tsconfigPath));

  // Initialize a program with the parsed configuration
  const program = ts.createProgram(parsedConfig.fileNames, {
    ...parsedConfig.options,
    noUnusedLocals: true
  });
  const sourceFiles = program.getSourceFiles();
  const usedBaseSourceFiles = sourceFiles.filter(e => e.fileName.includes('src/vs/base/'));
  console.log('Source files used in src/vs/base/:', usedBaseSourceFiles.map(e => e.fileName.replace(/^.+\/src\//, 'src/')).sort((a, b) => a.localeCompare(b)));
}

// Example usage
findUnusedSymbols("./src/browser/tsconfig.json");
