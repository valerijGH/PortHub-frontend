<template>
  <router-link :to="`/project/${project.id}`">
    <div class=" p-4 bg-white project-item rounded-md">
      <div class="bg-yellow-500 h-40 mb-4 project-image">
        <img v-if="mainImage" :src="mainImage" />
      </div>

      <h3 class="text-blue-500 w-100 overflow-hidden">{{ project.title }}<span class="text-gray-500"> &#9825;</span></h3>
<!--      <p class="font-bold">@{{ project.ownerId }}</p>-->
      <p class="text-gray-500 text-sm">{{ formattedDate }}</p>
    </div>

  </router-link>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(['currentProject', 'user']),

    mainImage() {
      return (this.project && this.project.images && this.project.images.length > 0)
        ? this.getImageUrl(this.project.images[0].imagePath) : null; // Плейсхолдер, если изображение отсутствует
    },
    formattedDate() {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      const date = new Date(this.project.createdAt);
      return date.toLocaleDateString('ru-RU', options);
    }
  },
  methods: {
    getImageUrl(imagePath) {
      return `http://localhost:8080/get/file${imagePath}`;
    }
  }
}
</script>

<style>
 .project-image img{
   width: 100%;
   height: 100%;
   object-fit: cover;
 }
</style>


