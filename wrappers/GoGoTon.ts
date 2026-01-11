import {
  Address,
  beginCell,
  Cell,
  Contract,
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
  return beginCell()
    .storeUint(config.number, 32)
    .storeAddress(config.address)
    .storeAddress(config.owner_address)
    .endCell();
}

export class GoGoTon implements Contract {
  constructor(
    readonly address: Address,
    readonly init?: { code: Cell; data: Cell }
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

  async getOwnerAddress(provider: ContractProvider): Promise<Address> {
    const result = await provider.get('get_owner_address', []);
    return result.stack.readAddress();
  }

  async getNumber(provider: ContractProvider): Promise<number> {
    const result = await provider.get('get_number', []);
    return result.stack.readNumber();
  }

  async updateNumber(provider: ContractProvider, via: Sender, value: bigint, newNumber: number) {
    await provider.internal(via, {
      value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell()
        .storeUint(newNumber, 32)
        .endCell(),
    });
  }
}