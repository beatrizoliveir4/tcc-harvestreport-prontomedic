const assert = require('assert');

describe('Prontomedic', () => {
    it('instancia contrato', () => {
        assert(prontomedicAddress);
    });

    it('recupera lista de pacientes', async () => {
        const patientsDeployed = await prontomedic.methods.getDeployedPatients().call({ from: accounts[0] });
        assert(patientsDeployed);
    });
});