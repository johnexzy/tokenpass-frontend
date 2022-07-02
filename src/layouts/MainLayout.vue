<script lang="ts" setup>
import { ref, computed } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';

import {
  switchNetwork,
  connectCoinbase,
  connectMetaMask,
  WalletConnect,
  WalletIsConnected,
} from 'src/scripts/wallet_util';
import { useUserStore } from '../stores/user';
const $store = useUserStore();

/**
 * Connect WallectConnect
 */
const ConnectWalletConnect = () => WalletConnect($store);

/**
 * Connect CoinBase Wallet
 */
const ConnectCoinBaseWallet = () => connectCoinbase($store);

const LoadWallet = async () => {
  const res = await WalletIsConnected($store);
  console.log(res);
};
(async () => {
  await LoadWallet();
})();
/**
 * Connect MetaMask Wallet
 */
const ConnectMetaMaskWallet = () => connectMetaMask($store);

const openModal = computed({
  get(): boolean {
    return $store.walletModal;
  },
  set(value: boolean) {
    $store.openWalletModal = value;
  },
});

const leftDrawerOpen = ref(false);
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
const essentialLinks = ref([
  {
    title: 'Documentation',
    caption: '',
    icon: '',
    link: '/documentation',
  },
  {
    title: 'FAQ',
    caption: '',
    icon: '',
    link: '/',
  },
]);
</script>
<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-page">
      <q-toolbar class="container justify-between">
        <q-btn
          class="mobile-only"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          text-color="black"
          @click="toggleLeftDrawer"
        />

        <router-link style="text-decoration: none" to="/">
          <q-toolbar-title
            class="text-black text-subtitle1 flex items-center text-weight-medium"
          >
            <svg
              class="q-mr-sm"
              width="25"
              viewBox="0 0 35 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="35" height="35" rx="17.5" fill="#F8E71C" />
              <path
                d="M14.9062 14.4688V11.9375C14.9062 10.2317 16.2942 8.84375 18 8.84375C19.7058 8.84375 21.0938 10.2317 21.0938 11.9375H21.6562C21.6562 9.9215 20.016 8.28125 18 8.28125C15.984 8.28125 14.3438 9.9215 14.3438 11.9375V14.4688H14.9062Z"
                fill="#212121"
              />
              <path
                d="M23.9062 15.0312H12.0938C11.783 15.0312 11.5312 15.283 11.5312 15.5938V25.1562C11.5312 25.467 11.783 25.7188 12.0938 25.7188H23.9062C24.217 25.7188 24.4688 25.467 24.4688 25.1562V15.5938C24.4688 15.283 24.217 15.0312 23.9062 15.0312ZM18.2812 21.1934V22.9062H17.7188V21.1934C16.9208 21.0593 16.3125 20.3671 16.3125 19.5312C16.3125 18.5992 17.0679 17.8438 18 17.8438C18.9321 17.8438 19.6875 18.5992 19.6875 19.5312C19.6875 20.3671 19.0792 21.0593 18.2812 21.1934Z"
                fill="#212121"
              />
            </svg>
            tokenpass
          </q-toolbar-title>
        </router-link>

        <q-space class="desktop-only" />
        <div class="text-black">
          <div class="row q-gutter-md">
            <q-btn to="/documentation" class="desktop-only" no-caps flat>
              Dashboard
            </q-btn>
            <q-btn class="desktop-only" no-caps flat> Help </q-btn>
            <q-btn
              @click="openModal = true"
              no-caps
              text-color="black"
              color="primary"
              unelevated
              class="primary-btn"
            >
              Connect Wallet
            </q-btn>
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list>
        <q-item-label header> Quick Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container class="bg-page">
      <router-view />

      <wallet-dialogue
        :connectCoinbase="ConnectCoinBaseWallet"
        :connectMetaMask="ConnectMetaMaskWallet"
        :connectWalletConnect="ConnectWalletConnect"
      />
    </q-page-container>
  </q-layout>
</template>
