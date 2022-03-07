<template>
  <div class="BreedSelector">
    <label for="breedSelect">{{ $t('breedSelector.label') }}</label>
    <select id="breedSelect" value="{{ selectedBreed || undefined }}" @change="selectedBreedChange">
      <option v-if="!selectedBreed">{{ $t('breedSelector.none') }}</option>
      <option value="error">{{ $t('breedSelector.errorBreed') }}</option>
      <option v-for="breed of breedList" :key="breed.id" :value="breed.id">{{ breed.name }}</option>
    </select>
    <div class="LoadingImagesMsg" v-if="isLoading">
      <img :src="require('@/assets/img/loading.png')" />
      <p>{{ $t('breedSelector.loading') }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'BreedSelector',
  setup() {
    const store = useStore();
    const breedList = computed(() => store.state.breed.breedList);
    const isLoading = computed(() => store.state.breed.isLoading);
    const selectedBreed = computed(() => store.state.breed.selectedBreed);

    onMounted(() => store.dispatch('breed/fetchBreedList'));

    const selectedBreedChange = (event: Event): void => {
      store.dispatch('breed/selectBreed', (event.target as HTMLSelectElement).value);
    };

    return { breedList, isLoading, selectedBreed, selectedBreedChange };
  }
});
</script>

<style scoped lang="scss">
.BreedSelector {
  position: relative;
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  padding: 6vmin;
  border-radius: 2vmin;
  margin: 2.5vmin 5vmin;
  background-color: var(--main-fg-color);
  color: var(--main-bg-color);
  box-shadow: inset 2vmin 2vmin 4vmin #bebebe, inset -2vmin -2vmin 4vmin #ffffff;

  select {
    background: linear-gradient(145deg, #f0f0f0, #cacaca);
    box-shadow: 4px 4px 8px #bebebe, -4px -4px 8px #ffffff;
    padding: 6px;
    margin-top: 20px;
    border: none;
    border-radius: 4px;
    // Loaded SVG by base64
    background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='iso-8859-1'%3F%3E%3C!-- Generator: Adobe Illustrator 16.0.0  SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='255px' height='255px' viewBox='0 0 255 255' style='enable-background:new 0 0 255 255%3B' xml:space='preserve'%3E%3Cg%3E%3Cg id='arrow-drop-down'%3E%3Cpolygon points='0 63.75 127.5 191.25 255 63.75 '/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: calc(100% - 0.5em) center;
    background-size: 1em;
    padding-right: 1.5em;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    &,
    option {
      text-transform: capitalize;
    }
  }
}

.LoadingImagesMsg {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 2vmin;
  background-color: rgba(0, 0, 0, 0.8);
  color: var(--main-fg-color);

  img {
    animation: fadingInOut 2s infinite alternate;
  }
}

@media (min-width: 900px) {
  .BreedSelector {
    margin: 2.5vmin 2.5vmin 2.5vmin 5vmin;
  }
}

@keyframes fadingInOut {
  from {
    opacity: 0.1;
  }
}
</style>
