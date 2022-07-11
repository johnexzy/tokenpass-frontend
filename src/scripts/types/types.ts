import { BigNumber, Wallet } from 'ethers';
import { TransactionResponse } from '@ethersproject/abstract-provider';

export type NetworkType = {
  network: string;
  name: string;
  label: string;
  value: string;
  chainId: number;
  currency: string;
  rpc: string[];
  explorer: string;
  api: string;
};
type blockTx = {
  blockNumber: number;
  timeStamp: number;
  hash: string;
  nonce: number;
  blockHash: string;
  from: string;
  contractAddress: string;
  to: string;
  value: number;
  tokenName: string;
  tokenSymbol: string;
  tokenDecimal: number;
  transactionIndex: number;
  gas: number;
  gasPrice: number;
  gasUsed: number;
  cumulativeGasUsed: number;
  input: string;
  confirmations: number;
};
export type TokenTx = {
  status: '1' | '0';
  message: 'OK' | 'NOTOK';
  result: blockTx[] | [] | string;
};
export interface IEtherUtils {
  wallet: Wallet;
  send: (to: string, amount: string) => Promise<boolean | TransactionResponse>;
  balance: () => Promise<string>;
  estimateGasPriceTransfer: () => Promise<BigNumber>;
}

export abstract class NetworkUtilsType {
  static getRpcUrl: (network: string) => string;
  static getNetwork: (network: string) => NetworkType | undefined;
}

export type tokenStandard = 'erc20' | 'erc721' | 'erc1155';
export type tokenType<T, B> = {
  blockchain: B;
  token_standard: T;
  contract_address: string;
  token_id: string;
  amount_required: string;
  token_name: string;
};
export interface gatingFormData {
  title: string;
  type: string;
  attachment: any;
  description: string;
  tagline: string;
  gating: string;
  creator_address: string;
  subscription: {
    allow: boolean;
    price: number;
    duration: number;
  };
  token: tokenType<tokenStandard, string>[];
}
export type tokenStandardOptions<T> = {
  label: string;
  value: T;
};
type gateType = {
  contract_address: string;
  token_standard: tokenStandard;
  blockchain: string;
  creator: string;
  token_name: string;
  token_requirements: {
    token_id: number;
    amount_required: number;
  }[];
};
export type gatedResponseData = {
  title: string;
  slug: string;
  type: string;
  description: string | null;
  tagline: string | null;
  meta: null;
  updated_at: string;
  creator_address: string;
  gate: gateType[];
};
