<template>
  <q-page>
    <section class="helpresource-page-wrapper pt-100 pb-100">
      <div class="container">
        <h1 class="helpresource-section-title q-mb-lg">Help & Resources</h1>
        <div class="helpresource-card q-mb-xl">
          <q-expansion-item
            expand-separator
            label="This content has been removed for violating our terms and conditions."
            caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur in pulvinar massa. Sed sed mauris eget nisi lacinia condimentum vel accumsan nulla. Sed ut congue odio. Maecenas id augue posuere, rutrum enim eu, hendrerit risus. Praesent non urna ut ligula consectetur euismod ac sit amet orci. Nam sagittis venenatis diam..."
          >
            <q-card>
              <q-card-section>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quidem, eius reprehenderit eos corrupti commodi magni quaerat ex
                numquam, dolorum officiis modi facere maiores architecto
                suscipit iste eveniet doloribus ullam aliquid.
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </div>

        <div class="helpresource-card">
          <q-expansion-item
            expand-separator
            label="This content has been removed for violating our terms and conditions."
          >
            <q-card>
              <q-card-section>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quidem, eius reprehenderit eos corrupti commodi magni quaerat ex
                numquam, dolorum officiis modi facere maiores architecto
                suscipit iste eveniet doloribus ullam aliquid.
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </div>
      </div>
    </section>
  </q-page>
</template>



<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelpResouce',
  data() {
    return {};
  },
  components: {},
  methods: {},
});
</script>
