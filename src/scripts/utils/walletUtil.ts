import { userStore, userGettersStore } from '../types/storeTypes';
// import Web3 from 'web3';
// import { providers } from 'ethers'

import { Store } from 'pinia';
import { MetaMaskInpageProvider } from '@metamask/providers';
import WalletConnectProvider from '@walletconnect/web3-provider/dist/esm/index';

declare global {
  interface Window {
    ethereum: any | undefined;
    web3: any;
    walletLinkExtension: any;
  }
}

function MetaMaskProvider(): any {
  if (window.ethereum) {
    if (window.ethereum.providers)
      return window.ethereum.providers.find(
        (provider: { isMetaMask: boolean }) => provider.isMetaMask
      );
    return window.ethereum;
  }
  return false;
}

const CoinBaseProvider: any | boolean = () => {
  if (window.walletLinkExtension) return window.walletLinkExtension;
  return false;
};

// const openModal = ref(false)
const Wallet: { provider: any | MetaMaskInpageProvider } = {
  provider: null,
};

/**
 * Restore existing Wallet Connection (Metamask)
 */
const checkIfWalletIsConnected = async (
  $store: Store<'user', userStore, userGettersStore>
) => {
  const isMetaMask = await isMetamaskConnected($store);

  if (isMetaMask) {
    Wallet.provider = isMetaMask;
    return isMetaMask;
  } else {
    const isCoinBase = await isCoinBaseConnected($store);
    if (isCoinBase) {
      Wallet.provider = isCoinBase;
      return isCoinBase;
    }

    const isWallectConnect = await isWallectConnectConnected($store);

    if (isWallectConnect) {
      return isWallectConnect;
    }
    return false;
  }
};

const WalletIsConnected = async (
  $store: Store<'user', userStore, userGettersStore>
) => {
  setTimeout(() => {
    $store.walletIsLoading = false;
  }, 2500);
  const connectStatus = await checkIfWalletIsConnected($store);
  return connectStatus;
};

/**
 * Verify Existing MetaMask connections
 * @param {Object} $store inject vuex store object
 * @returns
 */
