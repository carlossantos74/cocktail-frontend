
<script setup lang="ts">
  const toggleTheme = () => { 
    const body = document.querySelector('body');

    body?.classList.toggle('dark-theme');
  }
</script>

<template>
  <header>
    <h3>Cocktail API</h3>

    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/favorites">Favorites</router-link>
    </nav>

    <button class="toggle-theme-button" @click="toggleTheme">
      <Icon name="tabler:sun-moon" />
    </button>
  </header>
</template>

<style lang="scss" scoped>
  header { 
    padding: 24px;
    background-color: var(--violet-3);
    border-bottom: 1px solid var(--violet-4);

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  header button.toggle-theme-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: var(--violet-12);

    font-size: 24px;

    &:hover {
      color: var(--violet-10);
    }

    transition: all 200ms;
  }

  nav { 
    display: flex;
    gap: 12px;

    a { 
      text-decoration: none;
      color: var(--violet-12);
      font-weight: 600;

      &:hover { 
        color: var(--violet-10);
      }
    }
  }
</style>