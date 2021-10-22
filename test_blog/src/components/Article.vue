<template>
  <v-card
      class="mx-auto"
      max-width="344"
  >
    <v-card-text>
      <v-btn
          class="mx-2"
          fab
          dark
          small
          color="cyan"
          style="left:80%"
          @click = "dialog = true"
      >
        <v-icon dark>
          mdi-pencil
        </v-icon>
      </v-btn>
      <div>{{ item.category }}</div>
      <p class="text-h4 text--primary">
        {{ item.name }}
      </p>
      <p>{{ item.author }} {{ item.date }}</p>
      <p>Preview</p>
      <div class="text--primary">
        {{ item.previewText }}

      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
          text
          color="teal accent-4"
          @click="reveal = true"
      >
        More
      </v-btn>
      <v-btn
          :loading="loading"
          class="ma-1"
          color="error"
          plain
          @click="remove"
      >
        Delete
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <v-card
          v-if="reveal"
          class="transition-fast-in-fast-out v-card--reveal"
          style="height: 100%;"
      >
        <v-card-text class="pb-0">
          <p class="text-h4 text--primary">
            Information
          </p>
          <p>{{ item.mainText }}</p>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-btn
              text
              color="teal accent-4"
              @click="reveal = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
    <EditForm v-bind:dialog="dialog"></EditForm>
  </v-card>

</template>

<script>
import {mapActions} from "vuex";
import {DELETE_ARTICLE} from "../store";
import EditForm from "./EditForm";


export default {
  name: "Article",
  components: {EditForm},
  data: () => ({
    reveal: false,
    loading: false,
    dialog: false
  }),
  methods: {
    remove() {
      this.loading = true
      this.$store.commit(DELETE_ARTICLE, this.item);
      this.loading = false
    },
  },
  props: ['item'],
  ...mapActions([
    // `mapActions` also supports payloads:
    'setArticle', // map `this.incrementBy(amount)` to `this.$store.dispatch('incrementBy', amount)`
    'deleteArticle'
  ]),
}
</script>

<style>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}


</style>