<template>
  <q-page>
    <section class="fileupload-page-wrapper pt-100 pb-100">
      <div class="container">
        <div class="fileupload-card">
          <div class="text-center q-mb-lg">
            <svg
              width="65"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M40 0C17.91 0 0 17.91 0 40C0 62.09 17.91 80 40 80C62.09 80 80 62.09 80 40C80 17.91 62.09 0 40 0ZM33.8 58.4575L15.395 40.05L22.465 32.98L33.7975 44.3175L57.84 20.275L64.91 27.345L33.8 58.4575Z"
                fill="#15A912"
              />
            </svg>
          </div>
          <h1 class="fileupload-section-title text-center q-mb-lg">
            Content successfully uploaded to:
          </h1>
          <div class="flex flex-center q-mb-lg">
            <router-link
              class="fileupload-link text-center q-mr-md"
              to="https://tokenpass.ai/link/iEutYiQ390"
              target="_blank"
              >https://tokenpass.ai/link/iEutYiQ390</router-link
            >
            <q-btn
              flat
              round
              size="sm"
              @click="copyURL('https://tokenpass.ai/link/iEutYiQ390')"
              ><svg
                width="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 8H16V24H0V8ZM8 0V4H20V16H24V0H8Z"
                  fill="#212121"
                /></svg
            ></q-btn>
            <transition
              appear
              enter-active-class="animated fadeInRight"
              leave-active-class="animated fadeOutRight"
            >
              <q-badge color="primary" v-show="URLCopyTooltip == true">
                URL copied
              </q-badge>
            </transition>
          </div>
          <p class="text-center text-black q-mb-lg">SHARE WITH FIRENDS</p>
          <ul class="fileupload-social">
            <li class="q-mr-md">
              <svg
                width="25"
                class="q-mr-sm"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_215_23)">
                  <path
                    d="M31.939 6.09205C30.741 6.61976 29.4716 6.96785 28.172 7.12505C29.5401 6.30248 30.5644 5.0128 31.056 3.49405C29.763 4.24695 28.3543 4.7805 26.887 5.07305C25.988 4.11317 24.8213 3.44565 23.5382 3.15713C22.2551 2.86861 20.9149 2.9724 19.6915 3.45504C18.4682 3.93768 17.4181 4.77689 16.6776 5.86374C15.9372 6.9506 15.5405 8.23493 15.539 9.55005C15.539 10.0701 15.599 10.5701 15.708 11.0491C10.255 10.7921 5.421 8.17305 2.187 4.21405C1.59885 5.21386 1.29202 6.3541 1.299 7.51405C1.29809 8.5941 1.56386 9.65767 2.07273 10.6103C2.58159 11.563 3.3178 12.3753 4.216 12.9751C3.17448 12.9415 2.15598 12.66 1.245 12.1541V12.2351C1.24439 13.7502 1.76796 15.2189 2.72688 16.392C3.6858 17.5651 5.02101 18.3703 6.506 18.6711C5.5438 18.9287 4.53609 18.9673 3.557 18.7841C3.9786 20.0881 4.79673 21.228 5.89724 22.0447C6.99776 22.8614 8.32577 23.3143 9.696 23.3401C7.37541 25.1614 4.51001 26.15 1.56 26.1471C1.04 26.1471 0.521 26.1161 0 26.0581C3.00758 27.9839 6.50469 29.006 10.076 29.0031C22.148 29.0031 28.741 19.0081 28.741 10.3551C28.741 10.0761 28.741 9.79505 28.721 9.51505C30.002 8.59605 31.121 7.43505 32.001 6.11805L31.938 6.09105L31.939 6.09205Z"
                    fill="#1DA1F2"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_215_23">
                    <rect width="20" height="32" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Twitter
            </li>
            <li class="q-mr-md">
              <svg
                width="20"
                class="q-mr-sm"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M30.235 2.34375e-05H1.76598C0.790977 2.34375e-05 0.000976562 0.791023 0.000976562 1.76502V30.234C0.000976562 31.21 0.791977 31.999 1.76598 31.999H17.091V19.607H12.919V14.779H17.091V11.212C17.091 7.08002 19.616 4.83202 23.303 4.83202C25.07 4.83202 26.588 4.96102 27.031 5.02002V9.34002H24.47C22.47 9.34002 22.081 10.301 22.081 11.701V14.782H26.86L26.24 19.622H22.081V31.998H30.234C31.211 31.998 32.001 31.209 32.001 30.233V1.76402C32.001 0.789024 31.212 -0.000976562 30.236 -0.000976562L30.235 2.34375e-05Z"
                  fill="#3B5998"
                />
              </svg>
              Facebook
            </li>
            <li class="q-mr-md">
              <svg
                width="20"
                class="q-mr-sm"
                viewBox="0 0 32 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M31 0H1C0.4 0 0 0.4 0 1V23C0 23.6 0.4 24 1 24H31C31.6 24 32 23.6 32 23V1C32 0.4 31.6 0 31 0ZM28.6 4.8L16.6 12.8C16.4 12.9 16.2 13 16 13C15.8 13 15.6 12.9 15.4 12.8L3.4 4.8C3 4.5 2.9 3.9 3.2 3.4C3.5 3 4.1 2.9 4.6 3.2L16 10.8L27.4 3.2C27.9 2.9 28.5 3 28.8 3.5C29.1 3.9 29 4.5 28.6 4.8Z"
                  fill="#212121"
                />
              </svg>
              Email
            </li>
            <li>
              <svg
                width="20"
                class="q-mr-sm"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24.667 0.666626H3.33366C1.86033 0.666626 0.680326 1.85996 0.680326 3.33329L0.666992 27.3333L6.00033 22H24.667C26.1403 22 27.3337 20.8066 27.3337 19.3333V3.33329C27.3337 1.85996 26.1403 0.666626 24.667 0.666626ZM10.0003 12.6666H7.33366V9.99996H10.0003V12.6666ZM15.3337 12.6666H12.667V9.99996H15.3337V12.6666ZM20.667 12.6666H18.0003V9.99996H20.667V12.6666Z"
                  fill="#212121"
                />
              </svg>
              SMS
            </li>
          </ul>
        </div>
      </div>
    </section>
  </q-page>
</template>



<script lang="ts">
import { defineComponent } from 'vue';
import { copyToClipboard } from 'quasar';

export default defineComponent({
  name: 'FileUploadedPage',
  data() {
    return {
      URLCopyTooltip: false,
    };
  },
  components: {},
  methods: {
    copyURL(val: string) {
      this.URLCopyTooltip = true;
      copyToClipboard(val)
        .then(() => {
          setTimeout(() => {
            this.URLCopyTooltip = false;
          }, 500);
        })
        .catch(() => {
          this.URLCopyTooltip = false;
        });
    },
  },
});
</script>
