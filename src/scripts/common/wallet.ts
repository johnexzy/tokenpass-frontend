import { Wallet } from 'ethers';
export default class CreateWallet {
  static initializeNewWallet(): Wallet {
    return Wallet.createRandom();
  }
}
