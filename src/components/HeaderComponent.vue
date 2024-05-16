<script setup>

</script>

<template>
  <nav class="font-sans flex flex-col text-center content-center sm:flex-row sm:text-left sm:justify-between py-2 px-6 bg-white shadow sm:items-baseline w-full sm:mb-5">
    <div class="mb-2 sm:mb-0 inner">
      <img width="100" h="100" src="/LOGO.svg" alt="">
      <router-link to="/login" class="text-2xl no-underline text-grey-darkest hover:text-blue-dark ">ПортХаб</router-link><br>


    </div>

    <div class="sm:mb-0 self-center flex row-auto">
      <router-link to="/profile-lib" class="text-2xl no-underline text-black hover:text-blue-dark ml-2 px-1">Проекты</router-link>
<!--      <a href="#" class="text-md no-underline text-grey-darker hover:text-blue-dark ml-2 px-1">Избранное</a>-->
      <router-link to="/profile" class="text-2xl no-underline text-grey-darker hover:text-blue-dark ml-10 px-1 flex row-auto">
        Профиль
<!--        <img width="25" height="25" src="/User.svg" alt="">-->
      </router-link>

    </div>
  </nav>
</template>