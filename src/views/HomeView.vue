<script setup>
import FooterComponent from '@/components/FooterComponent.vue'
</script>

<template>
  <main class="flex flex-col h-screen items-center justify-between">
    <!-- <label for="hs-color-input" class="block text-sm font-medium mb-2">Color picker</label>
    <input
      type="color"
      class="p-1 h-10 w-14 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none"
      id="hs-color-input"
      value="#2563eb"
      title="Choose your color"
    /> -->
    <section class="w-screen flex justify-between p-10 flex-col">
      <div class="flex justify-center">
        <div class="logo-container flex items-center flex-col">
          <img width="195" height="180" src="/LOGO.svg" alt="logo" />
          <p class="text-4xl">ПортХаб</p>
        </div>
      </div>
      <div class="flex min-h-full flex-col justify-center lg:px-8">
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form class="space-y-6" action="#" method="POST">
            <div>
              <label for="email" class="block text-sm font-medium leading-6 text-gray-900"
                >Логин</label
              >
              <div class="mt-2">
                <input
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
                    >Забыл пароль?</a
                  >
                </div>
              </div>
              <div class="mt-2">
                <input
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
                <button
                  type="submit"
                  class="flex w-full justify-center rounded-md bg-sky-500 ml-2 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Зарегестрироваться
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
    <FooterComponent />
  </main>

</template>
