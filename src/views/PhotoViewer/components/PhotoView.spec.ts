import { createI18n } from 'vue-i18n';
import { render } from '@testing-library/vue';
import { BreedState } from '@/store/modules/breed';
import { createMockStore } from '../../../../tests/unit/mockStore';
import PhotoView from './PhotoView.vue';

describe('PhotoView.vue', () => {
  it('renders image', () => {
    const initialState: BreedState = {
      isLoading: false,
      breedList: [],
      selectedBreed: 'breed1',
      breedPhotoList: ['img1.jpg']
    };
    const mockStore = createMockStore(initialState);

    const { getByTestId } = render(PhotoView, {
      global: {
        plugins: [mockStore, createI18n({})]
      }
    });
    expect(getByTestId('imageBreed')).toBeDefined();
  });
});
