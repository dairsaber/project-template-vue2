<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <svg-icon icon-class="user" />
  </div>
</template>

<script>
import { testSum } from "@/utils"
export default {
  name: "Home",
  mounted() {
    console.log(`test`, testSum(1, 3))
  },
}
</script>
