/* eslint-disable @typescript-eslint/no-explicit-any */
import { Signer } from 'ethers';
import { Provider } from '@ethersproject/abstract-provider';
import { gatedResponseData } from './types';
export interface userStore {
  openWalletModal: boolean;
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
  gatedResponseData: gatedResponseData | null;
  gatedResponseStatus: number;
  gateItem: gatedResponseData | null;
}
export interface userGettersStore {
  Account: (state: userStore) => string;
  AccountFormated: (state: userStore) => string;
  getErrorMessage: (state: userStore) => { state: boolean; msg: string };
  LoadingWalletState: (state: userStore) => boolean;
}
