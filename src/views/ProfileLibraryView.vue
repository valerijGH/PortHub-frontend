<template>
  <div class="main-bg">
    <HeaderComponent />
    <header>
      <div class="container mx-auto px-6 py-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center justify-end w-full">
            <div class="flex sm:hidden">
              <button type="button" class="text-gray-600 hover:text-gray-500 focus:outline-none focus:text-gray-500" aria-label="toggle menu">
                <svg viewBox="0 0 24 24" class="h-6 w-6 fill-current">
                  <path fill-rule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="relative mt-6 max-w-lg mx-auto">
          <span class="absolute inset-y-0 left-0 pl-3 flex items-center">
            <svg width="34" height="34" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_376_804)">
                <path d="M26.6176 48.0888L10.0226 56.405L5.30492 46.9908L21.8999 38.6746L26.6176 48.0888Z" fill="#FDE888" />
                <path d="M26.6182 48.0887L10.0232 56.4049L7.6643 51.6978L24.2593 43.3816L26.6182 48.0887Z" fill="#FBDA35" />
                <path d="M43.3878 41.299L23.7853 51.1222L17.7745 39.1275L37.377 29.3042L43.3878 41.299Z" fill="#FBDA35" />
                <path d="M43.3883 41.2991L23.7858 51.1224L20.7804 45.1249L40.3827 35.3017L43.3883 41.2991Z" fill="#F7BA35" />
                <path d="M64.9899 33.4953L41.1198 45.4573L32.6885 28.6324L56.5585 16.6704L64.9899 33.4953Z" fill="#F7BA35" />
                <path d="M64.9892 33.4956L41.1191 45.4575L36.9033 37.045L60.7735 25.083L64.9892 33.4956Z" fill="#FD9702" />
                <path d="M9.24393 58.6119L12.7227 56.8687L6.55074 44.5525L3.07201 46.2958L9.24393 58.6119Z" fill="#FBDA35" />
                <path d="M9.24393 58.6114L12.7227 56.8682L9.63667 50.7101L6.15794 52.4533L9.24393 58.6114Z" fill="#F7BA35" />
                <path d="M64.7888 37.4386L68.2676 35.6953L56.7582 12.7282L53.2794 14.4715L64.7888 37.4386Z" fill="#FBDA35" />
                <path d="M64.7879 37.4391L68.2666 35.6958L62.5119 24.2123L59.0332 25.9555L64.7879 37.4391Z" fill="#F7BA35" />
              </g>
              <defs>
                <clipPath id="clip0_376_804">
                  <rect width="58.5258" height="58.5258" fill="white" transform="translate(18.457) rotate(18.3834)" />
                </clipPath>
              </defs>
            </svg>
          </span>
          <input class="w-full border rounded-md pl-12 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline" type="text" placeholder="Поиск проектов..">
        </div>
      </div>
    </header>
    <main class="my-8">
      <div class="container mx-auto px-6">
        <div class=" grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6 project-hub">
          <ProjectRenderComponent v-for="project in projects" :key="project.id" :project="project" />
        </div>

      </div>
    </main>
    <FooterComponent />
  </div>
</template>

<script>


// Fetch projects when component is mounted
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import ProjectRenderComponent from '@/components/ProjectRenderComponent.vue'
import { mapGetters } from 'vuex'

export default {
  components: { ProjectRenderComponent, FooterComponent, HeaderComponent },
  computed: {
    ...mapGetters(['getAllProjects']),
    projects() {
      return this.getAllProjects
    }
  },
  created(){
    this.$store.dispatch('fetchProjects')
    console.log('Projects fetched')
  }};

</script>

<style>
  .project-hub{
    min-height: 650px;
  }
  .project-item {
    border: 1px solid #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    border-radius: 30px;
  }
</style>