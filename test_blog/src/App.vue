<template>
  <v-app>
    <v-main>
      <Header/>
      <Search></Search>
      <NewPost></NewPost>
    </v-main>
  </v-app>
</template>

<script>
import Header from './components/Header';
import Search from "./components/Search";
import NewPost from "./components/NewPost";


export default {
  name: 'App',

  components: {
    Header,
    Search,
    NewPost
  },

  data: () => ({
    //
  }),
};
</script>
