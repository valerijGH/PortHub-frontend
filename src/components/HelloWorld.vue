

<template>
  <main class="flex flex-col h-screen items-center justify-between">
    <section class="w-screen p-10">
      <div class="flex justify-center">
        <div class="logo-container flex items-center flex-col">
          <img width="195" height="180" src="/LOGO.svg" alt="logo" />
          <p class="text-4xl">ПортХаб</p>
        </div>
      </div>
      <div class="flex min-h-full flex-col justify-center ">
        <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-sm block-box px-14 py-16">
          <form  class="space-y-6" action="#" method="POST">
            <h2 class="sm:text-2xl">Вход в порт</h2>
            <div>
              <label for="email" class="block text-sm font-medium leading-6 text-gray-900"
              >Email</label
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
                  >Забыли пароль?</a
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

              </div>
              <div class="text-sm text-center mt-2">
                <a href="/register" class="font-semibold text-sky-500 hover:text-sky-400"
                >Регистрация</a
                >
              </div>

            </div>
          </form>
          <div  class="text-sm text-center mt-2">
            <button class="font-semibold text-sky-500 hover:text-sky-400"
            >Reset</button
            >
          </div>
        </div>
      </div>
    </section>
<!--    <FooterComponent />-->
  </main>

</template>
