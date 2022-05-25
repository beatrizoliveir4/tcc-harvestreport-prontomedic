const ganache = require('ganache-cli');
const options = { gasLimit: 672197500 };
const Web3 = require('web3');
const web3 = new Web3(ganache.provider(options));

const compiler = require('../compiler/index');
const permissionsCompiled = compiler.permissionsCompiled;
const prontomedicCompiled = compiler.prontomedicCompiled;
const patientsCompiled = compiler.patientsCompiled;
const recordsCompiled = compiler.recordsCompiled;

before(async () => {
    global.gas_limit = '100000000';

    global.accounts = await web3.eth.getAccounts();

    //Instância de Permissions
    global.permission = await new web3.eth.Contract(permissionsCompiled.abi)
      .deploy({
        data: permissionsCompiled.evm.bytecode.object,
        arguments: [],
      })
      .send({ from: accounts[0], gas: gas_limit });
    global.permissionAddress = permission.options.address;

    //Instância de Prontomedic
    global.prontomedic = await new web3.eth.Contract(prontomedicCompiled.abi)
      .deploy({
        data: prontomedicCompiled.evm.bytecode.object,
        arguments: [permissionAddress],
      })
      .send({ from: accounts[0], gas: gas_limit });
    global.prontomedicAddress = prontomedic.options.address;
    
    //Instância de Patients
    global.pacient = await new web3.eth.Contract(patientsCompiled.abi)
      .deploy({
          data: patientsCompiled.evm.bytecode.object,
          arguments: [27111998,'','','','',permissionAddress,prontomedicAddress]
      })
      .send({from: accounts[0], gas: gas_limit });
    global.pacientAddress = pacient.options.address;

    //Instância de Records
    global.record = await new web3.eth.Contract(recordsCompiled.abi)
      .deploy({
          data: recordsCompiled.evm.bytecode.object,
          arguments: [permissionAddress, pacientAddress, 1, 18052022, '', []]
      })
      .send({from: accounts[0], gas: gas_limit });
    recordAddress = record.options.address;
});





