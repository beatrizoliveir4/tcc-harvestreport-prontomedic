const ganache = require('ganache-cli');
const options = { gasLimit: 672197500 };
const Web3 = require('web3');
const web3 = new Web3(ganache.provider(options));

const compiler = require('../compiler/index');
const permissionsCompiled = compiler.permissionsCompiled;
const harvestReportCompiled = compiler.HarvestReportCompiled;
const harvestsCompiled = compiler.HarvestsCompiled;


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

    //Instância de HarvestReport
    global.harvestreport = await new web3.eth.Contract(harvestReportCompiled.abi)
      .deploy({
        data: harvestReportCompiled.evm.bytecode.object,
        arguments: [permissionAddress],
      })
      .send({ from: accounts[0], gas: gas_limit });
    global.harvestreportAddress = harvestreport.options.address;
    
    //Instância de Harvests
    global.harvest = await new web3.eth.Contract(harvestsCompiled.abi)
      .deploy({
          data: harvestsCompiled.evm.bytecode.object,
          arguments: [harvestreportAddress, 1, 'Milho', 10000, '']          
      })
      .send({from: accounts[0], gas: gas_limit });
    global.harvestAddress = harvest.options.address;
});





