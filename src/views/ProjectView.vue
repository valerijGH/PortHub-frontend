<template>
  <div class="main-bg">
    <HeaderComponent />
    <div class="max-w-6xl mx-auto block-box bg-white p-10 project-container">
      <h1 class="text-3xl font-bold mb-4">Рабочий сервер</h1>
      <div class="flex justify-between items-center mb-4">
        <a class="text-blue-500 flex items-center project-favorite p-2">
          ❤️ добавить в избранное
        </a>
      </div>
      <div class="flex">
        <div class="flex-1">
          <img src="https://placehold.co/600x400" alt="Main" class="w-full mb-4">
          <div class="flex space-x-2">
            <img src="https://placehold.co/600x400" alt="Thumbnail 1" class="w-24 h-24 object-cover">
            <img src="https://placehold.co/600x400" alt="Thumbnail 2" class="w-24 h-24 object-cover">
            <img src="https://placehold.co/600x400" alt="Thumbnail 3" class="w-24 h-24 object-cover">
          </div>
        </div>
        <div class="w-1/3 ml-4">
          <div class="mb-4">
            <a href="https://github.com" class="block text-white bg-black py-2 px-4 rounded mb-2 text-center project-link">Посмотреть GitHub</a>
            <a href="https://yandex.ru" class="block text-black bg-blue-400 py-2 px-4 rounded text-center project-link">Посмотреть Яндекс Диск</a>
          </div>
          <div class="mb-4">
            <h3 class="font-semibold">Срок разработки</h3>
            <p>Было затрачено всего 2 дня</p>
          </div>
          <div class="mb-4">
            <h3 class="font-semibold">Проект</h3>
            <p>Не коммерческий проект</p>
          </div>
          <div class="mb-4">
            <h3 class="font-semibold">Описание</h3>
            <p>Информация ради информации, ее думает автор</p>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <h3 class="font-semibold mb-2">Примечания</h3>
        <ul class="list-disc list-inside">
          <li>Описание и рассказ, теги</li>
          <li>Первый пункт о чем-то</li>
          <li>Второй пункт о чем-то </li>
        </ul>
      </div>
      <div class="mt-4">
        <h3 class="font-semibold mb-2">Технологии</h3>
        <p>Сервер: Linux</p>
      </div>
      <div class="mt-4">
        <h3 class="font-semibold mb-2">Описание</h3>
        <p>Сервер полностью функционален, всё лонгпуллится, ничего не лагает</p>
      </div>
    </div>
    <FooterComponent />
  </div>
</template>
<script setup lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
</script>

<style>
  .project-container{
    font-family: 'Roboto Mono',sans-serif;
  }
  .project-favorite{
    font-family: 'Roboto Mono',sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    background: #F2EFE9;
    border-radius: 6px;
    color: #000000;
  }
</style>