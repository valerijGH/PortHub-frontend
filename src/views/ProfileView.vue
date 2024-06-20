<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import ProjectAddComponent from '@/components/ProjectAddComponent.vue'
import ProjectRender from '@/components/ProjectRenderComponent.vue'
import AddEducationComponent from '@/components/EducationAddComponent.vue'

</script>

<template>
  <div class="main-bg relative flex items-center flex-col">
    <HeaderComponent />
    <div class="container-box block-box p-16 ">
      <div class="max-w-4xl mx-auto border rounded-lg p-6 shadow-md">
        <div class="flex items-center mb-4">
          <img :src="userImageUrl ?? 'https://placehold.co/50x50'" width="50" height="50" alt="Avatar" class="rounded-full w-12 h-12 mr-4">
          <div>
            <h2 v-if="user" class="text-xl font-bold">{{ user.username }}</h2>
            <div class="flex items-center text-gray-600">
              <span class="mr-2">💼 {{ user.profession }}</span>
              <span>📍 {{ user.location }}</span>
            </div>
          </div>
        </div>
        <div class="mb-4">
          {{ user.description }}
        </div>
        <div class="mb-4">
          <div class="flex items-center space-x-4">
            <a v-if="user" href="mailto:{{ user.email }}" class="text-gray-600">✉ {{ user.email }}</a>
          </div>
        </div>
        <button @click="showUserEditComponent" class="profile-edit-btn px-4 py-2 bg-blue-500 text-white rounded">Редактировать профиль</button>
      </div>
      <div class="max-w-4xl mx-auto">
        <h2 class="text-2xl font-bold mb-6 profile-article mt-10">Проекты</h2>
        <div class="grid grid-cols-4 gap-4 block-box">
          <ProjectRender v-for="project in filteredProjects" :key="project.id" :project="project" />
        </div>
        <button @click="showProjectEditComponent" class="profile-edit-btn px-4 py-2 bg-blue-500 text-white rounded mt-5">Добавить проект</button>
      </div>
      <div class="profile-about">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-2xl font-bold mb-4 mt-10">О себе</h2>
          <button @click="showEducationEditComponent" class="bg-blue-500 text-white px-4 py-2 rounded mb-6 profile-edit-btn">Добавить Информацию</button>

            <EducationRenderComponent  />

        </div>
      </div>
    </div>
    <ProfileEditComponent v-if="isUserEditVisible" @hide="hideUserEditComponent" />
    <ProjectAddComponent v-if="isProjectAddVisible" @hide="hideProjectEditComponent" />
    <AddEducationComponent v-if="isEducationAddVisible" @hide="hideEducationEditComponent" />
    <FooterComponent />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import EducationRenderComponent from '@/components/EducationRenderComponent.vue'
import ProfileEditComponent from '@/components/ProfileEditComponent.vue'

export default {
  name: 'ProfileSection',
  components: {
    ProfileEditComponent,
    EducationRenderComponent,
  },
  data() {
    return {
      isUserEditVisible: false,
      isProjectAddVisible: false,
      isEducationAddVisible: false,
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters(['getUserImageUrl', 'getLastProjects', 'getEducation']),
    user() {
      return this.$store.getters.getUser;
    },
    userImageUrl() {
      return this.getUserImageUrl;
    },
    lastProjects() {
      return this.getLastProjects;
    },
    filteredProjects() {
      return this.lastProjects.filter(project => project.ownerId === this.user.id).slice(-4).reverse();
    }
  },
  created() {
    this.$store.dispatch('loadUser');
    this.fetchProjects();
    this.fetchEducation();
  },
  methods: {
    ...mapActions(['fetchProjects', 'fetchEducation']),
    showUserEditComponent() {
      this.isUserEditVisible = true;
    },
    hideUserEditComponent() {
      this.isUserEditVisible = false;
    },
    showProjectEditComponent() {
      this.isProjectAddVisible = true;
    },
    hideProjectEditComponent() {
      this.isProjectAddVisible = false;
    },
    showEducationEditComponent() {
      this.isEducationAddVisible = true;
    },
    hideEducationEditComponent() {
      this.isEducationAddVisible = false;
    },
  },
}
</script>

<style>
.profile-edit-btn {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  gap: 10px;
  width: 165px;
  height: 25px;
  border: 1px solid #000000;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 43px;
  font-size: 11px;
}

ul li {
  color: #6C6C6C;
}
</style>
