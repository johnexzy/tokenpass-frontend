<template>
  <q-dialog v-model="store.openWalletModal">
    <div class="q-pa-lg">
      <q-card class="connect-modal">
        <q-card-section class="connect-modal-close">
          <div class="row justify-end">
            <q-btn class="close_button" flat round dense v-close-popup>
              <q-icon size="30px" name="img:close_modal.svg" />
            </q-btn>
          </div>
        </q-card-section>
        <q-card-section class="text-center connect-modal-header"
          >Choose your preferred wallet</q-card-section
        >
        <!-- <q-card-section
          class="connect-modal-subtitle text-center text-h6 text-grey q-pa-md"
        >This is a description for the wallet connection</q-card-section>-->

        <q-space />

        <!-- <div v-if="!walletIsDenied" class="text-negative text-center">
          Your wallet address is not approved for mint
        </div> -->
        <q-card-section class="q-pa-md">
          <div class="row flex flex-center">
            <div
              @click="() => props.connectMetaMask()"
              class="col-12 col-md-4 col-lg-4 text-center metamask q-ma-md justify-center"
            >
              <q-img
                src="../assets/metamask.svg"
                class="metamask-img"
                spinner-color="primary"
                spinner-size="82px"
              />
              <div class="team text-center text-white q-mt-lg">
                <p class="team-role">Metamask</p>
              </div>
            </div>
            <div
              v-on:click="() => props.connectCoinbase()"
              class="col-12 col-md-4 col-lg-4 text-center coinbase q-ma-md justify-center"
            >
              <q-img
                src="../assets/coinbase.svg"
                spinner-color="primary"
                spinner-size="82px"
                class="coinbase-img"
              />
              <div class="team text-center text-white q-mt-lg">
                <p>CoinBase</p>
              </div>
            </div>
            <div
              @click="() => props.connectWalletConnect()"
              class="col-12 col-md-4 col-lg-4 text-center walletconnect q-ma-md justify-center"
            >
              <q-img
                src="../assets/WalletConnect.svg"
                spinner-color="primary"
                spinner-size="82px"
                class="walletconnect-img"
              />
              <div class="team text-center text-white q-mt-lg">
                <p>WalletConnect</p>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-space />
        <!--
        <q-card-section v-if="!walletIsDenied" class="q-pa-md">
          <div
            @click="toggleReadmore()"
            class="text-center text-negative cursor-pointer"
          >
            <span>Your wallet address is not approved for mint</span>
            <q-icon v-if="read_more" class="text-grey q-ml-sm" name="arrow_drop_up" />
            <q-icon v-else class="text-grey q-ml-sm" name="arrow_drop_down" />
          </div>
          <transition
            enter-active-class="animated slideInDown"
            leave-active-class="animated slideInUp"
            v-show="read_more"
            class="q-mt-sm"
          >
            <p class="text-grey text-center">{{ store.getters['utils/getErrorMessage'].msg }}</p>
          </transition>
        </q-card-section> -->
      </q-card>
    </div>
  </q-dialog>
</template>

<script lang="ts" setup>
import { ref, computed, defineProps } from 'vue';
import { useUserStore } from '../stores/user';
const store = useUserStore();
const props = defineProps({
  connectMetaMask: { type: Function, required: true },
  connectCoinbase: { type: Function, required: true },
  connectWalletConnect: { type: Function, required: true },
});

const read_more = ref(true);

function toggleReadmore() {
  read_more.value = !read_more.value;
}
</script>
<style lang="scss">
.close_button {
  margin-top: -30px;
  margin-right: -30px;
}
.connectModal {
  padding: 0;
}

.walletconnect {
  cursor: pointer;
  padding: 10px;
  .walletconnect-img {
    width: 140px;
    height: 90px;
  }
  &:hover {
    background: rgba(51, 50, 50, 0.933);
    border-radius: 4px;
  }
}

.coinbase {
  cursor: pointer;
  padding: 10px;
  .coinbase-img {
    width: 90px;
    height: 90px;
  }
  &:hover {
    background: rgba(168, 167, 167, 0.933);
    border-radius: 4px;
  }
}
.metamask {
  cursor: pointer;
  padding: 10px;
  .metamask-img {
    width: 100px;
    height: 90px;
  }
  &:hover {
    background: rgba(168, 167, 167, 0.933);
    border-radius: 4px;
  }
}

.q-dialog__backdrop {
  background: rgb(0, 0, 0, 0.85);
}

.connect-modal {
  // background: #424242;
  border-radius: 10px;
  &-header {
    font-size: 30px;
    line-height: 45px;
    letter-spacing: -0.008em;
    // color: #ffffff;
  }
  &-subtitle {
    font-size: 18px;
    line-height: 23px;
    /* identical to box height */

    letter-spacing: -0.008em;
  }
}
</style>
