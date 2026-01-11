import { toNano, Address } from '@ton/core';
import { GoGoTon, GoGoTonConfig } from '../wrappers/GoGoTon';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
  const contract = await compile('GoGoTon');
  
  const myWallet = Address.parse(
    '8Yr0ccwasmoDnh9kbMz0HibyVj_IfXm6SN6JJ1bzVnff',
  );

  const initState: GoGoTonConfig = {
    counter: 0,
    recentSender: myWallet, // При деплое recent_sender = owner
    owner: myWallet, // Владелец контракта
  };

  const goGoTon = GoGoTon.createFromConfig(initState, contract);
  const openedContract = provider.open(goGoTon);

  console.log('Deploying GoGoTon contract...');
  console.log('Contract address:', openedContract.address.toString());
  console.log('Owner:', myWallet.toString());

  await openedContract.sendDeploy(provider.sender(), toNano('0.05'));

  await provider.waitForDeploy(openedContract.address);

  // Проверяем что деплой успешен
  const contractData = await openedContract.getContractData();
  console.log('Deployment successful!');
  console.log('Initial counter:', contractData.counter);
  console.log('Owner address:', contractData.owner.toString());
}
