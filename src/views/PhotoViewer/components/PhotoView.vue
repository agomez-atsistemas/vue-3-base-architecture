<template>
  <img
    :class="['PhotoView', { selected: isSelected, loaded: hasLoaded }]"
    :src="imageUrl"
    loading="lazy"
    @click="handleClick"
    @load="handleLoad"
    data-testid="imageBreed"
    data-cy="imageBreed"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'PhotoView',
  props: {
    imageUrl: String
  },
  setup() {
    const { t } = useI18n();
    const store = useStore();
    let isSelected = ref(false);
    let hasLoaded = ref(false);

    const handleClick = () => {
      if (hasLoaded.value) {
        isSelected.value = !isSelected.value;
        if (isSelected.value) {
          store.commit('userMessage/setUserMessage', { type: 'INFO', message: t('PhotoView.tapToClose') });
        }
      }
    };
    const handleLoad = () => (hasLoaded.value = true);

    return { handleClick, handleLoad, isSelected, hasLoaded };
  }
});
</script>

<style scoped lang="scss">
.PhotoView {
  object-fit: cover;
  background-image: url('/assets/img/loading.png');
  background-size: 50% auto;
  background-position: center;
  background-repeat: no-repeat;
  border: 1px solid #aaa;

  &.loaded {
    background-image: none;
    background-color: var(--main-fg-color);
  }

  &.selected {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    object-fit: contain;
    background-color: var(--main-fg-color);
    z-index: 0;

    &::before {
      content: '';
      display: block;
      width: 2em;
      height: 2em;
      background: url('/assets/icons/close.svg') center center no-repeat;
      background-size: contain;
      position: absolute;
      top: 16px;
      right: 16px;
    }
  }
}
</style>
