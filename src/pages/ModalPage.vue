<template>
  <q-page>
    <section class="modal-page-wrapper pt-100 pb-100">
      <div class="container">
        <!-- <q-btn
          @click="openModal"
          label="Add New Token"
          color="primary"
          text-color="black"
          unelevated
        /> -->

        <q-dialog v-model="modalShow" persistent>
          <q-card
            class="tp-modal q-py-lg q-px-lg"
            style="width: 700px; max-width: 80vw"
          >
            <q-card-section class="row q-col-gutter-lg">
              <div class="col-12 col-md-12 col-lg-12 q-mb-lg">
                <div class="text-h6 text-weight-medium text-center">
                  Add New Token
                </div>
              </div>
              <div class="col-12 col-md-6 col-lg-6">
                <q-select
                  outlined
                  dense
                  v-model="formData.blockchain"
                  :options="options"
                  label="Choose Blockchain"
                />
              </div>
              <div class="col-12 col-md-6 col-lg-6">
                <q-select
                  outlined
                  dense
                  v-model="formData.type"
                  :options="options"
                  label="Choose Token type"
                />
              </div>
              <div class="col-12 col-md-12 col-lg-12">
                <q-input
                  dense
                  outlined
                  v-model="formData.address"
                  label="Enter contract address for this token"
                />
              </div>
              <div class="col-12 col-md-2 col-lg-2">
                <q-input dense outlined v-model="formData.id" label="ID" />
              </div>
              <div class="col-12 col-md-2 col-lg-2">
                <q-input
                  dense
                  outlined
                  v-model="formData.amount"
                  label="Amount"
                  type="number"
                />
              </div>
            </q-card-section>

            <q-card-actions class="row q-col-gutter-md">
              <div class="col-6 col-md-6 col-lg-6 flex justify-end">
                <q-btn
                  text-color="black"
                  label="Add"
                  color="primary"
                  v-close-popup
                  unelevated
                  style="width: 150px"
                />
              </div>
              <div class="col-6 col-md-6 col-lg-6">
                <q-btn
                  text-color="black"
                  label="Cancel"
                  color="grey-4"
                  v-close-popup
                  unelevated
                  style="width: 150px"
                />
              </div>
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </section>
  </q-page>
</template>



<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ModalPage',
  data() {
    return {
      modalShow: true,
      options: ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'],
      formData: {
        blockchain: '',
        type: '',
        address: '',
        id: '',
        amount: '',
      },
    };
  },
  components: {},
  methods: {
    openModal() {
      this.modalShow = true;
    },
  },
});
</script>