const assert = require('assert');

describe('Patients', () => {
    it('instancia contrato', async () => {
        assert(pacientAddress);
    });

    it('insere registro no vetor de Prontomedic, caso autenticado', async () => {
        const patientsDeployed = await prontomedic.methods.getDeployedPatients().call({ from: accounts[0] });
        const last_index = patientsDeployed.length  - 1;
        assert.equal(patientsDeployed[last_index], pacientAddress);      
    });
   
    it('altera informações básicas, caso autenticado', async () => {
        const observation = "Observação";
        await pacient.methods.setBasicInformation(
            27111998,
            'doc123456',
            'Beatriz Oliveira',
            'F',
            observation
        ).send({ from: accounts[0], gas: gas_limit });
        const pacientObservation = await pacient.methods.getBasicInformation().call({ from: accounts[0] });
        assert.equal(pacientObservation.observation, observation);
    });

    it('não altera informações básicas, caso não autenticado', async () => {
        try { await pacient.methods.setBasicInformation(0,'','','','').send({ from: accounts[2], gas: gas_limit }); }
        catch(e) { assert(true); return; }
        assert(false);
    });

    it('recupera informações básicas, caso autenticado', async () => {
        const pacientObject = await pacient.methods.getBasicInformation().call({ from: accounts[0] });
        assert(pacientObject);
    });

    it('não recupera informações básicas, caso não autenticado', async () => {
        try { const pacientObject = await pacient.methods.getBasicInformation().call({ from: accounts[2] }); }
        catch(e) { assert(true); return; }
        assert(false);
    });

    it('recupera lista de registros, caso autenticado', async () => {
        const recordsArray = await pacient.methods.getRecords().call({ from: accounts[0] });
        assert(recordsArray);
    });
    it('não recupera lista de registros, caso não autenticado', async () => {
        try { const recordsArray = await pacient.methods.getRecords().call({ from: accounts[2] }); }
        catch(e) { assert(true); return; }
        assert(false);
    });
});