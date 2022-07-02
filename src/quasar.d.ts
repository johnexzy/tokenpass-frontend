/* eslint-disable */

// Forces TS to apply `@quasar/app-vite` augmentations of `quasar` package
// Removing this would break `quasar/wrappers` imports as those typings are declared
//  into `@quasar/app-vite`
// As a side effect, since `@quasar/app-vite` reference `quasar` to augment it,
//  this declaration also apply `quasar` own
//  augmentations (eg. adds `$q` into Vue component context)
/// <reference types="@quasar/app-vite" />
declare module '@walletconnect/web3-provider/dist/umd/index.min.js' {
  import WalletConnectProvider from '@walletconnect/web3-provider/dist/esm/index';
  export default WalletConnectProvider;
}
