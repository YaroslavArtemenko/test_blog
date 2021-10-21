<template>
  <v-card
      class="mx-auto"
      max-width="344"
  >
    <v-card-text>
      <div>{{ item.category }}</div>
      <p class="text-h4 text--primary">
        {{ item.name }}
      </p>
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
    </v-card-actions>

    <v-expand-transition>
      <v-card
          v-if="reveal"
          class="transition-fast-in-fast-out v-card--reveal"
          style="height: 100%;"
      >
        <v-card-text class="pb-0">
          <p class="text-h4 text--primary">
            Origin
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
  </v-card>
</template>

<script>
export default {
  name: "Article",
  data: () => ({
    reveal: false,
  }),
  props: ['item']
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