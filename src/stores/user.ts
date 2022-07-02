import { defineStore } from 'pinia';
import { userStore } from './types/storeTypes';

export const useUserStore = defineStore('user', {
  state: (): userStore => ({
    openWalletModal: false,
    openMintModal: false,
    chainMismatch: false,
    walletIsLoading: true,
    account: '',
    provider: null,
    reciept: null,
    isTransacting: false,
    tx: null,
    error: {
      state: false,
      msg: '',
    },
  }),

  getters: {
    Account(state: userStore): string {
      return state.account;
    },
    AccountFormated(state: userStore): string {
      if (state.account) {
        return state.account.substr(0, 5) + '...' + state.account.substr(-4);
      }
      return '';
    },
    getErrorMessage(state: userStore): { state: boolean; msg: string } {
      return state.error;
    },
    LoadingWalletState(state: userStore): boolean {
      return state.walletIsLoading;
    },
    walletModal(state): boolean {
      return state.openWalletModal;
    },
  },

  actions: {
    // increment() {
    //   this.counter++;
    // },
  },
});
