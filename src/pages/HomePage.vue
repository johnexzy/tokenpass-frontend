<template>
  <q-page>
    <section class="form-wrapper pt-100 pb-100">
      <q-form greedy class="container" v-on:submit.prevent="onFormSubmit">
        <h1 class="form-title">Add New Gated Content</h1>
        <p class="form-content q-mb-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur in
          pulvinar massa. Sed sed mauris eget nisi lacinia condimentum vel
          accumsan nulla. Sed ut congue odio. Maecenas id augue posuere, rutrum
          enim eu, hendrerit risus. Praesent non urna ut ligula consectetur
          euismod ac sit amet orci. Nam sagittis venenatis diam...
        </p>

        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-12 col-lg-12 q-mb-xl">
            <label class="form-label" for="">Title (required)</label>
            <br />
            <br />
            <q-input
              outlined
              class="bg-white"
              v-model="formData.title"
              placeholder="Set a title for this content"
            />
          </div>

          <div class="col-12 col-md-12 col-lg-12 q-mb-xl">
            <label class="form-label" for=""
              >Choose what type of content you want to Token Gate</label
            >
            <br />
            <br />
            <div class="row q-col-gutter-md">
              <div
                v-for="(type, index) in itemTypes"
                :key="index"
                class="col-6 col-md-auto col-lg-auto"
              >
                <q-card
                  @click="selectTokenType(type.value)"
                  flat
                  class="token-type-card"
                  :class="type.value == formData.type ? 'active' : ''"
                >
                  <svg
                    :class="type.value != formData.type ? 'hidden' : ''"
                    class="active-tick"
                    width="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 0C4.4775 0 0 4.4775 0 10C0 15.5225 4.4775 20 10 20C15.5225 20 20 15.5225 20 10C20 4.4775 15.5225 0 10 0ZM8.45 14.6144L3.84875 10.0125L5.61625 8.245L8.44938 11.0794L14.46 5.06875L16.2275 6.83625L8.45 14.6144Z"
                      fill="#28DC75"
                    />
                  </svg>
                  <q-card-section class="column items-center justify-center">
                    <span v-html="type.icon"></span>
                    <p
                      class="token-type-label"
                      :class="type.value == formData.type ? 'active' : ''"
                    >
                      {{ type.label }}
                    </p>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-12 col-lg-12 q-mb-xl">
            <FileUploader
              v-model="formData.attachment"
              :upload-multiple="false"
            />
          </div>

          <div class="col-12 col-md-12 col-lg-12 q-mb-xl">
            <label class="form-label" for="">Description</label>
            <br />
            <br />
            <q-input
              class="bg-white"
              placeholder="Write a short description about your content"
              type="textarea"
              outlined
              v-model="formData.description"
            />
          </div>

          <div class="col-12 col-md-12 col-lg-12 q-mb-xl">
            <label class="form-label" for="">Tagline</label>
            <br />
            <br />
            <q-input
              class="bg-white"
              placeholder="Write a short description about your content"
              outlined
              v-model="formData.tagline"
            />
          </div>

          <div class="col-12 col-md-12 col-lg-12 q-mb-xl">
            <label class="form-label" for="">Add Gating</label>
            <br />
            <label class="text-grey-6" for=""
              ><small
                >The following tokens will be required before your content is
                viewable
              </small></label
            >
            <br />
            <br />
            <div class="row q-col-gutter-lg-md">
              <q-card
                flat
                class="token-type-card-sm q-ma-md"
                v-for="(t, i) in formData.token"
                :key="i"
              >
                <q-card-section
                  dense
                  class="column items-center justify-center"
                >
                  <p class="token-type-name">{{ t.token_name }}</p>
                  <p class="token-type-address">
                    {{ format_address(t.contract_address) }}
                  </p>
                </q-card-section>
                <q-card-actions
                  horizontal
                  align="right"
                  dense
                  class="q-ma-none token-action-delete"
                >
                  <q-btn
                    round
                    text-color="red"
                    flat
                    size="sm"
                    icon="delete"
                    @click="removeToken(t)"
                  />
                </q-card-actions>
              </q-card>
              <q-btn
                color="primary"
                unelevated
                icon="add"
                v-show="!formData.token.length"
                class="token-type-card-btn q-ma-md"
                padding="lg"
                text-color="black"
                size="lg"
                @click="addNewTokenModal = true"
              />
            </div>
          </div>

          <div
            class="col-12 col-md-12 col-lg-12 q-mb-xl"
            v-show="
              formData.token.filter((v) => v.blockchain === 'mainnet').length
            "
          >
            <label class="form-label" for=""
              ><q-checkbox
                v-model="formData.subscription.allow"
                color="primary"
              />
              Allow Subscription (only applies to Ethereum based Tokens)
              <q-icon
                color="grey-8"
                class="pointer"
                name="ion-information-circle"
              >
                <q-tooltip
                  anchor="top right"
                  self="top middle"
                  class="bg-amber text-black shadow-4"
                  :offset="[10, 10]"
                >
                  Subscriptions allow you to collect ERC-20 token payments for
                  users that may not hold tokens that you specify. Gas fees will
                  apply.
                </q-tooltip>
              </q-icon>
            </label>
            <br />
            <br />
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-2 col-lg-2">
                <q-input
                  placeholder="Price"
                  outlined
                  type="number"
                  class="bg-white"
                  v-model="formData.subscription.price"
                >
                  <template v-slot:prepend>
                    <q-icon name="ion-pricetag" color="grey-6" />
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-4 col-lg-4">
                <q-input
                  placeholder="Duration"
                  outlined
                  type="number"
                  class="bg-white"
                  v-model="formData.subscription.duration"
                >
                  <template v-slot:append>
                    <q-separator vertical />
                    <label for="" class="text-caption grey-6 q-pl-sm"
                      >Days</label
                    >
                  </template>
                </q-input>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-12 col-lg-12">
            <q-btn
              label="CREATE"
              unelevated
              :loading="submiting"
              color="primary"
              text-color="black"
              class="full-width"
              size="lg"
              type="submit"
            />
          </div>
        </div>
      </q-form>
    </section>
    <q-dialog v-model="addNewTokenModal" persistent>
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
              v-model="newTokenObj.blockchain"
              :options="Networks"
              label="Choose Blockchain"
            />
          </div>
          <div class="col-12 col-md-6 col-lg-6">
            <q-select
              outlined
              dense
              v-model="newTokenObj.token_standard"
              :options="token_standard"
              label="Choose Token type"
            />
          </div>
          <div class="col-12 col-md-12 col-lg-12">
            <q-input
              dense
              outlined
              v-model="newTokenObj.contract_address"
              label="Enter contract address for this token"
            />
          </div>
          <div class="col-12 col-md-2 col-lg-2">
            <q-input dense outlined v-model="newTokenObj.token_id" label="ID" />
          </div>
          <div class="col-12 col-md-2 col-lg-2">
            <q-input
              dense
              outlined
              v-model="newTokenObj.amount_required"
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
              @click="addNewToken"
              :loading="isLoadingToken"
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
  </q-page>
