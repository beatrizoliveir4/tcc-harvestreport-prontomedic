const assert = require('assert');

describe('Harvests', () => {
    it('instancia contrato', () => {
        assert(harvestAddress);
    });

    it('resgata informações básicas da colheita', async () => {
        const getBasicInformation = await harvest.methods.getBasicInformation().call({ from: accounts[0] });
        assert(getBasicInformation);
    });

    it('insere registro no vetor do HarvestReport, caso autenticado', async () => {
        const deployedHarvests = await harvestreport.methods.getDeployedHarvests().call({ from: accounts[0] });
        const last_index = deployedHarvests.length  - 1;
        assert.equal(deployedHarvests[last_index], harvestAddress);      
    }); 


    it('insere registro de distribuição da colheira', async () => {
        await harvest.methods.pushDistribution(1, 500,'','','').send({ from: accounts[0], gas: gas_limit });
        const distributionId = await harvest.methods.getDistribution().call({ from: accounts[0] });
        assert.equal(distributionId[0].id, 1);
    });

    it('resgata distribuições da colheita', async () => {
        const harvestsDistributions = await harvest.methods.getDistribution().call({ from: accounts[0] });
        const length = harvestsDistributions.length;
        assert.notEqual(length,0);
    });

    it('insere reporte de segurança sobre a distribuição', async () => {
        await harvest.methods.pushSafetyReport(1,1,'').send({ from: accounts[0], gas: gas_limit });
        const safetyReportId = await harvest.methods.getSafetyReport().call({ from: accounts[0] });
        assert.equal(safetyReportId[0].id, 1);
    });

    it('resgata reporte de segurança sobre a distribuição', async () => {
        const safetyReports = await harvest.methods.getSafetyReport().call({ from: accounts[0] });
        const length = safetyReports.length;
        assert.notEqual(length,0);
    });

});