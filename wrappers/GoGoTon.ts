import {
  Address,
  beginCell,
  Cell,
  Contract,
  ContractABI,
  contractAddress,
  ContractProvider,
  Sender,
  SendMode,
} from '@ton/core';

export type GoGoTonConfig = {
  number: number;
  address: Address;
  owner_address: Address;
};

export function goGoTonConfigToCell(config: GoGoTonConfig): Cell {
  return beginCell().endCell();
}

export class GoGoTon implements Contract {
  abi: ContractABI = { name: 'GoGoTon' };

  constructor(
    readonly address: Address,
    readonly init?: { code: Cell; data: Cell },
  ) {}

  static createFromAddress(address: Address) {
    return new GoGoTon(address);
  }

  static createFromConfig(config: GoGoTonConfig, code: Cell, workchain = 0) {
    const data = goGoTonConfigToCell(config);
    const init = { code, data };
    return new GoGoTon(contractAddress(workchain, init), init);
  }

  async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
    await provider.internal(via, {
      value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell().endCell(),
    });
  }
}
