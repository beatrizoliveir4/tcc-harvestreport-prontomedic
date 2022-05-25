const assert = require('assert');

describe('Records', () => {
    it('instancia contrato', () => {
        assert(recordAddress);
    });

    it('insere registro no vetor do paciente, caso autenticado', async () => {
        const patientRecords = await pacient.methods.getRecords().call({ from: accounts[0] });
        const last_index = patientRecords.length  - 1;
        assert.equal(patientRecords[last_index], recordAddress);      
    });

    it('altera registro, caso autenticado', async () => {
        const description = 'Reclamação de dores';

        await record.methods.setRecord(
            description,
            []
        ).send({ from: accounts[0], gas: gas_limit });

        const recordDescription = await record.methods.getRecord().call({ from: accounts[0] });
        assert.equal(recordDescription.description, description);
    });

    it('não altera registro, não caso autenticado', async () => {
        try { await record.methods.setRecord('',[]).send({ from: accounts[2], gas: gas_limit }); }
        catch(e) { assert(true); return; }
        assert(false);
    });  

    it('recupera registro', async () => {
        const recordObject = await record.methods.getRecord().call({ from: accounts[0] });
        assert(recordObject);
    });

    it('não recupera registro, não caso autenticado', async () => {
        try { const recordObject = await record.methods.getRecord().call({ from: accounts[2] }); }
        catch(e) { assert(true); return; }
        assert(false);
    });
});