<script setup>

</script>

<template>
  <footer class="main-footer">
    <div class="footer-bg-container w-full h-full flex justify-center">
      <div class="flex justify-center items-center w-4/5">
        <div class="footer-container w-full h-full sm:px-10 sm:pt-7">
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

<style>
  .main-footer{
    min-width: 100%;

    background-size: 100%;
    min-height: 210px;
    margin-top: 100px;
    position: relative;
  }

  .footer-logo-container {
    font-family: 'Rubik-Bold', sans-serif;
    font-weight: 700;
    font-size: 20px;
  }

  .footer-bg-container{
    position: absolute;
    bottom: 0;
    background: url("/footer.svg") no-repeat center;
    width: 100%;
    background-size: cover;
    background-position-y: top;
  }
</style>