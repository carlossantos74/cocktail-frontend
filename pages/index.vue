<script setup lang="ts"></script>

<template>  
  <section>
    
    <CocktailCard v-for="(cocktail, index) in new Array(1000).fill('')" :key="index" /> 

  </section>
</template>


<style lang="scss" scoped>
  section { 
    max-height: 100%;
    overflow: auto;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
    
    padding: 24px;
  }
</style>