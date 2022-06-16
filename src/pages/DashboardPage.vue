<template>
  <q-page>
    <section class="dashboard-page-wrapper pt-100 pb-100">
      <div class="container">
        <div class="dashboard-card q-mb-xl">
          <h1 class="dashboard-section-title text-left q-mb-xl">
            Welcome to your Dashboard
          </h1>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md">
              <div class="row q-gutter-md">
                <q-avatar size="100px">
                  <q-img src="../assets/profile.png" />
                </q-avatar>
                <div class="column justify-center">
                  <div class="text-caption">0x345f...2050</div>
                  <router-link class="edit-link" to="#">Edit</router-link>
                </div>
              </div>
            </div>

            <div class="col-6 col-md column justify-center">
              <div class="text-subtitle1 text-grey-5">TOTAL CONTENT</div>
              <div class="text-subtitle1 text-black">0</div>
            </div>
            <div class="col-6 col-md column justify-center">
              <div class="text-subtitle1 text-grey-5">TOTAL CONTENT</div>
              <div class="text-subtitle1 text-black">0</div>
            </div>
            <div class="col-6 col-md column justify-center">
              <div class="text-subtitle1 text-grey-5">TOTAL CONTENT</div>
              <div class="text-subtitle1 text-black">0</div>
            </div>
            <div class="col-6 col-md column justify-center">
              <div class="text-subtitle1 text-grey-5">TOTAL CONTENT</div>
              <div class="text-subtitle1 text-black">0</div>
            </div>
          </div>
        </div>

        <div class="filter-form-card q-mb-xl">
          <div class="row justify-between q-mb-lg">
            <div class="text-h6 text-grey-7 text-weight-bold">
              My Token Gated Contents
            </div>
            <q-btn
              @click="clear == true ? (clear = false) : (clear = true)"
              v-if="clear == false"
              label="Clear filters"
              no-caps
              unelevated
              flat
              color="blue"
            />
            <q-btn
              @click="clear == false ? (clear = true) : (clear = false)"
              v-if="clear == true"
              label="Filter"
              no-caps
              unelevated
              color="primary"
              text-color="black"
            />
          </div>

          <div class="text-caption text-grey-6">FILTER</div>
          <div class="row q-col-gutter-lg">
            <div class="col-12 col-md-3 col-lg-3">
              <q-select
                outlined
                dense
                v-model="filter.education"
                :options="options"
                label="Education   +3"
                square
                class="bg-white"
              />
            </div>
            <div class="col-12 col-md-3 col-lg-3">
              <q-select
                outlined
                dense
                v-model="filter.type"
                use-input
                use-chips
                multiple
                input-debounce="0"
                @new-value="createValue"
                :options="filterOptions"
                @filter="filterFn"
                square
                class="bg-white"
              >
                <template v-slot:prepend> <q-icon name="search" /> </template
              ></q-select>
            </div>
            <div class="col-12 col-md-3 col-lg-3">
              <q-select
                outlined
                dense
                v-model="filter.education"
                :options="options"
                label="Type of company"
                square
                class="bg-white"
              />
            </div>
            <div class="col-12 col-md-3 col-lg-3">
              <q-select
                outlined
                dense
                v-model="filter.education"
                :options="options"
                label="Type of company"
                square
                class="bg-white"
              />
            </div>
          </div>
        </div>

        <div class="row q-col-gutter-md q-mb-xl" v-if="clear == false">
          <div class="col-12 col-md-4 col-lg-4" v-for="i in 6" :key="i">
            <q-card class="searched-result-card">
              <q-card-section>
                <div class="text-black text-weight-bold text-subtitle1 q-mb-md">
                  A private trip to Zanzibar
                </div>
                <div class="row">
                  <div class="col-12 col-md-6 col-lg-6">
                    <div class="flex justify-between q-mb-sm">
                      <span class="text-grey-6">Views</span>
                      <span class="text-black">32</span>
                    </div>
                    <div class="flex justify-between q-mb-sm">
                      <span class="text-grey-6">Subscription</span>
                      <span class="text-black">Yes</span>
                    </div>
                    <div class="flex justify-between q-mb-sm">
                      <span class="text-grey-6">Type</span>
                      <span class="text-black">Article</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-grey-6">Required token</span>
                      <span class="text-black ellipsis">0x4</span>
                    </div>
                  </div>
                </div>
              </q-card-section>
              <q-card-section class="row q-gutter-md">
                <q-btn
                  class="q-px-md"
                  label="Edit"
                  unelevated
                  no-caps
                  color="yellow-3"
                  text-color="black"
                />
                <q-btn
                  flat
                  class="q-px-md"
                  label="Delete"
                  unelevated
                  color="yellow-3"
                  no-caps
                  text-color="red"
                />
              </q-card-section>
            </q-card>
          </div>
        </div>

        <div class="row justify-center" v-if="clear == false">
          <q-pagination
            v-model="current"
            color="primary"
            text-color="black"
            :max="10"
            :max-pages="6"
            boundary-numbers
          />
        </div>

        <div
          v-if="clear == true"
          class="no-data-wrapper flex column flex-center pt-100 pb-100"
        >
          <q-img src="../assets/no-data.png" style="width: 20%" />
          <div class="text-subtitle1 q-my-lg text-grey-6">
            You have not added any gated content yet.
          </div>
          <q-btn
            class="q-px-lg"
            label="Gate new content"
            unelevated
            no-caps
            color="primary"
            text-color="black"
          />
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
    return {
      filter: {
        education: '',
        type: null,
        company_type: '',
      },
      options: ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'],
      current: 1,
      clear: false,
    };
  },
  components: {},
  methods: {},
});
</script>