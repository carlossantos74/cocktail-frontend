<script setup lang="ts">
</script>

<template>
  <main>
  <Header />
    <slot /> 
  </main>
</template>


<style lang="scss" scoped>
  main { 
    overflow: hidden;
    height: 100%;
    display: grid;
  }
</style>