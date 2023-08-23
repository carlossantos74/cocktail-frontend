<script setup lang="ts">
</script>

<template>
  <Header />
  <main>
    <slot /> 
  </main>
</template>


<style lang="scss" scoped>
  main { 
    overflow: hidden;
    height: 100%;
  }
</style>