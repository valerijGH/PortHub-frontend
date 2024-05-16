<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
</script>

<template>
  <div class="main-bg relative flex items-center flex-col">
    <HeaderComponent  />
      <div class="container-box block-box p-16 bg-white">
        <div class="max-w-4xl mx-auto border rounded-lg p-6 shadow-md">
          <div class="flex items-center mb-4">
            <img src="/placeholder.svg" width="50" h="50" alt="Avatar" class="rounded-full w-12 h-12 mr-4">
            <div>
              <h2 class="text-xl font-bold">Крутой Ник</h2>
              <div class="flex items-center text-gray-600">
                <span class="mr-2">💼 Программистер</span>
                <span>📍 Екатеринбург</span>
              </div>
            </div>
          </div>
          <div class="mb-4">
            <h3 class="font-semibold">Интересные факты:</h3>
            <ul class="list-disc list-inside">
              <li>Я делал это и то</li>
              <li>А ещё вот такое умею</li>
            </ul>
          </div>
          <div class="mb-4">
            <div class="flex items-center space-x-4">
              <a href="mailto:ex@example.com" class="text-gray-600">✉️ ex@example.com</a>
              <a href="https://twitter.com/krutoi_nik" class="text-gray-600">🐦 @krutoi_nik</a>
              <a href="https://vk.com/example" class="text-gray-600">🔗 vk.com/example</a>
              <span class="text-gray-600">🎮 krutoi#1234</span>
            </div>
          </div>
          <button class="profile-edit-btn px-4 py-2 bg-blue-500 text-white rounded">Редактировать профиль</button>

        </div>
        <div class="max-w-4xl mx-auto">
          <h2 class="text-2xl font-bold mb-6 profile-article mt-10">Проекты</h2>
          <div class="grid grid-cols-4 gap-4">
            <router-link to="/project">
              <div class="border rounded-lg p-4 shadow-md">
                <div class="bg-yellow-500 h-40 mb-4"></div>
                <h3 class="text-blue-500">Название проекта <span class="text-gray-500">&#9825;</span></h3>
                <p class="font-bold">Крутой Ник</p>
                <p class="text-gray-500">Сегодня 19:53</p>
              </div>
            </router-link>
            <router-link to="/project">
              <div class="border rounded-lg p-4 shadow-md">
                <div class="bg-yellow-500 h-40 mb-4"></div>
                <h3 class="text-blue-500">Название проекта <span class="text-gray-500">&#9825;</span></h3>
                <p class="font-bold">Крутой Ник</p>
                <p class="text-gray-500">Сегодня 19:53</p>
              </div>
            </router-link>
            <router-link to="/project">
              <div class="border rounded-lg p-4 shadow-md">
                <div class="bg-yellow-500 h-40 mb-4"></div>
                <h3 class="text-blue-500">Название проекта <span class="text-gray-500">&#9825;</span></h3>
                <p class="font-bold">Крутой Ник</p>
                <p class="text-gray-500">Сегодня 19:53</p>
              </div>
            </router-link>
            <router-link to="/project">
              <div class="border rounded-lg p-4 shadow-md">
                <div class="bg-yellow-500 h-40 mb-4"></div>
                <h3 class="text-blue-500">Название проекта <span class="text-gray-500">&#9825;</span></h3>
                <p class="font-bold">Крутой Ник</p>
                <p class="text-gray-500">Сегодня 19:53</p>
              </div>
            </router-link>

          </div>
        </div>
        <div class="profile-about">
          <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold mb-4 mt-10">О себе</h2>
            <button class="bg-blue-500 text-white px-4 py-2 rounded mb-6 profile-edit-btn">Добавить Информацию</button>
            <div v-for="(item, index) in educationItems" :key="index" class="border rounded-lg p-4 shadow-md mb-4">
              <div class="flex justify-between items-center mb-2">
                <h3 class="font-semibold">Образование</h3>
                <button class="text-red-500">✖️</button>
              </div>
              <p><strong>Учебное заведение:</strong> {{ item.institution }}</p>
              <p><strong>Специальность:</strong> {{ item.specialty }}</p>
              <p><strong>Уровень образования:</strong> {{ item.educationLevel }}</p>
              <p><strong>Год окончания:</strong> {{ item.graduationYear }}</p>
              <a :href="item.diplomaUrl" class="text-blue-500" download>
                📄 {{ item.diplomaName }}
              </a>
            </div>
          </div>
        </div>
      </div>
    <FooterComponent />
  </div>
</template>
<script>
export default {
  name: 'ProfileSection',
  data() {
    return {
      educationItems: [
        {
          institution: 'Колледж информационных технологий',
          specialty: 'Техническая поддержка компьютерных систем',
          educationLevel: 'Среднее профессиональное образование (СПО)',
          graduationYear: '2019',
          diplomaUrl: '/diploma-scan.pdf',
          diplomaName: 'diploma-scan.pdf',
        },
        {
          institution: 'Московский государственный университет, Факультет иностранных языков',
          specialty: 'Лингвистика и межкультурная коммуникация (Английский язык С1)',
          educationLevel: 'Бакалавр',
          graduationYear: '2023',
          diplomaUrl: '/diploma-scan.pdf',
          diplomaName: 'diploma-scan.pdf',
        },
        {
          institution: 'Институт лингвистики и межкультурной коммуникации г. Москва',
          specialty: 'Профессиональный устный переводчик',
          educationLevel: 'Квалификация',
          graduationYear: '2024',
          diplomaUrl: '/diploma-scan.pdf',
          diplomaName: 'diploma-scan.pdf',
        },
      ],
    }
  },
}
</script>

<style>
  .profile-edit-btn{
    /* Frame 26 */

    box-sizing: border-box;

    /* Auto layout */
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
  ul li{
    color: #6C6C6C;
  }

</style>