const fs = require('fs');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const compiler = require('./compiler/index');
const permissionsCompiled = compiler.permissionsCompiled;
const harvestReportCompiled = compiler.HarvestReportCompiled;


provider = new HDWalletProvider( // frase mnemônica e servidor RCP gerados pelo ganache
  'tobacco kid move exile model unveil text unveil mind feature proud surround',
  'http://127.0.0.1:7545'
);

const web3 = new Web3(provider);

const gas_limit = '100000000';

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

    //Instância de Permissions
    const permission = await new web3.eth.Contract(permissionsCompiled.abi)
      .deploy({
        data: permissionsCompiled.evm.bytecode.object,
        arguments: [],
      })
      .send({ from: accounts[0], gas: gas_limit });
    const permissionAddress = permission.options.address;

    //Instância de HarvestReport
    const harvestreport = await new web3.eth.Contract(harvestReportCompiled.abi)
      .deploy({
        data: harvestReportCompiled.evm.bytecode.object,
        arguments: [permissionAddress],
      })
      .send({ from: accounts[0], gas: gas_limit });
      const harvestreportAddress = harvestreport.options.address;


  //arquivo basic_config.json com endereços do admin, contrato
  //de controle de acesso e contrato de lista de colheitas
  const json = JSON.stringify({admin: accounts[0], permissionAddress, harvestreportAddress});
  fs.writeFile('./basic_config.json', json, 'utf8', (err) => {});
  provider.engine.stop();
};
deploy();
