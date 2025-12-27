import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { GoGoTon } from '../wrappers/GoGoTon';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('GoGoTon', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('GoGoTon');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let goGoTon: SandboxContract<GoGoTon>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        goGoTon = blockchain.openContract(GoGoTon.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await goGoTon.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: goGoTon.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and goGoTon are ready to use
    });
});
