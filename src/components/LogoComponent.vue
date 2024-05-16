<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="main-logo flex justify-center">
    <div class="logo-container flex items-center flex-col">
      <img width="150" height="150" src="/LOGO.svg" alt="logo" />
      <p class="text-2xl">ПортХаб</p>
    </div>
  </div>
</template>
