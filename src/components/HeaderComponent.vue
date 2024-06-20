<template>
  <nav class="font-sans flex flex-col text-center content-center sm:flex-row sm:text-left sm:justify-between py-2 px-6 bg-white shadow sm:items-baseline w-full sm:mb-5">
    <div class="mb-2 sm:mb-0 inner">
      <img width="100" h="100" src="/LOGO.svg" alt="">
      <router-link to="/login" class="text-2xl no-underline text-grey-darkest hover:text-blue-dark ">ПортХаб</router-link><br>
    </div>

    <div class="sm:mb-0 self-center flex row-auto">
      <router-link to="/" class="text-2xl no-underline text-black hover:text-blue-dark ml-2 px-1">Проекты</router-link>
      <router-link v-if="user" to="/favorites" class="text-2xl no-underline text-grey-darker hover:text-blue-dark ml-10 px-1 flex row-auto">
        Избранное
      </router-link>
      <router-link v-if="user" to="/profile" class="text-2xl no-underline text-grey-darker hover:text-blue-dark ml-10 px-1 flex row-auto">
        Профиль
      </router-link>
      <button v-if="user" @click="logoutUser" class="text-2xl no-underline text-grey-darker hover:text-blue-dark ml-10 px-1 flex row-auto">
        Выйти
      </button>
      <router-link v-if="!user" to="/login" class="text-2xl no-underline text-grey-darker hover:text-blue-dark ml-10 px-1 flex row-auto">
        Войти
      </router-link>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['user']),
    user() {
      return this.$store.getters.getUser;
    },
  },
  methods: {
    ...mapActions(['logout']),
    logoutUser() {
      this.logout();
      location.reload() // Перенаправить на страницу входа после выхода
    }
  },
  created() {
    this.$store.dispatch('loadUser');
  },
}
</script>
