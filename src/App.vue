<template>
  <v-app>
    <div id="app">
      <Nav />
      <v-main>
        <v-container>
          <router-view />
        </v-container>
      </v-main>
    </div>
  </v-app>
</template>

<script>
const Nav = () => import("@/components/Layout/Nav");

export default {
  components: {
    Nav,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