</template>

<script lang="ts" setup>
import FileUploader from 'src/components/FileUploader.vue';
import {
  gatingFormData,
  tokenType,
  tokenStandard,
  tokenStandardOptions,
  NetworkType,
} from 'src/scripts/types/types';
import { Ref, ref } from 'vue';
import { useQuasar } from 'quasar';
import TokenUtils, { newToken } from 'src/scripts/utils/contractUtils';
import { useUserStore } from '../stores/user';

import Networks from 'src/scripts/networks/network';
import { useRouter } from 'vue-router';
const $q = useQuasar();
const $r = useRouter();
const $store = useUserStore();
const formData: Ref<gatingFormData> = ref({
  title: '',
  type: 'link',
  attachment: {},
  description: '',
  tagline: '',
  gating: '',
  creator_address: $store.Account,
  subscription: {
    allow: false,
    price: 0,
    duration: 0,
  },
  token: [],
});

const newTokenObj: Ref<
  tokenType<tokenStandardOptions<tokenStandard>, NetworkType>
> = ref(newToken);
const token_standard: tokenStandardOptions<tokenStandard>[] = [
  {
    label: 'ERC1155',
    value: 'erc1155',
  },
  {
    label: 'ERC721',
    value: 'erc721',
  },
  {
    label: 'ERC20',
    value: 'erc20',
  },
];

