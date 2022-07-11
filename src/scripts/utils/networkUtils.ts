import networks from '../networks/network';
import proxyAddress from '../networks/proxyAddress';
import { NetworkUtilsType } from '../types/types';
export default class NetworkUtils extends NetworkUtilsType {
  static getRpcUrl(network: string): string {
    const n = networks.find((r) => network === r.network)!;
    return n.rpc[Math.floor(Math.random() * n.rpc.length)];
  }
  static getNetwork(network: string) {
    const n = networks.find((r) => network === r.network);
    return n;
  }

  static getProxyAddress(network: string): string {
    const n = proxyAddress.find((r) => network === r.network)!;
    return n.address;
  }
}
