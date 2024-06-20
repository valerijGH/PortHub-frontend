<template>
  <div class="edit-project-modal">
    <div class="modal-content">
      <h2>Редактировать проект</h2>
      <form @submit.prevent="submitEditProject">
        <div class="form-group">
          <label for="title">Название</label>
          <input type="text" v-model="title" id="title" >
        </div>
        <div class="form-group">
          <label for="title">Ссылка на github</label>
          <input type="text" v-model="link" id="title" >
        </div>
        <div class="form-group">
          <label for="desription">Описание</label>
          <textarea v-model="description" id="desription" ></textarea>
        </div>
        <div class="form-group">
          <label for="files">Изображения</label>
          <input type="file" @change="onFileChange" id="files" multiple>
        </div>
        <button type="submit" class="btn-submit">Сохранить</button>
        <button type="button" @click="$emit('hide')" class="btn-cancel">Отмена</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditProjectComponent',
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      title: this.project.title || '',
      description: this.project.desription || '', // Исправляем опечатку
      selectedFiles: [],
      link: this.link,
    }
  },
  methods: {
    onFileChange(event) {
      this.selectedFiles = event.target.files;
    },
    async submitEditProject() {
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('description', this.description); // Исправляем опечатку
      formData.append('ownerId', this.project.ownerId);
      formData.append('isTeam', this.project.isTeam);
      formData.append('link', this.link);
      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('files', this.selectedFiles[i]);
      }

      try {
        await this.$store.dispatch('updateProject', { id: this.project.id, formData });
        this.$emit('hide');
        location.reload()
      } catch (error) {
        console.error('Error updating project:', error);
      }
    }
  }
}
</script>

<style scoped>
.edit-project-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
}

.form-group {
  margin-bottom: 10px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn-submit {
  background: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-cancel {
  background: #dc3545;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
}
</style>
