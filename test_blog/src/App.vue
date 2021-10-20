<template>
  <v-app>
    <v-main>
      <HelloWorld/>
      <Search></Search>

    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import Search from "./components/Search";




export default {
  name: 'App',

  components: {
    HelloWorld,
    Search
  },

  data: () => ({
    //
  }),
};
</script>
