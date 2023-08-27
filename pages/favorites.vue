<script setup lang="ts">
  import { Cocktail, StateType } from '@/common/types/global.types';

  const favorites = ref<Cocktail[]>([])
  const isLoading = ref<boolean>(true);

  const isEmpty = computed<boolean>(() => !favorites.value?.length)

  onMounted(() => fetchFavorites())
  onBeforeUpdate(() => fetchFavorites())

  const fetchFavorites = () => {
    isLoading.value = true;

    const list = localStorage.getItem('favorites') || '[]';
    favorites.value = JSON.parse(list);

    isLoading.value = false;
  }
</script>

<template>
  <header>
    <h1>Favorites</h1>
  </header>
  <State 
    v-if="isLoading || isEmpty" 
    :type="isLoading ? StateType.LOADING : StateType.EMPTY"
    :message="isLoading ? '' : `You don't have any favorite cocktail yet. Go to the home page and start adding some!`"
  />
  <section v-else>
    <CocktailCard 
      v-for="(cocktail) in favorites" 
      :cocktail="cocktail" 
      :key="cocktail.idDrink" 
    /> 
  </section>
</template>

<style lang="scss" scoped>
  section { 
    height: 100%;
    overflow: auto;

    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(325px, 1fr));
    grid-auto-rows: 100px;
    justify-items: center;
    gap: 12px;
    
    padding: 24px;
  }

  header { 
    padding: 24px;
  }
</style>

