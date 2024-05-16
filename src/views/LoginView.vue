

<template>
  <main class="flex flex-col h-screen items-center justify-between main-bg">
    <!-- <label for="hs-color-input" class="block text-sm font-medium mb-2">Color picker</label>
    <input
      type="color"
      class="p-1 h-10 w-14 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none"
      id="hs-color-input"
      value="#2563eb"
      title="Choose your color"
    /> -->
    <section class="w-full">
      <div class="flex justify-center">
        <div class="logo-container flex items-center flex-col">
          <img width="195" height="180" src="/LOGO.svg" alt="logo" />
          <p class="text-4xl">ПортХаб</p>
        </div>
      </div>
      <div class="flex min-h-full flex-col justify-center ">
        <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-sm block-box px-14 py-16 bg-white">
          <form @submit.prevent="handleSubmit" class="space-y-6 " action="#" method="POST">
            <h2 class="sm:text-2xl">Вход в порт</h2>
            <div>
              <label for="email" class="block text-sm font-medium leading-6 text-gray-900"
                >Email</label
              >
              <div class="mt-2">
                <input
                  v-model="email"
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between">
                <label for="password" class="block text-sm font-medium leading-6 text-gray-900"
                  >Пароль</label
                >
                <div class="text-sm">
                  <a href="#" class="font-semibold text-sky-500 hover:text-sky-400"
                    >Забыли пароль?</a
                  >
                </div>
              </div>
              <div class="mt-2">
                <input
                  v-model="password"
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div class="login-buttons flex justify-between">
                <button
                  type="submit"
                  class="flex w-full justify-center rounded-md bg-sky-500 mr-2 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Войти
                </button>

              </div>
              <div class="text-sm text-center mt-2">
                <router-link to="/register" class="font-semibold text-sky-500 hover:text-sky-400"
                >Регистрация</router-link
                >
              </div>

            </div>
          </form>
          <div @click="handleReset" class="text-sm text-center mt-2">
            <button class="font-semibold text-sky-500 hover:text-sky-400"
            >Reset</button
            >
          </div>
          <div @click="handleSet" class="text-sm text-center mt-2">
            <button class="font-semibold text-sky-500 hover:text-sky-400"
            >Set</button
            >
          </div>
        </div>
      </div>
    </section>
    <FooterComponent />
  </main>

</template>
<script>

import axiosInstance from '@/axiosInstance.js'
import FooterComponent from '@/components/FooterComponent.vue'


export default {
  name: 'HelloWorld',
  components: { FooterComponent },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    handleSubmit() {
      const data = {
        email: this.email,
        password: this.password
      }
      console.log(data)
      axiosInstance.post("/Authentication/login", data)
        .then(
          (rez) => {
            console.log(rez.data)
            localStorage.setItem('token', rez.data.token)
            if(this.$route.query.redirect) {
              this.$router.push(this.$route.query.redirect)
            }else {
              this.$router.push('/profile')
            }
          }
        )
    },
    handleReset(){
      localStorage.removeItem('token')
    },
    handleSet(){
      localStorage.setItem('token', "jopa")
    }
  }
}
</script>

<style>
 form h2{
   text-align: center;
 }
</style>