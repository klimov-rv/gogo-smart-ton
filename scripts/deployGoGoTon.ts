import { toNano, address } from '@ton/core';
import { GoGoTon } from '../wrappers/GoGoTon';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
  const contract = await compile('GoGoTon');
  const initState = {
    number: 0,
    address: address('kQDPKoik0b-fi0pGukkc3GjzLgtTmh0118kizMWh4nVo_GpG'),
    owner_address: address('kQDPKoik0b-fi0pGukkc3GjzLgtTmh0118kizMWh4nVo_GpG'),
  };
  const openedGoGoTon = provider.open(
    GoGoTon.createFromConfig(initState, contract),
  );

  await openedGoGoTon.sendDeploy(provider.sender(), toNano('0.05'));

  await provider.waitForDeploy(openedGoGoTon.address);
}
