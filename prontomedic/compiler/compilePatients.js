const path = require('path');
const fs = require('fs');
const solc = require('solc');

const patientsPath = path.resolve(__dirname, '../contracts', 'Patients.sol');
const source = fs.readFileSync(patientsPath, 'utf8');

const jsonFolderPath = path.resolve(__dirname, '../abis');
const jsonFilePath = path.resolve(__dirname, '../abis', 'Patients.json');

const input = {
  language: 'Solidity',
  sources: {
    'Patients.sol': {
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
  'Patients.sol'
].Patients;

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
