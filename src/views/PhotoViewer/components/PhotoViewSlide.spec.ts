import { createI18n } from 'vue-i18n';
import { render } from '@testing-library/vue';
import { BreedState } from '@/store/modules/breed';
import { createMockStore } from '../../../../tests/unit/mockStore';
import PhotoViewSlide from './PhotoViewSlide.vue';

describe('PhotoViewSlide.vue', () => {
  it('renders breed photos list', () => {
    const initialState: BreedState = {
      isLoading: false,
      breedList: [],
      selectedBreed: 'breed1',
      breedPhotoList: ['img1.jpg', 'img2.jpg']
    };
    const mockStore = createMockStore(initialState);

    const { getAllByTestId } = render(PhotoViewSlide, {
      global: {
        plugins: [mockStore, createI18n({})]
      }
    });
    expect(getAllByTestId('imageBreed').length).toBe(2);
  });
});
