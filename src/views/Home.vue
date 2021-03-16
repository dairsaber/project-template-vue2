<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue"
import { testSum } from "@/utils"
export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  mounted() {
    console.log(`test`, testSum(1, 3))
  },
}
</script>
