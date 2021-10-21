<template>
  <v-app>
    <v-main>
      <Header/>
      <Search></Search>

    </v-main>
  </v-app>
</template>

<script>
import Header from './components/Header';
import Search from "./components/Search";




export default {
  name: 'App',

  components: {
    Header,
    Search
  },

  data: () => ({
    //
  }),
};
</script>
