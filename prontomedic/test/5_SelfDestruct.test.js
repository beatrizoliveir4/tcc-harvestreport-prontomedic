const assert = require('assert');

describe('Destruição de contratos', () => {
    //Records
    it('não destrói instância de Records, caso não autenticado', async () => {
        try { await record.methods.close().send({ from: accounts[2], gas: gas_limit }); }
        catch(e) { assert(true); return; }
        assert(false);        
    });

    it('destrói instância de Records, caso autenticado', async () => {
        await record.methods.close().send({ from: accounts[0], gas: gas_limit });
        try {const res = await record.methods.owner().call({ from: accounts[0] }); }
        catch(e) { assert(true); return; }
        assert(false);
    });    

    //Patients
    it('não destrói instância de Patients, caso não autenticado', async () => {
        try { await pacient.methods.close().send({ from: accounts[2], gas: gas_limit }); }
        catch(e) { assert(true); return; }
        assert(false);        
    });

    it('destrói instância de Patients, caso autenticado', async () => {
        await pacient.methods.close().send({ from: accounts[0], gas: gas_limit });
        try {const res = await pacient.methods.owner().call({ from: accounts[0] }); }
        catch(e) { assert(true); return; }
        assert(false);
    });    

    //Prontomedic    
    it('não destrói instância de Prontomedic, caso não autenticado', async () => {
        try { await prontomedic.methods.close().send({ from: accounts[2], gas: gas_limit }); }
        catch(e) { assert(true); return; }
        assert(false);        
    });

    it('destrói instância de Prontomedic, caso autenticado', async () => {
        await prontomedic.methods.close().send({ from: accounts[0], gas: gas_limit });
        try {const res = await prontomedic.methods.admin().call({ from: accounts[0] }); }
        catch(e) { assert(true); return; }
        assert(false);
    });

    //Permissions
    it('não destrói instância de Permissions, caso não autenticado', async () => {
        try { await permission.methods.close().send({ from: accounts[2], gas: gas_limit }); }
        catch(e) { assert(true); return; }
        assert(false);        
    });

    it('destrói instância de Permissions, caso autenticado', async () => {
        await permission.methods.close().send({ from: accounts[0], gas: gas_limit });
        try {const res = await permission.methods.admin().call({ from: accounts[0] }); }
        catch(e) { assert(true); return; }
        assert(false);
    });

});