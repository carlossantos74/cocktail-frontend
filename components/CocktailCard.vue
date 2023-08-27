
<script setup lang="ts">
  import { Cocktail } from '@/common/types/global.types';

  import { useModal } from 'vue-final-modal'
  import CocktailModal from './CocktailModal.vue'

  const props = defineProps({
    cocktail: {
      type: Object as PropType<Cocktail>,
      required: true
    }
  });

  const { open, close } = useModal({
    component: CocktailModal,
    attrs: {
      cocktailId: props.cocktail.idDrink,
      onClose: () => close()
    },
  })
</script>

<template>
  <div class="cocktail-card">
    <div class="cocktail-card__title">
      <span class="badge">
        <Icon name="mdi:glass-cocktail" />
      </span>

      <h3>{{ cocktail.strDrink }}</h3>
    </div>
    
  
    <div class="cocktail-card__button-wrapper">
      <button class="cs-button--small" @click="open">
        <Icon name="ic:baseline-arrow-forward" />
      </button>
    </div>
  </div>  
</template>

<style scoped lang="scss">
  div.cocktail-card { 
    width: 100%;
    background: var(--gray-3);
    border-radius: 4px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.20);
    padding: 12px;

    justify-content: space-between;
    gap: 12px;

    overflow: hidden;

    .badge {
      padding: 8px;
      font-size: 24px;
      background-color: var(--violet-5);
      border-radius: 4px;

      height: fit-content;
      width: fit-content;
    }

    &,
    &__title, 
    &__button-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__title { 
      gap: 8px;
    }
  }
</style>