const isMetamaskConnected = async (
  $store: Store<'user', userStore, userGettersStore>
) => {
  try {
    const metaMaskProvider = MetaMaskProvider();
    if (!metaMaskProvider) {
      return false;
    }

    const accounts: string[] = await metaMaskProvider.request({
      method: 'eth_accounts',
    });
    // console.log(accounts);
    if (accounts.length !== 0) {
      const chainId = await metaMaskProvider.request({ method: 'eth_chainId' });
      console.log(chainId);
      metaMaskProvider.on('chainChanged', (_chainId: any) => {
        window.location.reload();
      });
      metaMaskProvider.on('disconnect', function () {
        // alert("disconnected");
        window.location.reload();
      });
      metaMaskProvider.on('accountsChanged', function (_accounts: any) {
        window.location.reload();
      });
      // if (chainId !== process.env.CHAIN_ID) {
      //   $store.commit('utils/setChainMisMatch', true);
      //   Wallet.provider = metaMaskProvider;
      //   return false;
      //   // await switchNetwork();
      // }
      Wallet.provider = metaMaskProvider;
      // web3 = new Web3(metaMaskProvider);

      /**
       * save to state
       */
      $store.account = accounts[0];
      $store.provider = Wallet.provider;
      return metaMaskProvider;
    }

    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

/**
 * Verify Existing CoinBase connections
 * @param {Object} $store inject vuex store object
 * @returns
 */
const isCoinBaseConnected = async (
  $store: Store<'user', userStore, userGettersStore>
) => {
  try {
    const coinBaseProvider = CoinBaseProvider();
    if (!coinBaseProvider) {
      return false;
    }

    const accounts: string[] = await coinBaseProvider.request({
      method: 'eth_accounts',
    });
    // console.log(accounts);
    if (accounts.length !== 0) {
      const chainId = await coinBaseProvider.request({ method: 'eth_chainId' });
      console.log(chainId);
      coinBaseProvider.on('chainChanged', (_chainId: any) => {
        window.location.reload();
      });
      coinBaseProvider.on('disconnect', function () {
        alert('disconnected');
        window.location.reload();
      });
      coinBaseProvider.on('accountsChanged', function (_accounts: any) {
        window.location.reload();
      });
      // if (chainId !== process.env.CHAIN_ID) {
      //   $store.commit('utils/setChainMisMatch', true);
      //
      //   return false;
      //   // await switchNetwork();
      // }
      Wallet.provider = coinBaseProvider;
      // web3 = new Web3(coinBaseProvider);

      /**
       * save to state
       */
      $store.account = accounts[0];
      $store.provider = Wallet.provider;
      return coinBaseProvider;
    }

    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

/**
 *  Verify existing WalletConnect Connectoin
 * @param {Object} $store inject vuex store object
 * @returns
 */
const isWallectConnectConnected = async (
  $store: Store<'user', userStore, userGettersStore>
) => {
  try {
    if (Wallet.provider === null) {
      const provider = new WalletConnectProvider({
        infuraId: 'e8f8c34dc1dd47b2a00d6569d52b8ec7', // Required
        qrcodeModalOptions: {
          mobileLinks: [
            'metamask',
            'trust',
            'argent',
            'trust',
            'imtoken',
            'pillar',
          ],
        },
      });
      provider.on('connect', () => {
        console.log('connect');
      });

      provider.on('disconnect', (code: any, reason: any) => {
        console.log(code, reason);
        console.log(reason);
      });
      Wallet.provider = provider;
    }

    // const web3 = new Web3(Wallet.provider);

    //  Get Accounts
    // await Wallet.provider.enable();
    const accounts: string[] = Wallet.provider.accounts;
    // console.log(accounts);
    console.log(accounts);
    if (accounts.length !== 0) {
      // await Wallet.provider.enable();
      Wallet.provider.on('chainChanged', (chainId: any) => {
        window.location.reload();
      });
      // web3 = new Web3(Wallet.provider);
      const chain_id = Wallet.provider.chainId;
      // if (process.env.CHAIN_ID !== `0x${chain_id}`) {
      //   $store.commit('utils/setChainMisMatch', true);
      //   return false;
      // }
      // const res = await verifyWalletisOG(Wallet.provider, accounts[0]);

      /**
       * Save to state
       */
      $store.account = accounts[0];
      $store.provider = Wallet.provider;
      return Wallet.provider;
    }
    return false;
  } catch (error) {
    console.log('Unexpected Error');
    return false;
  }
};
const switchAccount = async (
  $store: Store<'user', userStore, userGettersStore>
) => {
  if (await isMetamaskConnected($store)) {
    const metaMaskProvider = MetaMaskProvider();

    await metaMaskProvider.request({
      method: 'wallet_requestPermissions',
      params: [
        {
          eth_accounts: {},
        },
      ],
    });
    window.location.reload();
  }
};

/**
 * Switch Network eg. Mainnet
 */
const switchNetwork = async () => {
  const { provider } = Wallet;
  const chain = {
    chainId: '0x1',
    chainName: 'Ethereum Mainnet',
    rpcUrls: [
      'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    ] /* ... */,
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH', // 2-6 characters long
      decimals: 18,
    },
    blockExplorerUrls: ['https://etherscan.io'],
  };
  try {
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: process.env.CHAIN_ID }],
    });
    window.location.reload();
  } catch (switchError: any) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      try {
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [chain],
        });
      } catch (addError) {
        console.log('Failed to add Network');
      }
    }
    console.log('Failed to switch to the network');
  }
};

/**
 *  Connect using CoinBase Provider
 * @param {Object} $store inject vuex store object
 * @returns
 */
async function connectCoinbase(
  $store: Store<'user', userStore, userGettersStore>
) {
  const coinBaseProvider = CoinBaseProvider();
  console.log(coinBaseProvider);
  if (coinBaseProvider) {
    const accounts: string[] = await coinBaseProvider.request({
      method: 'eth_requestAccounts',
    });
    const chainId = await coinBaseProvider.request({ method: 'eth_chainId' });
    console.log(chainId);

    // if (chainId !== process.env.CHAIN_ID) {
    //   $store.commit('utils/setChainMisMatch', true);
    //   await switchNetwork(coinBaseProvider);
    // }
    if (accounts.length !== 0) {
      coinBaseProvider.on('disconnect', function () {
        alert('disconnected');
        window.location.reload();
      });
      coinBaseProvider.on('accountsChanged', function (_accounts: any) {
        window.location.reload();
      });
      coinBaseProvider.on('chainChanged', (_chainId: any) => {
        window.location.reload();
      });
      // web3 = new Web3(coinBaseProvider);
      // const res = await verifyWalletisOG(coinBaseProvider, accounts[0]);
      // console.log(res)
      $store.account = accounts[0];

      coinBaseProvider.on('disconnect', function () {
        console.log('disconnected');
      });
      $store.provider = coinBaseProvider;
      $store.openWalletModal = false;
      return true;
    }
    return false;
  } else {
    return false;
  }
}

