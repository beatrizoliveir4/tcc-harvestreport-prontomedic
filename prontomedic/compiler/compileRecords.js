const path = require('path');
const fs = require('fs');
const solc = require('solc');

const recordsPath = path.resolve(__dirname, '../contracts', 'Records.sol');
const source = fs.readFileSync(recordsPath, 'utf8');

const jsonFolderPath = path.resolve(__dirname, '../abis');
const jsonFilePath = path.resolve(__dirname, '../abis', 'Records.json');

const input = {
  language: 'Solidity',
  sources: {
    'Records.sol': {
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
  'Records.sol'
].Records;

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