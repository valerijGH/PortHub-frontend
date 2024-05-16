<template>
  <div class="main-bg">
    <main class="flex flex-col h-screen items-center justify-between">
      <section class="w-full h-4/5 flex flex-col justify-center items-center">
        <LogoComponent msg="" />
        <div class="blocks-container md:flex w-6/12 items-center h-full flex-wrap justify-around gap-y-9 gap-x-6">
          <div class="block-box register-box">
            <div class="w-full h-full flex min-h-full flex-col justify-center lg:p-8">
              <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <form class="space-y-3" action="#" method="POST">
                  <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900"
                    >Почта</label
                    >
                    <div >
                      <input
                        v-model="email"
                        id="email"
                        name="email"
                        type="email"
                        autocomplete="email"
                        required
                        class="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 sm:px-2"
                      />
                    </div>
                  </div>

                  <div>
                    <div class="md:flex items-center justify-between">
                      <label for="password" class="block text-sm font-medium leading-6 text-gray-900"
                      >Пароль</label
                      >
                      <div class="text-sm">
                        <a href="#" class="font-semibold text-sky-500 hover:text-sky-400"
                        >Забыли пароль?</a
                        >
                      </div>
                    </div>
                    <div >
                      <input
                        v-model="password"
                        id="password"
                        name="password"
                        type="password"
                        autocomplete="current-password"
                        required
                        class="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 sm:px-2"
                      />
                    </div>
                  </div>
                  <div>
                    <div class="flex items-center justify-between">
                      <label for="password-repeat" class="block text-sm font-medium leading-6 text-gray-900"
                      >Повтор пароля</label
                      >
                    </div>
                    <div>
                      <input
                        id="password-repeat"
                        name="password"
                        type="password"
                        required
                        class="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 sm:px-2"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="block-box register-image-item flex justify-center items-center">
            <img src="@/assets/wheel.svg" alt="wheel">
          </div>
          <div class="block-box register-image-item flex justify-center items-center">
            <img src="@/assets/anchor.svg" alt="anchor">
          </div>
          <div class="block-box register-textarea sm:p-5">
            <div class="max-w-2xl mx-auto">

              <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">О себе:</label>
              <textarea id="message" rows="4"
                        class="block-box block p-2.5 w-full text-sm "
                        placeholder="Пару слов..."></textarea>
            </div>
          </div>
          <button
            @click="handleSubmit"
            type="submit"
            class="flex w-2/5 justify-center rounded-md bg-sky-500 ml-2 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Зарегестрироваться
          </button>
        </div>
      </section>
      <FooterComponent />
    </main>
  </div>

</template>


<style>

.blocks-container{
  max-width: 920px;
}

.block-box {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  border-radius: 17px;
}

.register-box {
  width: 425px;
  height: 225px;
}

.register-image-item {
  width: 225px;
  height: 225px;
  background: white;
}

.register-image-item img {
  width: 175px;
  height: 175px;
}
.register-textarea{
  width: 450px;
  height: 225px;
}
.register-textarea textarea{
  width: 100%;
  height: 150px;
}
.main-logo{
  padding-top: 50px;
  padding-bottom: 50px;
}
</style>
<script>

import LogoComponent from '@/components/LogoComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import axiosInstance from '@/axiosInstance.js'
import { setAuthorizationHeader } from '@/utils/api.js'


export default {
  name: 'HelloWorld',
  components: { FooterComponent, LogoComponent },
  data() {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    handleSubmit() {
      const data = {
        username: this.email,
        email: this.email,
        password: this.password
      }
      axiosInstance.post("Authentication/registration", data)
        .then(
          (rez) => {

            console.log(rez.data)
            localStorage.setItem('token', rez.data.token)
            setAuthorizationHeader(localStorage.getItem('token'));
            if(this.$route.query.redirect) {
              this.$router.push(this.$route.query.redirect)
            }else {
              this.$router.push('/profile')
            }
          }
        )
    }
  }
}
</script>