/**
 * Connect using Metamask Provider
 * @param {Object} $store inject vuex store object
 * @returns
 */
async function connectMetaMask(
  $store: Store<'user', userStore, userGettersStore>
) {
  const metaMaskProvider = MetaMaskProvider();
  if (metaMaskProvider) {
    const accounts = await metaMaskProvider.request({
      method: 'eth_requestAccounts',
    });
    const chainId = await metaMaskProvider.request({ method: 'eth_chainId' });
    console.log(chainId);
    // if (chainId !== process.env.CHAIN_ID) {
    //   // $store.commit("utils/setChainMisMatch", true);;
    //   // $store.commit('utils/setChainMisMatch', true);
    //   await switchNetwork();
    // }
    if (accounts.length !== 0) {
      metaMaskProvider.on('disconnect', function () {
        alert('disconnected');
        window.location.reload();
      });
      metaMaskProvider.on('accountsChanged', function (_accounts: any) {
        window.location.reload();
      });
      metaMaskProvider.on('chainChanged', (_chainId: any) => {
        window.location.reload();
      });
      // web3 = new Web3(metaMaskProvider);
      // const res = await verifyWalletisOG(metaMaskProvider, accounts[0]);
      // console.log(res)
      $store.account = accounts[0];

      metaMaskProvider.on('disconnect', function () {
        console.log('disconnected');
      });
      $store.provider = metaMaskProvider;
      // if (res) {
      //   const balance = await checkBalanceOfAddress(
      //     metaMaskProvider,
      //     accounts[0]
      //   );
      //   if (balance > 0) {
      //     $store.commit('utils/setAccountMinted', true);
      //     $router.push('/minted');
      //     return;
      //   }

      //   $router.push('/explore');
      $store.openWalletModal = false;
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

// /**
//  *  Connect using WallectConnect Provider
//  * @param {Object} $store inject vuex store object
//  * @returns
//  */
async function WalletConnect(
  $store: Store<'user', userStore, userGettersStore>
) {
  try {
    const provider = new WalletConnectProvider({
      infuraId: 'e8f8c34dc1dd47b2a00d6569d52b8ec7', // Required
      qrcodeModalOptions: {
        mobileLinks: [
          'metamask',
          'trust',
          'argent',
          'trust',
          'imtoken',
          'pillar',
        ],
      },
    });
    console.log('trying');
    provider.on('connect', () => {
      console.log('connect');
    });

    provider.on('disconnect', (code: any, reason: any) => {
      console.log(code, reason);
      console.log(reason);
      window.location.reload();
    });
    try {
      await provider.enable();
    } catch (error) {
      console.log('Error');
      console.log(error);
    }

    provider.on('chainChanged', (chainId: any) => {
      window.location.reload();
    });
    // provider.
    // web3 = new Web3(Wallet.provider);
    // const chain_id = await web3.eth.getChainId();
    // if (process.env.CHAIN_ID !== `0x${chain_id}`) {
    //   $store.commit('utils/setChainMisMatch', true);
    //   return false;
    // }
    //  Get Accounts

    const accounts = provider.accounts;
    // console.log(chain_id);
    Wallet.provider = provider;
    if (accounts.length !== 0) {
      console.log(accounts[0]);
      $store.provider = Wallet.provider;
      $store.account = accounts[0];
      $store.openWalletModal = false;
      return true;
    }
    return false;
  } catch (error) {
    console.log('Unexpected Error Occured. Reach out Team on Discord');
    return false;
  }
}

export {
  checkIfWalletIsConnected,
  switchNetwork,
  MetaMaskProvider,
  CoinBaseProvider,
  connectCoinbase,
  connectMetaMask,
  WalletConnect,
  WalletIsConnected,
};
