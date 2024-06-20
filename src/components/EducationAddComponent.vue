<template>
  <div class="font-sans bg-gray-500 bg-opacity-60 w-full min-h-screen flex justify-center items-center h-full top-0 backdrop-filter backdrop-blur-lg fixed overlay"
       @mousedown="handleMouseDown"
       @mouseup="handleMouseUp">
    <div class="px-6 p-2 bg-white relative justify-center items-center w-1/2 m-auto mx-auto h-1/2 sm:h-1/2 md:w-1/3 md:h-1/2 lg:w-1/2 lg: mx-5 lg:h-1/2 rounded-3xl filter drop-shadow-2xl content"
         @click.stop>
      <div class="flex p-1 sm:mt-4 border-black items-center justify-between">
        <div class="flex">
          <img width="20" height="20" src="/public/LOGO.svg" alt="">
          <p class="text-gray-600 tracking-wider ml-1 text-sm sm:text-md font-bold">PortHub</p>
        </div>
        <div @click="$emit('hide')" class="flex items-center cursor-pointer">
          <p>✖️</p>
        </div>
      </div>
      <div class="mt-3 sm:mt-5">
        <h1 class="text-xl text-gray-600 tracking-wider text-sm sm:text-md font-black">Добавление информации об образовании</h1>
      </div>
      <div class="mt-1 sm:mt-8">
        <form @submit.prevent="submitEducation" action="POST" enctype="multipart/form-data" class="flex-col flex">
          <label for="title" class="text-gray-700 text-xs sm:text-md">Учебное заведение</label>
          <input name="title" v-model="education.name" type="text" class="w-full h-4 sm:h-9 border-b-2 border-gray-300 focus:border-blue-300 outline-none" />
          <label for="description" class="text-gray-700 mt-1 sm:mt-5 text-xs sm:text-md">Специальность</label>
          <textarea name="description" rows="2" v-model="education.speciality" type="text" class="w-full h-4 sm:h-1/5 border-b-2 border-gray-300 focus:border-blue-300 outline-none"></textarea>
          <label for="file" class="text-gray-700 mt-1 sm:mt-5 text-xs sm:text-md">Файл</label>
          <input @change="onFileChange" name="file" type="file" class="w-full h-4 sm:h-9 border-b-2 border-gray-300 focus:border-blue-300 outline-none" />
          <div class="justify-center flex-col items-center mt-2 sm:mt-8 flex">
            <button class="bg-blue-600 text-gray-100 rounded-md h-8 sm:h-auto sm:rounded-lg w-20 sm:w-52 p-1 text-xs sm:text-md sm:p-3" type="submit">
              Добавить
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'AddEducationComponent',
  data() {
    return {
      education: {
        title: '',
        description: '',
      },
      selectedFile: null,
      isMouseDownInside: false,
    };
  },
  computed: {
    ...mapState(['user']),
    user() {
      return this.$store.getters.getUser;
    },
  },
  methods: {
    ...mapActions(['addEducation']),
    onFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    async submitEducation() {
      const formData = new FormData();
      formData.append('name', this.education.name);
      formData.append('speciality', this.education.speciality);
      formData.append('file', this.selectedFile);

      try {
        await this.addEducation(formData);
        this.$emit('hide');
      } catch (error) {
        console.error('Error adding education:', error);
      }
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
  },
};
</script>

<style>
.overlay {
  font-family: 'Roboto Mono', sans-serif;
}
</style>
