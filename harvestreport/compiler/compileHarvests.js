const path = require('path');
const fs = require('fs');
const solc = require('solc');

const harvestsPath = path.resolve(__dirname, '../contracts', 'Harvests.sol');
const source = fs.readFileSync(harvestsPath, 'utf8');

const jsonFolderPath = path.resolve(__dirname, '../abis');
const jsonFilePath = path.resolve(__dirname, '../abis', 'Harvests.json');

const input = {
  language: 'Solidity',
  sources: {
    'Harvests.sol': {
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
  'Harvests.sol'
].Harvests;

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