const addNewTokenModal = ref(false);
const isLoadingToken = ref(false);
const itemTypes: { value: string; label: string; icon: string }[] = [
  {
    value: 'link',
    label: 'Link',
    icon: '<svg width="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" > <path d="M20.0002 14.343C19.2472 15.096 18.8662 16.078 18.8402 17.068C19.7832 17.339 20.6722 17.844 21.4142 18.586C23.7542 20.926 23.7542 24.732 21.4142 27.071L15.0502 33.435C12.7102 35.775 8.90424 35.775 6.56524 33.435C4.22524 31.095 4.22524 27.289 6.56524 24.95L11.2492 20.266C10.7872 18.524 10.7132 16.701 11.0462 14.935C10.7202 15.189 10.4012 15.457 10.1012 15.757L3.73724 22.121C-0.161762 26.02 -0.161762 32.364 3.73724 36.263C7.63624 40.162 13.9802 40.162 17.8792 36.263L24.2432 29.899C28.1422 26 28.1422 19.656 24.2432 15.757C23.2372 14.751 22.0672 14.01 20.8202 13.523L20.0002 14.343Z" fill="#212121" /> <path d="M22.1213 3.737L15.7573 10.101C11.8583 14 11.8583 20.344 15.7573 24.243C16.7633 25.249 17.9333 25.99 19.1803 26.477L20.0003 25.657C20.7553 24.902 21.1283 23.919 21.1483 22.929C20.2103 22.657 19.3253 22.153 18.5863 21.414C16.2463 19.074 16.2463 15.268 18.5863 12.929L24.9503 6.565C27.2903 4.225 31.0963 4.225 33.4353 6.565C35.7753 8.905 35.7753 12.711 33.4353 15.05L28.7463 19.739C29.2103 21.483 29.2743 23.307 28.9413 25.075C29.2723 24.819 29.5953 24.547 29.8993 24.243L36.2633 17.879C40.1623 13.98 40.1623 7.636 36.2633 3.737C32.3643 -0.161997 26.0203 -0.162997 22.1213 3.737Z" fill="#212121" /> </svg>',
  },
  {
    value: 'video',
    label: 'Video',
    icon: '<svg width="36" height="25" viewBox="0 0 36 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28.0321 9L36.0001 1.032V22.97L28.0321 15.002V22.034C28.0321 23.16 27.0941 24.002 25.9701 24.002H1.97008C1.70984 24.0086 1.45098 23.9622 1.20923 23.8656C0.967482 23.7691 0.747896 23.6243 0.56382 23.4403C0.379744 23.2562 0.235023 23.0366 0.138455 22.7949C0.0418874 22.5531 -0.00451106 22.2942 0.00208047 22.034V1.972C-0.00451106 1.71176 0.0418874 1.4529 0.138455 1.21115C0.235023 0.969405 0.379744 0.749819 0.56382 0.565743C0.747896 0.381667 0.967482 0.236947 1.20923 0.140379C1.45098 0.0438105 1.70984 -0.00258845 1.97008 0.00400308H25.9701C27.0961 0.00400308 28.0321 0.848004 28.0321 1.972V9.004V9Z" fill="#212121"/></svg>',
  },
  {
    value: 'music',
    label: 'Music',
    icon: '<svg width="44" height="45" viewBox="0 0 44 45" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 27.93C11.8 27.34 10.44 27 9 27C7.21997 27 5.47991 27.5278 3.99987 28.5168C2.51983 29.5057 1.36628 30.9113 0.685088 32.5559C0.00389951 34.2004 -0.17433 36.01 0.172937 37.7558C0.520203 39.5016 1.37737 41.1053 2.63604 42.364C3.89472 43.6226 5.49836 44.4798 7.24419 44.8271C8.99002 45.1743 10.7996 44.9961 12.4442 44.3149C14.0887 43.6337 15.4943 42.4802 16.4832 41.0001C17.4722 39.5201 18 37.78 18 36V16C18 14.9 18.9 14 20 14H37C38.1 14 39 14.9 39 16V27.93C37.7555 27.3177 36.387 26.9996 35 27C33.22 27 31.4799 27.5278 29.9999 28.5168C28.5198 29.5057 27.3663 30.9113 26.6851 32.5559C26.0039 34.2004 25.8257 36.01 26.1729 37.7558C26.5202 39.5016 27.3774 41.1053 28.636 42.364C29.8947 43.6226 31.4984 44.4798 33.2442 44.8271C34.99 45.1743 36.7996 44.9961 38.4442 44.3149C40.0887 43.6337 41.4943 42.4802 42.4832 41.0001C43.4722 39.5201 44 37.78 44 36V2.2C44 0.98 43.02 0 41.8 0H15.2C13.98 0 13 0.98 13 2.2V27.93Z" fill="#212121"/></svg>',
  },
  {
    value: 'ebook',
    label: 'E-Books & PDFs',
    icon: '<svg width="41" height="36" viewBox="0 0 41 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.5 33C22.5 33 31.782 29.907 39 35.718V33C30.5625 28.3125 22.5 33 22.5 33ZM0 3V32.8125C0 32.8125 4.032 29.9055 9.75 29.9055C15.468 29.9055 19.5 32.8125 19.5 32.8125V3.375C19.5 3.375 15.468 0 9.75 0C4.032 0 0 3 0 3ZM3 6H9V13.5H3V6ZM16.5 25.5H3V24H16.5V25.5ZM16.5 22.5H3V21H16.5V22.5ZM16.5 19.5H3V18H16.5V19.5ZM16.5 16.5H3V15H16.5V16.5ZM10.5 6H16.5V7.5H10.5V6ZM10.5 9H16.5V10.5H10.5V9ZM10.5 12H16.5V13.5H10.5V12ZM30.75 0C25.032 0 21 3 21 3V32.8125C21 32.8125 25.032 29.9055 30.75 29.9055C36.468 29.9055 40.5 32.8125 40.5 32.8125V3.375C40.5 3.375 36.468 0 30.75 0ZM37.5 25.5H24V24H37.5V25.5ZM37.5 22.5H24V21H37.5V22.5ZM37.5 19.5H24V18H37.5V19.5ZM37.5 16.5H24V15H37.5V16.5ZM37.5 13.5H24V12H37.5V13.5ZM37.5 10.5H24V9H37.5V10.5ZM37.5 7.5H24V6H37.5V7.5ZM1.5 33V35.718C8.718 29.907 18 33 18 33C18 33 9.9375 28.3125 1.5 33Z" fill="#212121"/></svg>',
  },
  {
    value: 'article',
    label: 'Article',
    icon: '<svg width="38" height="42" viewBox="0 0 38 42" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M27 -2.414V7H36.414L27 -2.414Z" fill="#212121"/><path d="M25 8V-4H2C0.895 -4 0 -3.105 0 -2V40C0 41.105 0.895 42 2 42H36C37.105 42 38 41.105 38 40V9H26C25.448 9 25 8.552 25 8ZM9 10H17C17.553 10 18 10.448 18 11C18 11.552 17.553 12 17 12H9C8.447 12 8 11.552 8 11C8 10.448 8.447 10 9 10ZM29 32H9C8.447 32 8 31.552 8 31C8 30.448 8.447 30 9 30H29C29.553 30 30 30.448 30 31C30 31.552 29.553 32 29 32ZM30 21C30 21.552 29.553 22 29 22H9C8.447 22 8 21.552 8 21C8 20.448 8.447 20 9 20H29C29.553 20 30 20.448 30 21Z" fill="#212121"/></svg>',
  },
];

