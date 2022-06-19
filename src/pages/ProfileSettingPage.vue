<template>
  <q-page>
    <section class="profliesetting-page-wrapper pt-100 pb-100">
      <div class="container">
        <q-form>
          <q-card class="bg-page" flat>
            <q-card-section class="row q-col-gutter-lg">
              <div class="col-12 col-md-12 col-lg-12">
                <h1 class="profilesetting-section-title">Profile Setting</h1>
              </div>
              <div class="col-12 row q-col-gutter-lg">
                <div class="col-12 col-md-5 col-lg-5">
                  <label class="form-label" for="">Username</label>
                  <br />
                  <br />
                  <q-input
                    class="bg-white"
                    dense
                    outlined
                    v-model="formData.username"
                    placeholder="AfroBob"
                  />
                </div>
              </div>
              <div class="col-12 row q-col-gutter-lg">
                <div class="col-12 col-md-6 col-lg-6">
                  <label class="form-label" for="">Bio</label>
                  <br />
                  <br />
                  <q-input
                    class="bg-white"
                    dense
                    outlined
                    v-model="formData.bio"
                    placeholder="Write a short description about your content"
                    type="textarea"
                  />
                </div>
              </div>
              <div class="col-12 row q-col-gutter-lg">
                <div class="col-12 col-md-6 col-lg-6">
                  <label class="form-label" for="">Photo</label>
                  <br />
                  <br />
                  <div class="row q-col-gutter-md">
                    <div class="image-uploader">
                      <input
                        type="file"
                        ref="files"
                        style="display: none"
                        @input="uploadFiles"
                        :multiple="false"
                      />
                      <a style="cursor: pointer" @click="$refs.files.click()">
                        <svg
                          width="120"
                          height="120"
                          viewBox="0 0 120 120"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            width="120"
                            height="120"
                            rx="15"
                            fill="#E8EAED"
                          />
                          <g filter="url(#filter0_d_315_29)">
                            <circle cx="60.5" cy="60.5" r="22.5" fill="white" />
                            <path
                              d="M61.0252 58.2231L55.5371 63.7112L56.9706 65.1447L60.0115 62.1038V72.1752H62.0388V62.1038L65.0798 65.1447L66.5133 63.7112L61.0252 58.2231Z"
                              fill="#9A9B9C"
                            />
                            <path
                              d="M69.1315 57.8101C69.0116 53.3867 65.3759 49.8249 60.924 49.8249C58.8788 49.8249 56.9193 50.5815 55.4062 51.9553C54.1025 53.139 53.2216 54.6953 52.8766 56.4002C51.6442 56.6652 50.5192 57.3027 49.6488 58.241C48.5856 59.3874 48 60.8803 48 62.4447C48 65.8542 50.7738 68.6279 54.1832 68.6279C54.1913 68.6279 54.1993 68.6278 54.2051 68.6277H55.2476V66.6004H54.1967L54.1774 66.6006C51.8885 66.5975 50.0273 64.7344 50.0273 62.4447C50.0273 60.2934 51.7046 58.4738 53.846 58.3024L54.6873 58.2351L54.7735 57.3955C55.0977 54.2353 57.7419 51.8521 60.924 51.8521C64.3334 51.8521 67.1072 54.6259 67.1072 58.0353V59.8092H68.577C70.4494 59.8092 71.9727 61.3325 71.9727 63.2049C71.9727 65.0773 70.4494 66.6006 68.577 66.6006L66.8031 66.6002V68.6276H68.544C68.555 68.6278 68.566 68.628 68.577 68.628C71.5673 68.628 74 66.1952 74 63.205C74 60.4018 71.8624 58.0886 69.1315 57.8101Z"
                              fill="#9A9B9C"
                            />
                          </g>
                          <defs>
                            <filter
                              id="filter0_d_315_29"
                              x="20"
                              y="25"
                              width="81"
                              height="81"
                              filterUnits="userSpaceOnUse"
                              color-interpolation-filters="sRGB"
                            >
                              <feFlood
                                flood-opacity="0"
                                result="BackgroundImageFix"
                              />
                              <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                              />
                              <feMorphology
                                radius="2"
                                operator="dilate"
                                in="SourceAlpha"
                                result="effect1_dropShadow_315_29"
                              />
                              <feOffset dy="5" />
                              <feGaussianBlur stdDeviation="8" />
                              <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                              />
                              <feBlend
                                mode="normal"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_315_29"
                              />
                              <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_dropShadow_315_29"
                                result="shape"
                              />
                            </filter>
                          </defs>
                        </svg>
                      </a>
                    </div>
                    <div class="image-uploader-label">
                      <div class="text-grey-6">
                        <small>Recommended Size: (350x350)</small>
                      </div>
                      <div class="q-mb-md text-grey-6">
                        <small>PNG, JPG, GIF.</small>
                      </div>
                      <div class="text-grey-6">
                        <small>Max: 2MB</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </q-card-section>

            <q-card-actions class="row q-gutter-lg">
              <q-btn
                type="submit"
                text-color="black"
                label="Save"
                color="primary"
                unelevated
                style="width: 150px"
              />
              <q-btn
                text-color="black"
                label="Cancel"
                color="grey-4"
                unelevated
                style="width: 150px"
              />
            </q-card-actions>
          </q-card>
        </q-form>
      </div>
    </section>
  </q-page>
</template>



<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProfileSettingPage',
  data() {
    return {
      formData: {
        username: '',
        bio: '',
      },
    };
  },
  components: {},
  methods: {
    uploadFiles(event) {
      if (this.uploadMultiple) {
        this.$emit('input', 'library');

        for (let i = 0; i < event.target.files.length; i++) {
          let formData = new FormData();
          let file = event.target.files[i];

          this.filename = file.name;
          formData.append('file', file);
        }
      } else {
        let formData = new FormData();
        let file = event.target.files[0];

        this.filename = file.name;
        formData.append('file', file);
      }
    },
  },
});
</script>