
<script setup lang="ts">
 const value = ref<string | null>(null);
 const props = defineProps({
    options: {
      type: Array as PropType<string[]>,
      required: true
    }
  });

  const emit = defineEmits(['change']);

  const onChange = (_: Event) => {
    emit('change', value.value);
  }
</script>

<template>
   <div class="search-container__select-wrapper">
    <label for="categories">Choose a category:</label>

    <select name="categories" id="categories" @change="onChange" v-model="value">
      <option :value="null">Select an option</option>
      <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
    </select>
  </div>
</template>

<style lang="scss" scoped>


  .search-container__select-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  label { 
    font-size: 1.2rem;
    font-weight: 500;
  }

  select { 
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