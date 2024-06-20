<template>
  <div class="main-bg">
    <HeaderComponent />
    <div class="max-w-6xl mx-auto block-box bg-white p-10 project-container" v-if="project">
      <h1 class="text-3xl font-bold mb-4 flex items-center">{{ project.title }}
        <img v-if="user.id === project.ownerId" height="30" width="30" src="/Pencil.png" @click="showEditProjectForm" class="cursor-pointer">
      </h1>
      <div v-if="user.id !== project.ownerId" class="flex justify-between items-center mb-4">
        <a class="text-blue-500 flex items-center project-favorite p-2 cursor-pointer" @click="toggleFavorite">
          ❤️ {{ isFavorite ? 'Удалить из избранного' : 'добавить в избранное' }}
        </a>
        <p>
          Проект пользователя: {{ project.owner }}
        </p>
      </div>
      <div v-if="user.id === project.ownerId" class="flex justify-between items-center mb-4">
        <button @click="removeProject" class="text-red-500 flex items-center project-favorite p-2 cursor-pointer">
          🗑️ Удалить проект
        </button>
      </div>
      <div class="flex">
        <div class="flex-1">
          <img width="650" height="650" :src="mainImage" alt="Main" class="w-full mb-4">
          <div v-if="project.images && project.images.length > 1" class="flex space-x-2">
            <img v-for="(image, index) in project.images" :key="index" :src="getImageUrl(image.imagePath)" :alt="'Thumbnail ' + (index + 1)" class="w-24 h-24 object-cover cursor-pointer" @click="setMainImage(image.imagePath)">
          </div>
        </div>
        <div class="w-1/3 ml-4">
          <div class="mb-4">
            <a :href="'https://' + project.link" class="block text-white bg-black py-2 px-4 rounded mb-2 text-center project-link">Посмотреть GitHub</a>
          </div>
          <div class="mb-4">
            <h3 class="font-semibold">Описание</h3>
            <p>{{ project.desription }}</p> <!-- Исправляем опечатку -->
          </div>
        </div>
      </div>
    </div>
    <FooterComponent />
    <EditProjectComponent v-if="isEditProjectVisible" @hide="hideEditProjectForm" :project="project" />
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import EditProjectComponent from '@/components/EditProjectComponent.vue'; // Импортируем компонент редактирования
import { mapActions, mapState } from 'vuex';

export default {
  name: 'ProjectView',
  components: {
    HeaderComponent,
    FooterComponent,
    EditProjectComponent, // Регистрируем компонент редактирования
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      mainImage: '', // Добавляем свойство mainImage в data
      isFavorite: false, // Добавляем isFavorite в data
      isEditProjectVisible: false // Добавляем флаг видимости формы редактирования
    }
  },
  computed: {
    ...mapState(['currentProject', 'user']),
    user() {
      return this.$store.getters.getUser;
    },
    project() {
      return this.currentProject;
    }
  },
  watch: {
    project(newProject) {
      if (newProject && newProject.images && newProject.images.length > 0) {
        this.mainImage = this.getImageUrl(newProject.images[0].imagePath);
      }
    }
  },
  created() {
    this.fetchProjectById(this.id);
    this.checkFavoriteStatus(); // Проверяем статус избранного при создании компонента
  },
  methods: {
    ...mapActions(['fetchProjectById', 'addToFavorites', 'removeFromFavorites', 'fetchFavorites']),
    async toggleFavorite() {
      if (this.isFavorite) {
        await this.removeFromFavorites(this.project.id);
      } else {
        await this.addToFavorites(this.project.id);
      }
      await this.checkFavoriteStatus();
    },
    async checkFavoriteStatus() {
      try {
        const response = await this.fetchFavorites();
        this.isFavorite = response.some(fav => fav.id === this.project.id);
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    },
    async removeProject() {
      try {
        await this.$store.dispatch('removeProject', this.project.id);
        this.$router.push('/');
      } catch (error) {
        console.error('Error removing project:', error);
      }
    },
    getImageUrl(imagePath) {
      return `http://localhost:8080/get/file${imagePath}`;
    },
    setMainImage(imagePath) {
      this.mainImage = this.getImageUrl(imagePath);
    },
    showEditProjectForm() {
      this.isEditProjectVisible = true;
    },
    hideEditProjectForm() {
      this.isEditProjectVisible = false;
    }
  }
}
</script>

<style scoped>
.project-container {
  font-family: 'Roboto Mono', sans-serif;
}

.project-favorite {
  font-family: 'Roboto Mono', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  background: #F2EFE9;
  border-radius: 6px;
  color: #000000;
}
</style>
