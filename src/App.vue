<template>
  <div class="flex flex-col min-h-screen overflow-auto bg-gray-100 ">
    <div class="sticky top-0 bg-white shadow h-12">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <main class="flex-grow">
      <router-view />
    </main>
  </div>
</template>

<script></script>

<style lang="postcss">
@import '~@/app.pcss';
</style>
