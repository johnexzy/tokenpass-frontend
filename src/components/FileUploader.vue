<template>
  <div
    class="
      full-height
      column
      items-center
      justify-center
      text-center
      bg-gray-100
      relative-position
      uploader-wrapper
    "
    @dragover="dragover"
    @dragleave="dragleave"
    @drop="drop"
  >
    <div class="text-h6 text-grey-9">
      Drag & Drop files here or
      <q-btn
        no-caps
        text-color="blue"
        size="md"
        flat
        label="browse"
        @click="$refs.files.click()"
        unelevated
      />
    </div>
    {{ filename }}
    <div class="text-subtitle1 text-grey-5 q-my-sm">
      All files allowed. Max upload size: 150MB
    </div>

    <input
      type="file"
      ref="files"
      style="display: none"
      @input="uploadFiles"
      :multiple="uploadMultiple"
    />
  </div>
</template>

<script>
import axios from 'axios';

export default {
  delimiters: ['${', '}'],
  data() {
    return {
      filename: '',
    };
  },
  props: {
    value: String,
    uploadMultiple: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    uploadFiles(event) {
      if (this.uploadMultiple) {
        this.$emit('input', 'library');

        for (let i = 0; i < event.target.files.length; i++) {
          let formData = new FormData();
          let file = event.target.files[i];

          // axios
          //   .post('/media?attachment_type=image&private=false', formData, {
          //     headers: {
          //       'Content-Type': 'multipart/form-data',
          //     },
          //   })
          //   .then((res) => {
          //     // Do Your Stuff
          //   })
          //   .catch((err) => {
          //     // Do Your Stuff
          //   });

          this.filename = file.name;
          formData.append('file', file);
        }
      } else {
        let formData = new FormData();
        let file = event.target.files[0];

        // this.$emit('input', 'library');

        // axios
        //   .post('/media?attachment_type=image&private=false', formData, {
        //     headers: {
        //       'Content-Type': 'multipart/form-data',
        //     },
        //   })
        //   .then((res) => {
        //     // Do Your Stuff
        //   })
        //   .catch((err) => {
        //     this.$emit('input', 'upload');
        //     // Do Your Stuff
        //   });

        this.filename = file.name;
        formData.append('file', file);
      }
    },
    remove(i) {
      this.filelist.splice(i, 1);
    },
    dragover(event) {
      event.preventDefault();
      // Add some visual fluff to show the user can drop its files
      if (!event.currentTarget.classList.contains('draggable-wrapper')) {
        event.currentTarget.classList.add('draggable-wrapper');
      }
    },
    dragleave(event) {
      // Clean up
      event.currentTarget.classList.add('draggable-wrapper');
      event.currentTarget.classList.remove('draggable-wrapper');
    },
    drop(event) {
      event.preventDefault();
      // this.$refs.files.files = event.dataTransfer.files;
      let data = {
        target: {
          files: [],
        },
      };
      data.target.files = event.dataTransfer.files;
      this.uploadFiles(data); // Trigger the onChange event manually
      // Clean up
      event.currentTarget.classList.remove('draggable-wrapper');
    },
  },
};
</script>

<style>
.draggable-wrapper {
  background-color: #ececec;
  opacity: 0.7;
  color: white !important;
  border: 6px dashed #dddddd;
}
.uploader-wrapper {
  border: 6px dashed #dddddd;
  padding: 90px;
  border-radius: 10px;
}
</style>