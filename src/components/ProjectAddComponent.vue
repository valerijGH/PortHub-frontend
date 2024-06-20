<template>
  <div
    class="font-sans bg-gray-500 bg-opacity-60 w-full min-h-screen flex justify-center items-center h-full top-0 backdrop-filter backdrop-blur-lg fixed overlay"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp">
    <div
      class="px-6 p-2 bg-white relative justify-center items-center w-1/2 m-auto mx-auto h-1/2 sm:h-1/2 md:w-1/3 md:h-1/2 lg:w-1/2 lg: mx-5 lg:h-1/2 rounded-3xl filter drop-shadow-2xl content"
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
        <h1 class="text-xl text-gray-600 tracking-wider text-sm sm:text-md font-black">Добавить проект</h1>
      </div>
      <div class="mt-1 sm:mt-8">
        <form @submit.prevent="submitProject" action="POST" enctype="multipart/form-data" class="flex-col flex">
          <label for="judul" class="text-gray-700 text-xs sm:text-md">Название проекта</label>
          <input name="judul" v-model="project.title" type="text"
                 class="w-full h-4 sm:h-9 border-b-2 border-gray-300 focus:border-blue-300 outline-none" />
          <label for="judul" class="text-gray-700 text-xs sm:text-md">Ссылка на гитхаб</label>
          <input name="judul" v-model="project.link" type="text"
                 class="w-full h-4 sm:h-9 border-b-2 border-gray-300 focus:border-blue-300 outline-none" />
          <label for="judul" class="text-gray-700 mt-1 sm:mt-5 text-xs sm:text-md">Описание</label>
          <textarea name="judul" rows="2" v-model="project.description" type="text"
                    class="w-full h-4 sm:h-1/5 border-b-2 border-gray-300 focus:border-blue-300 outline-none"></textarea>
          <label for="judul" class="text-gray-700 mt-1 sm:mt-5 text-xs sm:text-md">Файлы проекта</label>
          <input @change="onFileChange" name="judul" accept="" type="file" multiple
                 class="w-full h-4 sm:h-9 border-b-2 border-gray-300 focus:border-blue-300 outline-none" />
          <div class="justify-center flex-col items-center mt-2 sm:mt-8 flex">
            <button
              class="bg-blue-600 text-gray-100 rounded-md h-8 sm:h-auto sm:rounded-lg w-20 sm:w-52 p-1 text-xs sm:text-md sm:p-3"
              type="submit">
              Добавить
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'AddProjectComponent',
  data() {
    return {
      project: {
        title: '',
        description: '',
        ownerId: '',
        isTeam: false,
        files: '',
        link: ''
      },
      selectedFiles: [],
      isMouseDownInside: false
    }
  },
  computed: {
    ...mapState(['user']),
    user() {
      return this.$store.getters.getUser
    }
  },
  methods: {
    ...mapActions(['addProject']),
    onFileChange(event) {
      this.selectedFiles = Array.from(event.target.files)
    },
    async submitProject() {
      const formData = new FormData()
      formData.append('title', this.project.title)
      formData.append('ownerId', this.user.id)
      formData.append('description', this.project.description)
      formData.append('isTeam', this.project.isTeam)
      formData.append('link', this.project.link)
      this.selectedFiles.forEach((file) => {
        formData.append(`files`, file)
      })

      try {
        await this.$store.dispatch('addProject', formData)
        this.$emit('hide')
        location.reload()
      } catch (error) {
        console.error('Error adding project:', error)
      }
    },
    handleMouseDown(event) {
      this.isMouseDownInside = event.target !== event.currentTarget
    },
    handleMouseUp(event) {
      if (!this.isMouseDownInside && event.target === event.currentTarget) {
        this.$emit('hide')

      }
      this.isMouseDownInside = false
    }
  }
}
</script>

<style>
.overlay {
  font-family: 'Roboto Mono', sans-serif;
}
</style>
