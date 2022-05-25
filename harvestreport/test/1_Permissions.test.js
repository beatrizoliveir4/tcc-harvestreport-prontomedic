const assert = require('assert');

describe('Permissions', () => {
    it('instancia contrato', () => {
        assert(permissionAddress);
    });

    it('adiciona usuários autorizados, caso autenticado', async () => {
        await permission.methods.pushAuthorized(accounts[1]).send({ from: accounts[0], gas: gas_limit });
    });

    it('não adiciona usuários autorizados, caso não autenticado', async () => {
        try { await permission.methods.pushAuthorized(accounts[1]).send({ from: accounts[2], gas: gas_limit }); }
        catch(e) { assert(true); return; }
        assert(false);
    });

    it('recupera usuários autorizados', async () => {
        const doctorsArray = await permission.methods.getAuthorized().call({ from: accounts[0] });
        const last_index = doctorsArray.length  - 1;
        assert.equal(doctorsArray[last_index], accounts[1]);        
    });

    it('não recupera usuários autorizados, caso não autenticado', async () => {
        try { const doctorsArray = await permission.methods.getAuthorized().call({ from: accounts[1] }); }
        catch(e) { assert(true); return; }
        assert(false);       
    });

    it('autentica, caso administrador', async () => {
        let res = await permission.methods.onlyAdmin(accounts[0]).call({ from: accounts[0] });
        assert(res);
        res = await permission.methods.onlyAdmin(accounts[1]).call({ from: accounts[0] });
        assert(!res);
    });

    it('autentica, caso usuário', async () => {
        let res = await permission.methods.onlyAuthorized(accounts[0]).call({ from: accounts[0] });
        assert(res);
        res = await permission.methods.onlyAuthorized(accounts[1]).call({ from: accounts[0] });
        assert(res);
        res = await permission.methods.onlyAuthorized(accounts[2]).call({ from: accounts[0] });
        assert(!res);
    });
});