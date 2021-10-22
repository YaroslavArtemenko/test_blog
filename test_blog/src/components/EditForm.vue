<template>
  <v-row justify="center">
    <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-text-field
                    v-model="category"
                    :error-messages="categoryErrors"
                    :counter="15"
                    label="Category"
                    required
                    @input="$v.category.$touch()"
                    @blur="$v.category.$touch()"
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-text-field
                    v-model="name"
                    :error-messages="nameErrors"
                    :counter="15"
                    label="Name"
                    required
                    @input="$v.name.$touch()"
                    @blur="$v.name.$touch()"
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-text-field
                    v-model="title"
                    :error-messages="titleErrors"
                    :counter="15"
                    label="Title"
                    required
                    @input="$v.title.$touch()"
                    @blur="$v.title.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    v-model="previewText"
                    :error-messages="previewErrors"
                    :counter="300"
                    label="Preview"
                    required
                    @input="$v.previewText.$touch()"
                    @blur="$v.previewText.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    v-model="mainText"
                    :error-messages="mainTextErrors"
                    :counter="1000"
                    label="Main Text"
                    required
                    @input="$v.mainText.$touch()"
                    @blur="$v.mainText.$touch()"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              text
              @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
              @click="updateArticle; dialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import {UPDATE_ARTICLE} from "../store";
import {validationMixin} from 'vuelidate'
import {required, minLength, maxLength} from 'vuelidate/lib/validators'

export default {
  name: "EditForm",
  mixins: [validationMixin],

  validations: {
    category: {required, minLength: minLength(3), maxLength: maxLength(15)},
    name: {required, minLength: minLength(3), maxLength: maxLength(15)},
    title: {required, minLength: minLength(3), maxLength: maxLength(15)},
    previewText: {required, minLength: minLength(10), maxLength: maxLength(300)},
    mainText: {required, minLength: minLength(10), maxLength: maxLength(1000)},
  },
  props: ['dialog', 'article'],
  data: () => ({
    category: '',
    name: '',
    title: '',
    previewText: '',
    mainText: '',
  }),

  computed: {
    categoryErrors () {
      const errors = []
      if (!this.$v.category.$dirty) return errors
      !this.$v.category.minLength && errors.push('Category must be at least 3 characters')
      !this.$v.category.maxLength && errors.push('Category must be at most 15 characters long')
      !this.$v.category.required && errors.push('Category is required.')
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
    updateArticle() {
      this.$v.$touch()
      this.$store.commit(UPDATE_ARTICLE, {
         ...this.props.article,
        category: this.category,
        name: this.name,
        previewText: this.previewText,
        author: this.author,
        date: new Date(),
        mainText: this.mainText
      })
    }
  },
}
</script>

<style scoped>

</style>