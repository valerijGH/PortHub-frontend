<template>
  <div class="main-bg">
    <HeaderComponent />
    <main class="my-8 h-screen">
      <div class="container mx-auto px-6">
        <h2 class="text-2xl font-bold mb-6">Избранные проекты</h2>
        <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
          <div v-if="favoriteProjects.length === 0" class="w-full text-center">
            <p class="text-gray-500">У вас пока нет избранных проектов :(</p>
          </div>
          <ProjectRenderComponent v-for="project in favoriteProjects" :key="project.id" :project="project" :mainimage="mainImage" />
        </div>
      </div>
    </main>
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import { mapActions, mapGetters } from 'vuex';
import ProjectRenderComponent from '@/components/ProjectRenderComponent.vue'

export default {
  name: 'FavoriteProjects',
  components: {
    ProjectRenderComponent,
    HeaderComponent,
    FooterComponent
  },
  computed: {
    ...mapGetters(['getFavorites']),
    favoriteProjects() {
      return this.getFavorites;
    },
    mainImage() {

      return (this.project && this.project.images && this.project.images.length > 0)
        ? this.getImageUrl(this.project.images[0].imagePath) : null; // Плейсхолдер, если изображение отсутствует
    },
  },
  created() {
    console.log(this.fetchFavorites())
    this.fetchFavorites();
  },
  methods: {
    ...mapActions(['fetchFavorites']),
    getImageUrl(imagePath) {
      return `http://localhost:8080/get/file${imagePath}`;
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(date).toLocaleDateString('ru-RU', options);
    }
  }
}
</script>

<style scoped>
/* Добавьте свои стили здесь */
</style>
