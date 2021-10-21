<template>
  <v-container fluid>
    <v-data-iterator
        :items="items"
        :items-per-page.sync="itemsPerPage"
        :page.sync="page"
        :search="search"
        :sort-by="sortBy.toLowerCase()"
        :sort-desc="sortDesc"
        hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar
            dark
            color="blue darken-3"
            class="mb-1"
        >
          <v-text-field
              v-model="search"
              clearable
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="mdi-magnify"
              label="Search"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-select
                v-model="sortBy"
                flat
                solo-inverted
                hide-details
                :items="keys"
                prepend-inner-icon="mdi-magnify"
                label="Sort by"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle
                v-model="sortDesc"
                mandatory
            >
              <v-btn
                  large
                  depressed
                  color="blue"
                  :value="false"
              >
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn
                  large
                  depressed
                  color="blue"
                  :value="true"
              >
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col
              v-for="item in props.items"
              :key="item.name"
              cols="12"
              sm="6"
              md="4"
              lg="3"
          >
            <!--            <v-card>-->
            <!--              <v-card-title class="subheading font-weight-bold">-->
            <!--                {{ item.name }}-->
            <!--              </v-card-title>-->

            <!--              <v-divider></v-divider>-->

            <!--              <v-list dense>-->
            <!--                <v-list-item-->
            <!--                    v-for="(key, index) in filteredKeys"-->
            <!--                    :key="index"-->
            <!--                >-->
            <!--                  <v-list-item-content :class="{ 'blue&#45;&#45;text': sortBy === key }">-->
            <!--                    {{ key }}:-->
            <!--                  </v-list-item-content>-->
            <!--                  <v-list-item-content-->
            <!--                      class="align-end"-->
            <!--                      :class="{ 'blue&#45;&#45;text': sortBy === key }"-->
            <!--                  >-->
            <!--                    {{ item[key.toLowerCase()] }}-->
            <!--                  </v-list-item-content>-->
            <!--                </v-list-item>-->
            <!--              </v-list>-->
            <!--            </v-card>-->
            <Article v-bind:item="item"></Article>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row
            class="mt-2"
            align="center"
            justify="center"
        >
          <span class="grey--text">Items per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  dark
                  text
                  color="primary"
                  class="ml-2"
                  v-bind="attrs"
                  v-on="on"
              >
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                  v-for="(number, index) in itemsPerPageArray"
                  :key="index"
                  @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span
              class="mr-4
            grey--text"
          >
            Page {{ page }} of {{ numberOfPages }}
          </span>
          <v-btn
              fab
              dark
              color="blue darken-3"
              class="mr-1"
              @click="formerPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
              fab
              dark
              color="blue darken-3"
              class="ml-1"
              @click="nextPage"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import Article from "./Article";

export default {
  name: "Search",
  components: {
    Article
  },
  data() {
    return {
      itemsPerPageArray: [4, 8, 12],
      search: '',
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: 'name',
      keys: [
        'Category',
        'Name',
        'Author',
        'Date'
      ],
      items: [
        {
          category: 'Sport',
          name: 'Football',
          previewText: 'Ole Gunnar Solskjaer\'s praise for Cristiano Ronaldo: \'That\'s what he does best\'',
          author: 'Yaroslav Artemenko',
          date: '21.10.2021',
          mainText: 'Solskjaer on Ronaldo: "I was really, really pleased with how he led the line. As a centre forward we asked him to run the channels, drop in, press more because we\'re at home, of course. We want to get the crowd behind us. He did everything a centre forward should be doing"'
        },
        {
          category: 'Meal',
          name: 'Ice cream sandwich',
          previewText: '          calories: 237,\n' +
              '          fat: 9.0,\n' +
              '          carbs: 37,\n' +
              '          protein: 4.3,\n' +
              '          sodium: 129',
          author: 'Nile Jensen',
          date: '21.10.2021',
          mainText: 'Ice cream sandwiches are as much a part of summer as rain is to spring and bicycles to childhood.\n' +
              '\n' +
              'These classic hot-weather treats remind me of drinking from the hose, piles of bikes discarded in front yards, sitting on the front porch, and licking the sticky, sweet chocolate cake from my fingertips, while creamy vanilla ice cream melts down my wrist.'
        },
        {
          category: 'Sport',
          name: 'Football',
          previewText: 'BIG DEAL Get £20 risk-free bet on Vitesse vs Tottenham Europa Conference League clash, plus 89/1 Paddy Power prediction special',
          author: 'Hadassah Philip',
          date: '21.10.2021',
          mainText: 'TOTTENHAM take on Vitesse Arnhem in their Europa Conference League group clash on Thursday.\n' +
              '\n' +
              'And Paddy Power are offering brand new customers a completely risk free £20 bet on the action PLUS a massive 89/1 bet builder special.'
        },
        {
          category: 'Meal',
          name: 'Cupcake',
          previewText: ' Calories: 305,\n' +
              '          Fat: 3.7,\n' +
              '          Carbs: 67,\n' +
              '          Protein: 4.3,\n' +
              '          Sodium: 413',
          author: 'Christie Brett',
          date: '21.10.2021',
          mainText: 'Bake these easy vanilla cupcakes in just 35 minutes. Perfect for birthdays, picnics or whenever you fancy a sweet treat, they\'re sure to be a crowd-pleaser'

        },
        {
          category: 'Meal',
          name: 'Gingerbread',
          previewText: ' calories: 356,\n' +
              '          fat: 16.0,\n' +
              '          carbs: 49,\n' +
              '          protein: 3.9,\n' +
              '          sodium: 327',
          author: 'Nathanial Guy',
          date: '21.10.2021',
          mainText: 'Here is my favorite gingerbread cookies recipe and one of the most popular Christmas cookie recipes on this website. Soft in the centers, crisp on the edges, perfectly spiced, molasses and brown sugar-sweetened holiday goodness. '
        },
      ],
    }
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage)
    },
    filteredKeys() {
      return this.keys.filter(key => key !== 'Name')
    },
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number
    },
  },
}
</script>

<style scoped>

</style>