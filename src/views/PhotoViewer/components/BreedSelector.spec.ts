import { render, fireEvent } from '@testing-library/vue';
import { BreedState } from '@/store/modules/breed';
import { createMockStore } from '../../../../tests/unit/mockStore';
import BreedSelector from './BreedSelector.vue';

describe('BreedSelector.vue', () => {
  it('renders loading when app start', () => {
    const initialState: BreedState = {
      isLoading: true,
      breedList: [],
      selectedBreed: null,
      breedPhotoList: []
    };
    const mockStore = createMockStore(initialState);

    const { getByText } = render(BreedSelector, {
      global: {
        plugins: [mockStore]
      }
    });
    getByText('breedSelector.loading');
  });

  it('renders breeds list', () => {
    const initialState: BreedState = {
      isLoading: false,
      breedList: [
        { id: 'breed1', name: 'Breed1' },
        { id: 'breed2', name: 'Breed2' }
      ],
      selectedBreed: null,
      breedPhotoList: []
    };
    const mockStore = createMockStore(initialState);

    const { getByRole } = render(BreedSelector, {
      global: {
        plugins: [mockStore]
      }
    });
    getByRole('option', {
      name: /Breed1/i
    });
  });

  it('select breed when option is update', async () => {
    const initialState: BreedState = {
      isLoading: false,
      breedList: [
        { id: 'breed1', name: 'Breed1' },
        { id: 'breed2', name: 'Breed2' }
      ],
      selectedBreed: null,
      breedPhotoList: []
    };
    const mockStore = createMockStore(initialState);

    const { getByRole } = render(BreedSelector, {
      global: {
        plugins: [mockStore]
      }
    });

    await fireEvent.update(getByRole('combobox'), 'breed1');
    const optionSelected = getByRole('option', {
      name: /Breed1/i
    }) as HTMLOptionElement;
    const notOptionSelected = getByRole('option', {
      name: /Breed2/i
    }) as HTMLOptionElement;
    expect(optionSelected.selected).toBeTruthy();
    expect(notOptionSelected.selected).toBeFalsy();
  });
});
