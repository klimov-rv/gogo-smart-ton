import { toNano } from '@ton/core';
import { GoGoTon } from '../wrappers/GoGoTon';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const goGoTon = provider.open(GoGoTon.createFromConfig({}, await compile('GoGoTon')));

    await goGoTon.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(goGoTon.address);

    // run methods on `goGoTon`
}
