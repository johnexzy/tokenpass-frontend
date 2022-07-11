<template>
  <q-page>
    <section class="errorempty-page-wrapper pt-100 pb-100">
      <div class="container">
        <div class="errorempty-card">
          <h1 class="errorempty-section-title text-center q-mb-lg">
            Please connect your wallet
          </h1>
          <p class="text-center text-grey-9 q-mb-lg text-caption">
            You need to connect your wallet to access this functionality
          </p>
          <div class="flex justify-center">
            <q-btn
              @click="$store.openWalletModal = true"
              label="CONNECT WALLET"
              text-color="black"
              color="primary"
              unelevated
            />
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script lang="ts" setup>
import { watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';
const $store = useUserStore();
const $r = useRouter();
const account = computed(() => $store.Account);
watch(account, (val) => {
  if (val !== '') {
    $r.push('/');
  }
});
</script>
