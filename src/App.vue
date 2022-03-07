<template>
  <div class="App">
    <header class="header">🐶 Dogstagram! 🐾</header>
    <router-view />
    <UserMessageUI />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UserMessageUI from '@/components/UserMessageUI.vue';

export default defineComponent({
  name: 'Home',
  components: {
    UserMessageUI
  }
});
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');

:root {
  --main-bg-color: #282c34;
  --main-fg-color: #e0e0e0;
  --info-color: #00ffff;
  --error-color: #ff1d08;
}

html {
  height: 100vh;
  height: -webkit-fill-available;
}

body {
  height: 100%;
  height: -webkit-fill-available;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: var(--main-bg-color);
  color: var(--main-fg-color);
  font-family: 'Varela Round', sans-serif;
  font-size: 5vmin;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  & > #root {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .App {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    height: -webkit-fill-available;
    overflow: hidden;

    .header {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2vmin 2vmin 0;
      font-size: 2rem;
    }
  }

  select,
  button {
    font-size: inherit;
    font-family: inherit;
    color: inherit;
  }

  // Scrollbar styles
  * {
    scrollbar-width: none;
  }

  *::-webkit-scrollbar {
    width: 12px;
  }

  *::-webkit-scrollbar-track {
    background: none;
  }

  *::-webkit-scrollbar-thumb {
    background-color: var(--main-bg-color);
    border-radius: 2vmin;
    border: 2px solid var(--main-fg-color);
  }
}

@media (min-width: 900px) {
  body {
    font-size: 16px;
  }
}
</style>
