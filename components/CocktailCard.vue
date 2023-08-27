
<script setup lang="ts">
  import { Cocktail } from '@/common/types/global.types';

  defineProps({
    cocktail: {
      type: Object as PropType<Cocktail>,
      required: true
    }
  });
</script>

<template>
  <div>
    <img :src="cocktail.strDrinkThumb" />
    <h1>{{ cocktail.strDrink }}</h1>
    
    <button class="cs-button--small">
      Ver detalhes 
      <Icon name="ic:baseline-arrow-forward" /> 
    </button>
  </div>  
</template>

<style scoped lang="scss">
  div { 
    height: 370px;
    width: 325px;

    background: var(--violet-3);
    border-radius: 12px;  
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;

    overflow: hidden;
    gap: 8px;

    img { 
      height: 200px;
    }

    p { 
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-align: center;

      margin-bottom: 8px;
    }

    h1 {
      margin-bottom: 8px;
    }
  }
</style>