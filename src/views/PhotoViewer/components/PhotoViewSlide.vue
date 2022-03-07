<template>
  <div class="PhotoSlide">
    <div v-if="breedPhotoList.length > 0" class="grid">
      <PhotoView v-for="(breedPhoto, index) in breedPhotoList" :key="index" :imageUrl="breedPhoto" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import PhotoView from '@/views/PhotoViewer/components/PhotoView.vue';

export default defineComponent({
  name: 'PhotoSlide',
  components: { PhotoView },
  setup() {
    const store = useStore();
    const breedPhotoList = computed(() => store.state.breed.breedPhotoList);

    return { breedPhotoList };
  }
});
</script>

<style scoped lang="scss">
.PhotoSlide {
  padding: 5vmin 5vmin 0;
  border-radius: 2vmin;
  margin: 2.5vmin 5vmin;
  flex: 1 1 100%;

  background-color: var(--main-fg-color);
  color: var(--main-bg-color);
  max-height: 100vh;
  box-shadow: inset 2vmin 2vmin 4vmin #bebebe, inset -2vmin -2vmin 4vmin #ffffff;
  transition: max-height ease-in-out 1s 0.25s, padding ease-in-out 0.25s, margin linear 0s;
  overflow-y: auto;

  // Workaround for bottom padding bug when using grid and scroll
  &::after {
    content: '';
    display: block;
    height: 5vmin;
  }

  &:empty {
    max-height: 0;
    padding: 0;
    margin: 0;
    transition: max-height ease-in-out 0.5s, padding ease-in-out 0.25s 0.5s, margin linear 0s 0.75s;

    &::after {
      display: none;
    }
  }

  .grid {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-auto-rows: 20vmax;
    justify-items: stretch;
    align-items: stretch;
    gap: 10px 10px;

    &:empty {
      display: none;
    }
  }
}

@media (min-width: 900px) {
  .PhotoSlide {
    margin: 2.5vmin 5vmin 2.5vmin;
    align-self: stretch;
    max-width: 100vh;
    transition: max-width ease-in-out 1s 0.25s, padding ease-in-out 0.25s, margin linear 0s;

    &:empty {
      max-width: 0;
      max-height: 100%;
      padding: 0;
      margin: 0;
      transition: max-width ease-in-out 0.5s, padding ease-in-out 0.25s 0.25s, margin linear 0s 0.75s;
    }
  }
}
</style>
