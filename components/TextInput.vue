
<script setup lang="ts">
 const value = ref<string | null>(null);

  const emit = defineEmits(['change']);

  const onChange = (_: Event) => {
    emit('change', value.value);
  }
</script>

<template>
   <div class="search-container__input-wrapper">
    <label for="cocktail">Cocktail name</label>
    <input type="text" id="cocktail" name="cocktail" @change="onChange" v-model="value">
  </div>
</template>

<style lang="scss" scoped>


  .search-container__input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  label { 
    font-size: 1.2rem;
    font-weight: 500;
  }

  input { 
    padding: 7px 14px;
    border-radius: 4px;
    cursor: pointer;

    outline: none;
    border: 1px solid var(--violet-6);

    &:focus { 
      border: 1px solid var(--violet-7);
    }
  }

</style>