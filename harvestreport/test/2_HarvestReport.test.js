const assert = require('assert');

describe('HarvestReport', () => {
    it('instancia contrato', () => {
        assert(harvestreportAddress);
    });

    it('recupera lista de colheitas', async () => {
        const harvestsDeployed = await harvestreport.methods.getDeployedHarvests().call({ from: accounts[0] });
        assert(harvestsDeployed);
    });
});