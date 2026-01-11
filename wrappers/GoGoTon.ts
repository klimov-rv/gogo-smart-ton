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
  counter: number;
  recentSender: Address;
  owner: Address;
};

export function goGoTonConfigToCell(config: GoGoTonConfig): Cell {
  return beginCell()
    .storeUint(config.counter, 32)
    .storeAddress(config.recentSender)
    .storeAddress(config.owner)
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

  async sendIncrement(provider: ContractProvider, via: Sender, value: bigint) {
    await provider.internal(via, {
      value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell()
        .storeUint(1, 32) // op = 1
        .endCell(),
    });
  }

  async sendDeposit(provider: ContractProvider, via: Sender, value: bigint) {
    await provider.internal(via, {
      value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell()
        .storeUint(2, 32) // op = 2
        .endCell(),
    });
  }

  async sendWithdraw(
    provider: ContractProvider,
    via: Sender,
    value: bigint,
    withdrawAmount: bigint
  ) {
    await provider.internal(via, {
      value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell()
        .storeUint(3, 32) // op = 3
        .storeCoins(withdrawAmount)
        .endCell(),
    });
  }

  async getContractData(provider: ContractProvider) {
    const result = await provider.get('get_contract_storage_data', []);
    return {
      counter: result.stack.readNumber(),
      recentSender: result.stack.readAddress(),
      owner: result.stack.readAddress(),
    };
  }

  async getCounter(provider: ContractProvider): Promise<number> {
    const result = await provider.get('get_counter', []);
    return result.stack.readNumber();
  }

  async getOwner(provider: ContractProvider): Promise<Address> {
    const result = await provider.get('get_owner', []);
    return result.stack.readAddress();
  }

  async getRecentSender(provider: ContractProvider): Promise<Address> {
    const result = await provider.get('get_recent_sender', []);
    return result.stack.readAddress();
  }
}