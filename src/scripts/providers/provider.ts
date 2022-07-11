import { providers } from 'ethers';
import NetworkUtils from '../utils/networkUtils';
export default class Provider {
  provider: providers.JsonRpcProvider;
  network: string;
  constructor(network: string) {
    this.network = network;
    this.provider = new providers.JsonRpcProvider(
      NetworkUtils.getRpcUrl(network)
    );
  }

  getProxyAddress(): string {
    return NetworkUtils.getProxyAddress(this.network);
  }

  getProvider(): providers.JsonRpcProvider {
    return this.provider;
  }

  // set provider to preffered
  setProvider(network: string) {
    this.provider = new providers.JsonRpcProvider(
      NetworkUtils.getRpcUrl(network)
    );
  }
}
