<template>
  <form style="margin-top: 15px">

    <v-card color="basil">
      <v-card-title class="text-center justify-center py-6">
        <h1 class="font-weight-bold text-h2 basil--text">
          CREATE NEW POST
        </h1>
      </v-card-title>

    </v-card>

    <v-text-field
        v-model="category"
        :error-messages="categoryErrors"
        :counter="15"
        label="Category"
        required
        @input="$v.category.$touch()"
        @blur="$v.category.$touch()"
    ></v-text-field>

    <v-text-field
        v-model="author"
        :error-messages="authorErrors"
        :counter="20"
        label="Author"
        required
        @input="$v.author.$touch()"
        @blur="$v.author.$touch()"
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
        v-model="previewText"
        :error-messages="previewErrors"
        :counter="300"
        label="Preview"
        required
        @input="$v.previewText.$touch()"
        @blur="$v.previewText.$touch()"
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
import {CREATE_ARTICLE} from "../store";

import { v4 as uuidv4 } from 'uuid';


let current_datetime = new Date()
let formatted_date = current_datetime.getDate() + "." + (current_datetime.getMonth() + 1) + "." + current_datetime.getFullYear() + '  ' + current_datetime.getHours() + ':' + current_datetime.getMinutes()


export default {
  name: "NewPost",
  mixins: [validationMixin],

  validations: {
    category: { required, minLength:minLength(3), maxLength:maxLength(15) },
    author: { required, minLength: minLength(3), maxLength: maxLength(20) },
    title: {required, minLength: minLength(3),  maxLength: maxLength(15)},
    previewText: {required, minLength:minLength(10), maxLength: maxLength(300)},
    mainText: {required, minLength:minLength(10), maxLength:maxLength(1000)},

    checkbox: {
      checked (val) {
        return val
      },
    },
  },

  data: () => ({
    category: '',
    author: '',
    title: '',
    previewText: '',
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
  props: ['item'],

  computed: {
    checkboxErrors () {
      const errors = []
      if (!this.$v.checkbox.$dirty) return errors
      !this.$v.checkbox.checked && errors.push('You must agree to continue!')
      return errors
    },
    categoryErrors () {
      const errors = []
      if (!this.$v.category.$dirty) return errors
      !this.$v.category.minLength && errors.push('Category must be at least 3 characters')
      !this.$v.category.maxLength && errors.push('Category must be at most 15 characters long')
      !this.$v.category.required && errors.push('Category is required.')
      return errors
    },
    authorErrors () {
      const errors = []
      if (!this.$v.author.$dirty) return errors
      !this.$v.author.minLength && errors.push('Name must be at least 3 characters')
      !this.$v.author.maxLength && errors.push('Name must be at most 20 characters long')
      !this.$v.author.required && errors.push('Name is required.')
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
      if (!this.$v.previewText.$dirty) return errors
      !this.$v.previewText.minLength && errors.push('Preview must be at least 10 characters')
      !this.$v.previewText.maxLength && errors.push('Preview must be at most 300 characters long')
      !this.$v.previewText.required && errors.push('Preview is required')
      return errors
    },
    mainTextErrors () {
      const errors = []
      if (!this.$v.mainText.$dirty) return errors
      !this.$v.mainText.minLength && errors.push('Main text must be at least 10 characters')
      !this.$v.mainText.maxLength && errors.push('Main text must be at most 1000 characters long')
      !this.$v.mainText.required && errors.push('Text is required')
      return errors
    },
  },

  methods: {
    submit () {
      this.$v.$touch()
      this.$store.commit(CREATE_ARTICLE,         {
        id: uuidv4(),
        category: this.category,
        title: this.title,
        previewText: this.previewText,
        author: this.author,
        date: formatted_date,
        mainText: this.mainText
      })
    },
    clear () {
      this.$v.$reset()
      this.category = ''
      this.author = ''
      this.title = ''
      this.previewText = ''
      this.mainText = ''
      this.checkbox = false
    },
  },
}
</script>

<style>

</style>