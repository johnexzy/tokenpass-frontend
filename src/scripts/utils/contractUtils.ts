import { BigNumber, Contract, utils, Wallet, ContractFactory } from 'ethers';
// import { checkIfWalletIsConnected } from './wallet_util';
import { userStore, userGettersStore } from '../types/storeTypes';
import { tokenStandard, tokenStandardOptions } from '../types/types';
import { Store } from 'pinia';
import abi from '../abi';
// import { TransactionResponse } from '@ethersproject/abstract-provider';
import Provider from '../providers/provider';
import CreateWallet from '../common/wallet';
import tI from '../../abi/TokenGate.json';

export default class TokenUtils extends Provider {
  contractAddress: string;
  wallet: Wallet;
  store: Store<'user', userStore, userGettersStore>;
  token_standard: 'erc20' | 'erc721' | 'erc1155';
  constructor(
    $store: Store<'user', userStore, userGettersStore>,
    token_standard: 'erc20' | 'erc721' | 'erc1155',
    contract_address: string,
    network: string
  ) {
    super(network);
    this.wallet = CreateWallet.initializeNewWallet();
    this.contractAddress = contract_address;
    this.token_standard = token_standard;
    this.store = $store;
  }
  async initializeSinger(): Promise<Wallet> {
    return await this.wallet.connect(this.provider);
  }
  async connectedContract(): Promise<Contract> {
    const connectedContract = new Contract(
      this.contractAddress,
      abi[this.token_standard],
      await this.initializeSinger()
    );

    return connectedContract;
  }

  // initialize token gate
  async tokenGateContract(): Promise<Contract> {
    const connectedContract = new ContractFactory(
      tI.abi,
      tI.bytecode,
      await this.initializeSinger()
    );
    return connectedContract.attach(this.getProxyAddress());
  }

  // verify address is valid
  static isValidAddress(address: string): boolean {
    return utils.isAddress(address);
  }
  async getCode(): Promise<string> {
    const bytecode = await this.provider.getCode(this.contractAddress);
    return bytecode;
  }
  async getTokenName(): Promise<string> {
    return ((await this.connectedContract()) as Contract).name();
  }
  async getTokenSymbol(): Promise<string> {
    return ((await this.connectedContract()) as Contract).symbol();
  }

  async getTokenBalance(): Promise<BigNumber> {
    return ((await this.connectedContract()) as Contract).balanceOf(
      this.store.Account
    );
  }
  async getTotalSupply(): Promise<BigNumber> {
    return ((await this.connectedContract()) as Contract).totalSupply();
  }
}

export const newToken = {
  blockchain: {
    network: 'mainnet',
    name: 'Ethereum',
    value: 'mainnet',
    label: 'Ethereum',
    chainId: 1,
    currency: 'ETH',
    rpc: [
      'https://eth-mainnet.alchemyapi.io/v2/7lR5N50UXB4y8URS4S9J3JPuxHWkW8uH',
      'https://eth-mainnet.blastapi.io/d3ed394a-bb83-4d1c-bb83-12ff8708c81a',
      'https://rpc.ankr.com/eth',
    ],
    explorer: 'https://etherscan.io',
    api: 'https://api.etherscan.io/api?module=account&action=tokentx',
  },
  token_standard: {
    label: 'ERC721',
    value: 'erc721',
  } as tokenStandardOptions<tokenStandard>,
  contract_address: '',
  token_id: '',
  amount_required: '',
  token_name: '',
};
