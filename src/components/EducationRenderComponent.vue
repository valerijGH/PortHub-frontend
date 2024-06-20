<template>
  <div class="flex flex-col gap-5">
    <div v-for="(item, index) in educationItems" :key="index" class="education-item bg-white">
      <div class="p-4 mb-4">
        <div class="flex gap-1 items-center mb-2">
          <h3 class="font-semibold">Учебное заведение: </h3><p>{{ item.name }}</p>
        </div>
        <p><strong>Специальность:</strong> {{ item.speciality }}</p>
        <a :href="getFileUrl(item.filePath)" class="text-blue-500" download>
          📄 {{ item.filePath.split('/').pop() }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'EducationRenderComponent',
  computed: {
    ...mapGetters(['getEducation']),
    educationItems() {
      return this.getEducation;
    }
  },
  methods: {
    ...mapActions(['fetchEducation']),
    getFileUrl(filePath) {
      return `http://localhost:8080/get/file${filePath}`;
    },
  },
  created() {
    this.fetchEducation();
  }
}
</script>

<style>
.education-item {
  border: 1px solid #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
}
</style>