function selectTokenType(value: string) {
  if (formData.value.type == value) {
    formData.value.type = 'link';
  } else {
    formData.value.type = value;
  }
}

async function addNewToken() {
  isLoadingToken.value = true;

  //check if address is valid
  if (!TokenUtils.isValidAddress(newTokenObj.value.contract_address)) {
    isLoadingToken.value = false;

    $q.notify({
      color: 'red',
      message: 'Please enter a valid address',
      textColor: 'white',
    });

    return;
  }
  console.log(newTokenObj.value);
  const tc = new TokenUtils(
    $store,
    newTokenObj.value.token_standard.value,
    newTokenObj.value.contract_address,
    newTokenObj.value.blockchain.value
  );

  // get Token Name
  newTokenObj.value.token_name = await tc.getTokenName();

  // destructure blockchain and token_standard
  const { blockchain, token_standard } = newTokenObj.value;

  // save token details
  formData.value.token.push({
    ...newTokenObj.value,
    token_standard: token_standard.value,
    blockchain: blockchain.value,
  });

  // reset addnew token form
  resetAddTokenForm();
  isLoadingToken.value = false;
  addNewTokenModal.value = false;
}

function format_address(account: string) {
  return account.substr(0, 5) + '...' + account.substr(-4);
}

function removeToken(token: tokenType<tokenStandard, string>) {
  $q.dialog({
    title: 'Delete `' + token.token_name + '` ?',
    message: '',
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      // console.log('>>>> OK')
      formData.value.token.splice(formData.value.token.indexOf(token), 1);
    })
    .onOk(() => {
      $q.notify('Deleted Successfully');
    })
    .onCancel(() => {
      // console.log('>>>> Cancel')
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
}

function resetAddTokenForm() {
  newTokenObj.value = {
    blockchain: {
      network: 'mainnet',
      name: 'Ethereum',
      value: 'mainnet',
      label: 'Ethereum',
      chainId: 1,
      currency: 'ETH',
      rpc: [],
      explorer: 'https://etherscan.io',
      api: 'https://api.etherscan.io/api?module=account&action=tokentx',
    },
    token_standard: {
      label: 'ERC721',
      value: 'erc721',
    } as tokenStandardOptions<tokenStandard>,
    contract_address: '',
    token_id: '',
    amount_required: '',
    token_name: '',
  };
}
const submiting = ref(false);
async function onFormSubmit() {
  submiting.value = true;
  const { title, type, token, creator_address, tagline, description } =
    formData.value;
  const fD = {
    title,
    type,
    creator_address,
    tagline,
    description,
    ...token[0],
  };
  // fD['token_id'] = token[0].token_id
  console.log(JSON.stringify(fD));
  await $store
    .createGateItem(fD)
    .then(() => {
      if ($store.gatedResponseStatus === 201) {
        $r.push('/fileuploaded');
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submiting.value = false;
    });
}
</script>
