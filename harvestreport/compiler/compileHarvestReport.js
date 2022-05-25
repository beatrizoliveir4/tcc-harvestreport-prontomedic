const path = require('path');
const fs = require('fs');
const solc = require('solc');

const harvestreportPath = path.resolve(__dirname, '../contracts', 'HarvestReport.sol');
const source = fs.readFileSync(harvestreportPath, 'utf8');

const jsonFolderPath = path.resolve(__dirname, '../abis');
const jsonFilePath = path.resolve(__dirname, '../abis', 'HarvestReport.json');

const input = {
  language: 'Solidity',
  sources: {
    'HarvestReport.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

const compiler = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
  'HarvestReport.sol'
].HarvestReport;

const compiled = {
  abi: compiler.abi,
  bytecode: compiler.evm.bytecode.object
}

const json = JSON.stringify(compiled);
if (!fs.existsSync(jsonFolderPath)){
  fs.mkdirSync(jsonFolderPath);
}
fs.writeFile(jsonFilePath, json, 'utf8', (err) => {});

module.exports = compiler;
