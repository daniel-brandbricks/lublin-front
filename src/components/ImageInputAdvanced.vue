<template>
  <div>
    <div class="wrap-img-input mb-3 mt-4">
      <img :src="image" alt="img">
    </div>
    <b-btn variant="primary" class="custom" block @click="showModal">Zmień</b-btn>

    <b-modal ref="advancedCropperModal" hide-footer size="xl"
             no-close-on-backdrop>
      <cropper ref="cropper"
               classname="cropper"
               :src="image"
               :restrictions="pixelsRestriction"
               :minHeight="minHeight"
               :minWidth="minWidth"
               :maxWidth="maxWidth"
               :maxHeight="maxHeight"
               :stencil-props="{
		              minAspectRatio: minAspectRatio,
            		  maxAspectRatio: maxAspectRatio
	             }"
      ></cropper>

      <div class="modal-footer">
        <b-btn variant="primary" class="btn" @click="crop">
          Zapisz
        </b-btn>
        <b-btn class="btn btn-primary" @click="$refs.file.click()">
          Wybierz zdjęcie
        </b-btn>
      </div>

      <input class="d-none" type="file" ref="file" @change="uploadImage($event)" accept="image/*">
    </b-modal>
  </div>
</template>

<script>
// import imageIcon from '../icons/image';
import {Cropper} from 'vue-advanced-cropper'
import ToastMixin from '@/mixins/toast-mixin'

export default {
  name: 'ImageInputAdvanced',
  mixins: [ToastMixin],
  props: [
    'minAspectRatio', 'maxAspectRatio', 'minHeight', 'minWidth', 'maxWidth', 'maxHeight', 'imgPath'
  ],
  components: {Cropper},
  data () {
    return {
      image: ''
    }
  },
  methods: {
    showModal () {
      this.$refs.advancedCropperModal.show()
    },
    pixelsRestriction (minWidth, minHeight, maxWidth, maxHeight, imageWidth, imageHeight) {
      return {
        minWidth: minWidth,
        minHeight: minHeight,
        maxWidth: maxWidth,
        maxHeight: maxHeight
      }
    },
    uploadImage (event) {
      // Reference to the DOM input element
      var input = event.target
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        // create a new FileReader to read this image and convert to base64 format
        var reader = new FileReader()
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = (e) => {
          // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
          // Read image as base64 and set to imageData
          this.image = e.target.result
        }
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0])
      }
    },
    crop () {
      const {coordinates, canvas} = this.$refs.cropper.getResult()
      this.coordinates = coordinates
      // You able to do different manipulations at a canvas
      // but there we just get a cropped image
      this.image = canvas.toDataURL()

      this.$emit('afterCropImage', this.image)
      this.$refs.advancedCropperModal.hide()
    }
  },
  created () {
    if (this.imgPath) {
      this.image = this.imgPath
    } else {
      this.image = 'https://placeimg.com/200/200/any'
    }
  }
}
</script>

<style scoped>
  .cropper {
    height: 600px;
    background: #DDD;
  }

  .upload-example-cropper {
    border: solid 1px #EEE;
    height: 300px;
    width: 100%;
  }
</style>
