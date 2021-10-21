<template>
  <form style="margin-top: 15px">

    <v-card color="basil">
      <v-card-title class="text-center justify-center py-6">
        <h1 class="font-weight-bold text-h2 basil--text">
          CREATE NEW POST
        </h1>
      </v-card-title>

    </v-card>

    <v-select
        v-model="select"
        :items="items"
        :error-messages="selectErrors"
        label="Category"
        required
        @change="$v.select.$touch()"
        @blur="$v.select.$touch()"
    ></v-select>

    <v-text-field
        v-model="name"
        :error-messages="nameErrors"
        :counter="15"
        label="Name"
        required
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
    ></v-text-field>

    <v-text-field
        v-model="title"
        :error-messages="titleErrors"
        :counter="15"
        label="Title"
        required
        @input="$v.title.$touch()"
        @blur="$v.title.$touch()"
    ></v-text-field>

    <v-text-field
        v-model="preview"
        :error-messages="previewErrors"
        :counter="300"
        label="Preview"
        required
        @input="$v.preview.$touch()"
        @blur="$v.preview.$touch()"
    ></v-text-field>

    <v-text-field
        v-model="mainText"
        :error-messages="mainTextErrors"
        :counter="1000"
        label="Main Text"
        required
        @input="$v.mainText.$touch()"
        @blur="$v.mainText.$touch()"
    ></v-text-field>

    <v-checkbox
        v-model="checkbox"
        :error-messages="checkboxErrors"
        label="Do you agree?"
        required
        @change="$v.checkbox.$touch()"
        @blur="$v.checkbox.$touch()"
    ></v-checkbox>

    <v-btn
        class="mr-4"
        @click="submit"
    >
      submit
    </v-btn>
    <v-btn @click="clear">
      clear
    </v-btn>
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'

export default {
  name: "NewPost",
  mixins: [validationMixin],

  validations: {
    name: { required, minLength: minLength(3), maxLength: maxLength(15) },
    title: {required, minLength: minLength(3),  maxLength: maxLength(15)},
    preview: {required, minLength:minLength(10), maxLength: maxLength(300)},
    mainText: {required, minLength:minLength(10), maxLength:maxLength(1000)},
    select: { required },
    checkbox: {
      checked (val) {
        return val
      },
    },
  },

  data: () => ({
    name: '',
    title: '',
    preview: '',
    mainText: '',
    select: null,
      // items: [
      //   'Item 1',
      //   'Item 2',
      //   'Item 3',
      //   'Item 4',
      // ],
    checkbox: false,
  }),
  props: ['items'],

  computed: {
    checkboxErrors () {
      const errors = []
      if (!this.$v.checkbox.$dirty) return errors
      !this.$v.checkbox.checked && errors.push('You must agree to continue!')
      return errors
    },
    selectErrors () {
      const errors = []
      if (!this.$v.select.$dirty) return errors
      !this.$v.select.required && errors.push('Item is required')
      return errors
    },
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.minLength && errors.push('Name must be at least 3 characters')
      !this.$v.name.maxLength && errors.push('Name must be at most 15 characters long')
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    titleErrors () {
      const errors = []
      if (!this.$v.title.$dirty) return errors
      !this.$v.title.minLength && errors.push('Title must be at least 3 characters')
      !this.$v.title.maxLength && errors.push('Title must be at most 15 characters long')
      !this.$v.title.required && errors.push('Title is required.')
      return errors
    },
    previewErrors () {
      const errors = []
      if (!this.$v.preview.$dirty) return errors
      !this.$v.preview.minLength && errors.push('Preview must be at least 10 characters')
      !this.$v.preview.maxLength && errors.push('Preview must be at most 300 characters long')
      !this.$v.preview.required && errors.push('Preview is required')
      return errors
    },
    mainTextErrors () {
      const errors = []
      if (!this.$v.preview.$dirty) return errors
      !this.$v.mainText.minLength && errors.push('Main text must be at least 10 characters')
      !this.$v.mainText.maxLength && errors.push('Main text must be at most 1000 characters long')
      !this.$v.mainText.required && errors.push('Text is required')
      return errors
    },
  },

  methods: {
    submit () {
      this.$v.$touch()
    },
    clear () {
      this.$v.$reset()
      this.name = ''
      this.title = ''
      this.preview = ''
      this.mainText = ''
      this.select = null
      this.checkbox = false
    },
  },
}
</script>

<style>

</style>