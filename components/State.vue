<script setup lang="ts">
  import { StateType } from '@/common/types/global.types'

  defineProps(['type', 'message'])
</script>

<template>
  <div v-if="type == StateType.LOADING"> 
    <Icon size="48" name="eos-icons:loading" />
  </div>
  <div v-else-if="type == StateType.ERROR"> 
    <Icon size="32" name="streamline:shipping-box-fragile-fragile-shipping-glass-delivery-wine-crack-shipment-sign-sticker" />
    <p> {{ message }} </p>
  </div>
  <div v-else-if="type == StateType.EMPTY">
    <Icon size="32" name="mdi:glass-cocktail-off" />
    <h1> No cocktail found </h1>
    <p> {{ message }} </p>
  </div>
</template>

<style lang="scss" scoped>
  div { 
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 8px;
  }
</style>