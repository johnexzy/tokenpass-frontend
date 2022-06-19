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



<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ErrorEmptyPage',
  data() {
    return {};
  },
  components: {},
  methods: {},
});
</script>