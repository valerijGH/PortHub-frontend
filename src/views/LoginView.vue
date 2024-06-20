<template>
  <main class="flex flex-col h-screen items-center justify-between main-bg">
    <section class="w-full">
      <div class="flex justify-center">
        <div class="logo-container flex items-center flex-col">
          <img width="195" height="180" src="/LOGO.svg" alt="logo" />
          <p class="text-4xl">ПортХаб</p>
        </div>
      </div>
      <div class="flex min-h-full flex-col justify-center">
        <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <div v-if="hasErrors" class="error-message bg-red-500 w-full px-5 py-2 rounded-md text-white mb-4 text-center">
            {{ errorMessage }}
          </div>
          <div class="block-box px-14 py-16 bg-white">
            <form @submit.prevent="handleSubmit" class="space-y-6" action="#" method="POST">
              <h2 class="sm:text-2xl text-center mb-4">Вход в порт</h2>
              <div>
                <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Логин</label>
                <div class="mt-2">
                  <input
                    v-model="username"
                    id="username"
                    name="username"
                    type="text"
                    autocomplete="username"
                    required
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div class="flex items-center justify-between">
                  <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Пароль</label>
                  <div class="text-sm">
                    <a href="#" class="font-semibold text-sky-500 hover:text-sky-400">Забыли пароль?</a>
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
                  <router-link to="/register" class="font-semibold text-sky-500 hover:text-sky-400">Регистрация</router-link>
                </div>
              </div>
            </form>
<!--            <div @click="handleReset" class="text-sm text-center mt-2">-->
<!--              <button class="font-semibold text-sky-500 hover:text-sky-400">Reset</button>-->
<!--            </div>-->
<!--            <div @click="handleSet" class="text-sm text-center mt-2">-->
<!--              <button class="font-semibold text-sky-500 hover:text-sky-400">Set</button>-->
<!--            </div>-->
          </div>
        </div>
      </div>
    </section>
    <FooterComponent />
  </main>
</template>

<script>
import FooterComponent from '@/components/FooterComponent.vue';
import api from '@/utils/api.js';

export default {
  name: 'LoginView',
  components: { FooterComponent },
  data() {
    return {
      username: '',
      password: '',
      hasErrors: false,
      errorMessage: ''
    };
  },
  methods: {
    async handleSubmit() {
      const data = {
        username: this.username,
        password: this.password
      };

      try {
        const response = await api.post('/Authentication/login', data);
        const { token } = response.data;

        if (!token) {
          throw new Error('Access token is missing in the response');
        }

        localStorage.setItem('accessToken', token);

        this.fetchUser();
        if (this.$route.query.redirect) {
          this.$router.push(this.$route.query.redirect);
        } else {
          this.$router.push('/profile');
        }
      } catch (error) {
        console.error('Login error:', error);
        this.hasErrors = true;
        this.errorMessage = 'Ошибка входа. Проверьте логин и пароль.';
        setTimeout(() => {
          this.hasErrors = false;
        }, 5000); // Hide error message after 5 seconds
      }
    },
    async fetchUser() {
      try {
        const response = await api.get(`/user/get/${this.username}`);
        this.$store.dispatch('saveUser', response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    },
    // handleReset() {
    //   localStorage.removeItem('token');
    // },
    // handleSet() {
    //   localStorage.setItem('token', 'jopa');
    // }
  }
};
</script>

<style scoped>
.error-message {
  animation: fadeIn 0.5s ease-in-out;
  max-width: 100%;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

form h2 {
  text-align: center;
}
</style>
