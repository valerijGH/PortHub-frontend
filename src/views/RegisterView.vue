<template>
  <div class="main-bg">
    <main class="flex flex-col h-screen items-center justify-between">
      <section class="w-full flex flex-col justify-center items-center py-12">
        <LogoComponent msg="" />
        <div class="blocks-container md:flex w-6/12 items-center flex-wrap justify-around gap-y-9 gap-x-6 mt-8">
          <div class="block-box register-box p-6">
            <div class="w-full flex min-h-full flex-col justify-center">
              <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <form class="space-y-4" @submit.prevent="handleSubmit">
                  <div>
                    <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Имя пользователя</label>
                    <div>
                      <input
                        v-model="username"
                        id="username"
                        name="username"
                        type="text"
                        autocomplete="username"
                        required
                        class="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Почта</label>
                    <div>
                      <input
                        v-model="email"
                        id="email"
                        name="email"
                        type="email"
                        autocomplete="email"
                        required
                        class="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <div class="md:flex items-center justify-between">
                      <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Пароль</label>
                      <div class="text-sm">
                        <a href="#" class="font-semibold text-sky-500 hover:text-sky-400">Забыли пароль?</a>
                      </div>
                    </div>
                    <div>
                      <input
                        v-model="password"
                        id="password"
                        name="password"
                        type="password"
                        autocomplete="current-password"
                        required
                        class="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label for="password-repeat" class="block text-sm font-medium leading-6 text-gray-900">Повтор пароля</label>
                    <div>
                      <input
                        v-model="passwordRepeat"
                        id="password-repeat"
                        name="password-repeat"
                        type="password"
                        required
                        class="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div v-if="hasErrors" class="bg-red-500 w-full px-5 py-2 rounded-md text-white">
                    {{ errorMessage }} <span @click="hasErrors=!hasErrors" class="float-right cursor-pointer">X</span>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="block-box register-image-item flex justify-center items-center">
            <img src="/src/assets/wheel.svg" alt="wheel">
          </div>
          <div class="block-box register-image-item flex justify-center items-center">
            <img src="/src/assets/anchor.svg" alt="anchor">
          </div>
          <div class="block-box register-textarea p-6">
            <label for="about" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">О себе:</label>
            <textarea v-model="description" id="about" rows="4" class="block p-2.5 w-full text-sm rounded-md border-0 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600" placeholder="Пару слов..."></textarea>
          </div>
          <button @click="handleSubmit" type="submit" class="w-full md:w-auto mt-4 px-6 py-2 text-sm font-semibold text-white bg-sky-500 rounded-md shadow-sm hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
            Зарегистрироваться
          </button>
        </div>
      </section>
      <FooterComponent />
    </main>
  </div>
</template>

<style scoped>
.blocks-container {
  max-width: 910px;
}

.block-box {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  border-radius: 17px;
  background-color: white;
  padding: 20px;
}

.register-box {
  width: 425px;
  min-height: 300px;
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

.register-textarea {
  width: 450px;
  height: 225px;
}

.register-textarea textarea {
  width: 100%;
  height: 150px;
}

.main-logo {
  padding-top: 50px;
  padding-bottom: 50px;
}
</style>

<script>
import LogoComponent from '@/components/LogoComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import api from '@/utils/api.js'

export default {
  name: 'HelloWorld',
  components: { FooterComponent, LogoComponent },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      passwordRepeat: '',
      description: '',
      hasErrors: false,
      errorMessage: '',
    }
  },
  methods: {
    async handleSubmit() {
      if (!this.username || !this.email || !this.password || !this.passwordRepeat) {
        this.errorMessage = 'Все поля обязательны для заполнения';
        this.hasErrors = true;
        return;
      }

      if (this.password !== this.passwordRepeat) {
        this.errorMessage = 'Пароли не совпадают';
        this.hasErrors = true;
        return;
      }

      const data = {
        username: this.username,
        password: this.password,
        description: this.description,
        email: this.email
      };

      try {
        const response = await api.post('/authentication/registration', data);
        const { token } = response.data;

        if (!token) {
          throw new Error('Access token is missing in the response');
        }

        localStorage.setItem('accessToken', token);

        this.fetchUser();
        // Если требуется перенаправление
        if (this.$route.query.redirect) {
          this.$router.push(this.$route.query.redirect);
        } else {
          this.$router.push('/profile');
        }
      } catch (error) {
        console.error('Login error:', error);
        if (error.response && error.response.data && error.response.data.errors) {
          const errors = error.response.data.errors;
          if (errors.Email) {
            this.errorMessage = `Ошибка: ${errors.Email.join(', ')}`;
          } else if (errors.Username) {
            this.errorMessage = `Ошибка: ${errors.Username.join(', ')}`;
          } else {
            this.errorMessage = 'Ошибка при регистрации. Пожалуйста, попробуйте снова.';
          }
        } else {
          this.errorMessage = 'Ошибка при регистрации. Пожалуйста, попробуйте снова.';
        }
        this.hasErrors = true;
      }
    },

    async fetchUser() {
      try {
        const response = await api.get(`/user/get/${this.username}`);
        console.log('User data:', response.data); // Данные пользователя
        this.$store.dispatch('saveUser', response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }
  }
}
</script>
