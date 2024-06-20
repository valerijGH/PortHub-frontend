<template>
  <div  class="
              font-sans
              bg-gray-500 bg-opacity-60
              w-full
              min-h-screen
              flex justify-center flex items-center
              h-full
              top-0
              backdrop-filter backdrop-blur-lg
              fixed
              overlay
          "
       @mousedown="handleMouseDown"
       @mouseup="handleMouseUp"
  >

    <div class="px-6 p-2 bg-white relative justify-center items-center w-1/2 m-auto mx-auto h-3/5 sm:h-3/5 md:w-1/3 md:h-3/5 lg:w-1/2 lg: mx-5 lg:h-3/5 rounded-3xl filter drop-shadow-2xl content
              " @click.stop>
      <div class="flex p-1 sm:mt-4 border-black items-center justify-between">
        <div class="flex">
          <!--          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">-->
          <!--            <path fill-rule="evenodd"-->
          <!--                  d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z"-->
          <!--                  clip-rule="evenodd" />-->
          <!--          </svg>-->
          <img width="20" height="20" src="/public/LOGO.svg" alt="">
          <p class="text-gray-600 tracking-wider ml-1 text-sm sm:text-md font-bold">
            PortHub
          </p>
        </div>
        <div @click="$emit('hide')" class="flex items-center cursor-pointer">
          <p>✖️</p>
        </div>
      </div>
      <div class="mt-3  sm:mt-5">
        <h1 class="text-xl text-gray-600 tracking-wider text-sm sm:text-md font-black">
          Редактирование профиля
        </h1>
        <!--        <p class="text-xs sm:text-sm text-gray-400 mt-2">-->
        <!--          Takes less than 10 minutes to fill out all the information needed to register-->
        <!--          your bussiness-->
        <!--        </p>-->
      </div>
      <div class="mt-1 sm:mt-8">
        <form @submit.prevent="uploadImage" action="POST" enctype="multipart/form-data" class="flex-col flex">
          <label for="judul" class="text-gray-700 text-xs sm:text-md ">Фото профиля</label>
          <label for="judul" class="text-gray-700 mt-1 sm:mt-5 text-xs sm:text-md">Имя пользователя</label>
          <input name="judul" v-model="user.username" @blur="handleUpdateField('username', user.username)" type="text" class="
                                  w-full
                                  h-4
                                  sm:h-9
                                  border-b-2 border-gray-300
                                  focus:border-blue-300
                                  outline-none
                              " />

          <label for="judul" class="text-gray-700 mt-1 sm:mt-5 text-xs sm:text-md">О себе</label>
          <textarea name="judul" rows="2" v-model="user.description" @blur="handleUpdateField('description', user.description)" type="text" class="
                                                  w-full
                                                  h-4
                                                  sm:h-1/5
                                                  border-b-2 border-gray-300
                                                  focus:border-blue-300
                                                  outline-none
                                              " />
          <label for="judul" class="text-gray-700 mt-1 sm:mt-5 text-xs sm:text-md">Локация</label>
          <input name="judul" v-model="user.location" @blur="handleUpdateField('location', user.location)" type="text" class="
                                                  w-full
                                                  h-4
                                                  sm:h-9
                                                  border-b-2 border-gray-300
                                                  focus:border-blue-300
                                                  outline-none
                                              " />
          <label for="judul" class="text-gray-700 mt-1 sm:mt-5 text-xs sm:text-md">Профессия</label>
          <input name="judul" v-model="user.profession" @blur="handleUpdateField('profession', user.profession)" type="text" class="
                                                  w-full
                                                  h-4
                                                  sm:h-9
                                                  border-b-2 border-gray-300
                                                  focus:border-blue-300
                                                  outline-none
                                              " />
          <div class="justify-center flex-col items-center mt-2 sm:mt-8 flex">
            <button class="
                          bg-blue-600
                          text-gray-100
                          rounded-md
                          h-8
                          sm:h-auto
                          sm:rounded-lg
                          w-20
                          sm:w-52
                          p-1
                          text-xs
                          sm:text-md
                          sm:p-3
                      "
                    @click="saveChanges">
              Изменить
            </button>
          </div>
          <input @change="onFileChange" name="judul" accept="" type="file" class="
                                  w-full
                                  h-4
                                  sm:h-9
                                  border-b-2 border-gray-300
                                  focus:border-blue-300
                                  outline-none
                                  mt-5
                              " />
          <button class="
                          bg-blue-600
                          text-gray-100
                          rounded-md
                          h-8
                          sm:h-auto
                          sm:rounded-lg
                          w-20
                          sm:w-52
                          p-1
                          text-xs
                          sm:text-md
                          sm:p-3
                          flex
                          self-center
                          justify-center
                          mt-2
                          " @click="updateUserImage">Загрузить картинку</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>

import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'ProfileEditComponent',
  data() {
    return {
      selectedFile: null
    };
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters(['getUserImageUrl']),
  },
  methods: {
    ...mapActions(['uploadUserImage', 'updateUserOnServer', 'updateUserField']),
    onFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    updateUserImage() {
      if (this.selectedFile) {
        try {
          this.uploadUserImage(this.selectedFile);
          this.$emit('hide');
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      } else {
        alert('Please select a file first.');
      }
    },
    handleUpdateField(field, value) {
      this.updateUserField({ field, value });
    },
    handleMouseDown(event) {
      this.isMouseDownInside = event.target !== event.currentTarget;
    },
    handleMouseUp(event) {
      if (!this.isMouseDownInside && event.target === event.currentTarget) {
        this.$emit('hide');
      }
      this.isMouseDownInside = false;
    },
    async saveChanges() {
      const updatedFields = {
        username: this.user.username,
        profession: this.user.profession,
        location: this.user.location,
        description: this.user.description,
        imageUrl: this.user.imageUrl,
        // Добавьте другие поля, которые нужно обновить
      };
      try {
        await this.updateUserOnServer(updatedFields);
        this.$emit('hide');
      } catch (error) {
        console.error('Error updating user on server:', error);
      }
    }

  },
  mounted() {
    if (this.user) {
      this.username = this.user.username;
    }
  },

}
</script>