<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <footer class="main-footer">
    <div class="footer-bg-container w-full h-full flex justify-center">
      <img class="absolute w-full z-0" src="/footer.svg" alt="">

      <div class="flex justify-center items-center w-4/5 z-10">
        <div class="footer-container w-full h-full px-24">
          <div class="footer-logo-container">
            <img src="/footer-logo.svg" alt="logo">
            <p>ПортХаб -
              мы все за одно !</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
