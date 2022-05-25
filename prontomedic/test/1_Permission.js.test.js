const assert = require('assert');

describe('Permissions', () => {
    it('instancia contrato', () => {
        assert(permissionAddress);
    });

    it('adiciona médicos, caso autenticado', async () => {
        await permission.methods.pushDoctor(accounts[1]).send({ from: accounts[0], gas: gas_limit });
    });

    it('não adiciona médicos, caso não autenticado', async () => {
        try { await permission.methods.pushDoctor(accounts[1]).send({ from: accounts[2], gas: gas_limit }); }
        catch(e) { assert(true); return; }
        assert(false);
    });

    it('recupera médicos', async () => {
        const doctorsArray = await permission.methods.getDoctors().call({ from: accounts[0] });
        const last_index = doctorsArray.length  - 1;
        assert.equal(doctorsArray[last_index], accounts[1]);        
    });

    it('não recupera médicos, caso não autenticado', async () => {
        try { const doctorsArray = await permission.methods.getDoctors().call({ from: accounts[1] }); }
        catch(e) { assert(true); return; }
        assert(false);       
    });

    it('autentica, caso administrador', async () => {
        let res = await permission.methods.onlyAdmin(accounts[0]).call({ from: accounts[0] });
        assert(res);
        res = await permission.methods.onlyAdmin(accounts[1]).call({ from: accounts[0] });
        assert(!res);
    });

    it('autentica, caso médico', async () => {
        let res = await permission.methods.onlyDoctor(accounts[0]).call({ from: accounts[0] });
        assert(res);
        res = await permission.methods.onlyDoctor(accounts[1]).call({ from: accounts[0] });
        assert(res);
        res = await permission.methods.onlyDoctor(accounts[2]).call({ from: accounts[0] });
        assert(!res);
    });
});