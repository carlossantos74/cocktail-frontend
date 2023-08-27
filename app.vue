<script setup lang="ts">
  import { ModalsContainer } from 'vue-final-modal'
</script>

<template>
  <div>
    <Html>
      <Head>
        <Title>The cocktail</Title>
      </Head>
      <Body>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
        <ModalsContainer /> 
      </Body>
    </Html>
  </div>
</template>
