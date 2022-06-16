<template>
  <q-page>
    <section class="fileremove-page-wrapper pt-100 pb-100">
      <div class="container">
        <div class="fileremoved-card">
          <div class="text-center q-mb-lg">
            <svg
              width="65"
              viewBox="0 0 74 66"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M71.2497 44.5762L49.0797 7.62375C46.1697 2.775 41.7184 0 36.8584 0C31.9984 0 27.5472 2.775 24.6372 7.61625L2.46716 44.5762C-0.48034 49.485 -0.80284 54.72 1.58591 58.9387C3.97091 63.1612 8.62841 65.5837 14.3584 65.5837H59.3584C65.0884 65.5837 69.7459 63.1612 72.1309 58.9425C74.5197 54.7237 74.1972 49.4887 71.2497 44.5762ZM36.8584 52.6425C33.6559 52.6425 31.0459 50.0362 31.0459 46.8337C31.0459 43.6312 33.6522 41.0175 36.8584 41.0175C40.0647 41.0175 42.6709 43.6275 42.6709 46.8337C42.6709 50.0362 40.0609 52.6425 36.8584 52.6425ZM42.9822 24.8025C42.9409 24.9187 37.7284 37.8075 37.7284 37.8075C37.5859 38.16 37.2409 38.3925 36.8622 38.3925C36.4834 38.3925 36.1384 38.16 35.9959 37.8075L30.7797 24.915C30.4646 24.1342 30.3004 23.3007 30.2959 22.4587C30.2959 18.84 33.2397 15.8963 36.8584 15.8963C37.9212 15.899 38.9675 16.1595 39.9075 16.6555C40.8475 17.1514 41.6532 17.8681 42.2553 18.7438C42.8575 19.6196 43.2382 20.6284 43.3648 21.6837C43.4914 22.7389 43.3601 23.8091 42.9822 24.8025V24.8025Z"
                fill="#212121"
              />
            </svg>
          </div>
          <h1 class="fileremoved-section-title text-center q-mb-lg">
            File has been removed.
          </h1>
          <p class="text-center text-grey-6 q-mb-lg">
            This content has been removed for violating our terms and
            conditions.
          </p>
          <div class="flex justify-center">
            <q-btn
              label="GO HOME"
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
  name: 'FileRemovedPage',
  data() {
    return {};
  },
  components: {},
  methods: {},
});
</script>