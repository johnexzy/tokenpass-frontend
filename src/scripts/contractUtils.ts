import { BigNumber, Contract, utils } from 'ethers';
// import { checkIfWalletIsConnected } from './wallet_util';
import { userStore, userGettersStore } from '../stores/types/storeTypes';
import { Store } from 'pinia';
import abi from './abi';
import { TransactionResponse } from '@ethersproject/abstract-provider';

export default class TokenUtils {
  contractAddress: string;
  store: Store<'user', userStore, userGettersStore>;
  token_standard: 'erc20' | 'erc721' | 'erc1155';
  constructor(
    $store: Store<'user', userStore, userGettersStore>,
    token_standard: 'erc20' | 'erc721' | 'erc1155',
    contract_address: string
  ) {
    this.contractAddress = contract_address;
    this.token_standard = token_standard;
    this.store = $store;
  }
  // async initializeSinger(): Promise<Wallet> {
  //   return await this.wallet.connect(this.provider);
  // }
  async connectedContract(): Promise<Contract | boolean> {
    try {
      const connectedContract = new Contract(
        this.contractAddress,
        abi[this.token_standard],
        this.store.provider
      );
      if (((await this.connectedContract()) as Contract).name()) {
        return connectedContract;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
  static isValidAddress(address: string): boolean {
    return utils.isAddress(address);
  }
  // async getCode(): Promise<string> {
  //   const bytecode = await this.provider.getCode(this.contractAddress);
  //   return bytecode;
  // }
  async getTokenName(): Promise<string> {
    return ((await this.connectedContract()) as Contract).name();
  }
  async getTokenSymbol(): Promise<string> {
    return ((await this.connectedContract()) as Contract).symbol();
  }
  async getTokenDecimal(): Promise<string> {
    return ((await this.connectedContract()) as Contract).decimals();
  }
  async getTokenBalance(): Promise<BigNumber> {
    return ((await this.connectedContract()) as Contract).balanceOf(
      this.store.Account
    );
  }
  async getTotalSupply(): Promise<BigNumber> {
    return ((await this.connectedContract()) as Contract).totalSupply();
  }
  async transfer(
    address: string,
    amount: string
  ): Promise<TransactionResponse> {
    const tx: TransactionResponse = (
      (await this.connectedContract()) as Contract
    ).transfer(address, utils.parseEther(amount.toString()));
    await tx.wait();
    return tx;
  }
}
