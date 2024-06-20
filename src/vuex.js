import { createStore } from 'vuex';
import api from '@/utils/api.js';

export default createStore({
  state: {
    user: null,
    projects: [],
    currentProject: null,
    education: [],
    favorites: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
    },
    updateUserField(state, { field, value }) {
      if (state.user) {
        state.user = { ...state.user, [field]: value };
      }
    },
    setProjects(state, projects) {
      state.projects = projects;
    },
    setCurrentProject(state, project) {
      state.currentProject = project;
    },
    setEducation(state, education) {
      state.education = education;
    },
    addEducation(state, educationItem) {
      state.education.push(educationItem);
    },
    setFavorites(state, favorites) {
      state.favorites = favorites;
    },
  },
  actions: {
    loadUser({ commit }) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        commit('setUser', user);
      }
    },
    saveUser({ commit }, user) {
      localStorage.setItem('user', JSON.stringify(user));
      commit('setUser', user);
    },
    logout({ commit }) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      commit('clearUser');
    },
    updateUserField({ commit, state }, { field, value }) {
      commit('updateUserField', { field, value });
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    async uploadUserImage({ commit, state }, file) {
      const formData = new FormData();
      formData.append('file', file);

      await api.post('images/upload-avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      }).then((response) => {
        const imageUrl = response.data.path;
        commit('updateUserField', { field: 'imageUrl', value: imageUrl });
        localStorage.setItem('user', JSON.stringify(state.user));
      }).catch((error) => {
        console.error('Error uploading image:', error);
      });
    },
    async updateUserOnServer({ commit }, updatedFields) {
      try {
        const response = await api.put('/user/update', updatedFields, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });

        commit('setUser', response.data);
        localStorage.setItem('user', JSON.stringify(response.data));

      } catch (error) {
        console.error('Error updating user on server:', error);
      }
    },
    async addProject({ commit }, projectData) {
      try {
        const response = await api.post('/project/add', projectData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        console.log('Project added successfully:', response.data);
      } catch (error) {
        console.error('Error adding project:', error);
      }
    },
    async fetchProjects({ commit }) {
      try {
        const response = await api.get('/project/get-all');
        commit('setProjects', response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    },
    async fetchProjectById({ commit }, id) {
      try {
        const response = await api.get(`/project/get/${id}`);
        commit('setCurrentProject', response.data);
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    },
    async updateProject({ commit }, { formData }) {
      try {
        const response = await api.put(`/project/update/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        commit('setCurrentProject', response.data);
        console.log('Project updated successfully:', response.data);
      } catch (error) {
        console.error('Error updating project:', error);
      }
    },
    async removeProject({ commit, state }, projectId) {
      try {
        const response = await api.delete('/project/remove', {
          data: {
            id: projectId,
            ownerId: state.user.id
          },
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        console.log('Project removed successfully:', response.data);
        // Optionally, you can also update the state to remove the project locally
        commit('setProjects', state.projects.filter(project => project.id !== projectId));
        this.$router.push('/');
      } catch (error) {
        console.error('Error removing project:', error);
      }
    },
    async addEducation({ commit }, educationData) {
      try {
        const response = await api.post('/education/add', educationData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        commit('addEducation', response.data);
      } catch (error) {
        console.error('Error adding education:', error);
      }
    },
    async fetchEducation({ commit, state }) {
      try {
        const response = await api.get(`/education/get-all/${state.user.username}`);
        commit('setEducation', response.data);
      } catch (error) {
        console.error('Error fetching education:', error);
      }
    },
    async addToFavorites({ dispatch }, projectId) {
      try {
        await api.post('/favorite/add', { projectId }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        dispatch('fetchFavorites');
      } catch (error) {
        console.error('Error adding to favorites:', error);
      }
    },
    async removeFromFavorites({ dispatch }, projectId) {
      try {
        await api.delete('/favorite/remove', {
          data: { projectId },
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        dispatch('fetchFavorites');
      } catch (error) {
        console.error('Error removing from favorites:', error);
      }
    },
    async fetchFavorites({ commit }) {
      try {
        const response = await api.get('/favorite/get', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        commit('setFavorites', response.data);
        return response.data; // Ensure it returns the data
      } catch (error) {
        console.error('Error fetching favorites:', error);
        return []; // Return an empty array in case of error
      }
    },
  },
  getters: {
    getUser: (state) => state.user,
    getUserImageUrl: (state) => {
      return state.user && state.user.imageUrl ? `http://localhost:8080/get/file${state.user.imageUrl}` : null;
    },
    getLastProjects: (state) => {
      return state.projects ? state.projects : [];
    },
    getAllProjects: (state) => state.projects,
    getCurrentProject: (state) => state.currentProject,
    getEducation: (state) => state.education,
    getFavorites: (state) => state.favorites,
  },
});
