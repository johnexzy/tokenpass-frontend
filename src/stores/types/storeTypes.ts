/* eslint-disable @typescript-eslint/no-explicit-any */
import { Signer } from 'ethers';
import { Provider } from '@ethersproject/abstract-provider';
export interface userStore {
  openWalletModal: boolean;
  openMintModal: boolean;
  chainMismatch: boolean;
  walletIsLoading: boolean;
  account: string;
  provider: undefined | Signer | Provider;
  reciept: any;
  isTransacting: boolean;
  tx: unknown;
  error: {
    state: boolean;
    msg: string;
  };
}
export interface userGettersStore {
  Account: (state: userStore) => string;
  AccountFormated: (state: userStore) => string;
  getErrorMessage: (state: userStore) => { state: boolean; msg: string };
  LoadingWalletState: (state: userStore) => boolean;
}
export interface tokenType {
  blockchain: string;
  token_standard: string;
  contract_address: string;
  token_id: string;
  amount_required: string;
}
export interface gatingFormData {
  title: string;
  type: string;
  attachment: any;
  description: string;
  tagline: string;
  gating: string;
  subscription: {
    allow: boolean;
    price: number;
    duration: number;
  };
  token: tokenType[];
}
