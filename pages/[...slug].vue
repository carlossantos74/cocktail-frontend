<script setup lang="ts">
  const router = useRouter();
</script>

<template>
  <section>
    <Icon size="32" name="mdi:glass-cocktail-off" />
    <h1 class="q-mb-md">
      404
    </h1> 
    <p>
      Page not found
    </p>

    <button class="cs-button__secondary" @click="router.push('/')">
      <Icon name="material-symbols:arrow-back" /> 
      Go back to home
    </button>
  </section>
</template>

<style scoped lang="scss">
  section { 
    height: 90vh;
    text-align: center;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;

    button { 
      margin-top: 24px;
    }
  }
</style>