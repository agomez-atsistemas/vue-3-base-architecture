import fetchMock from 'jest-fetch-mock';
import { getBreedList } from '@/services/dogsService';
import { createBreedStore, createUserMessageStore } from '../../tests/unit/mockStore';
import { fetchBreedListFixture, breedListFixture } from '../../tests/unit/mockBreedList';
import { BreedState } from './modules/breed';
import { UserMessageState } from './modules/userMessage';

fetchMock.enableMocks();

describe('store/index.ts', () => {
  it('set breed list mutation with value passing', () => {
    const initialState: BreedState = {
      isLoading: true,
      breedList: [],
      selectedBreed: null,
      breedPhotoList: []
    };
    const store = createBreedStore(initialState);
    store.commit('setBreedList', [{ id: 'breed1', name: 'Breed1' }]);

    expect(store.state.breedList).toStrictEqual([{ id: 'breed1', name: 'Breed1' }]);
  });

  it('set selected breed mutation with value passing', () => {
    const initialState: BreedState = {
      isLoading: false,
      breedList: [
        { id: 'breed1', name: 'Breed1' },
        { id: 'breed2', name: 'Breed2' },
        { id: 'breed3', name: 'Breed3' }
      ],
      selectedBreed: null,
      breedPhotoList: []
    };
    const store = createBreedStore(initialState);
    store.commit('setSelectedBreed', 'breed1');

    expect(store.state.selectedBreed).toBe('breed1');
  });

  it('load available breed list', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(fetchBreedListFixture));

    const breedList = await getBreedList();

    expect(breedList).toEqual(breedListFixture);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith('https://dog.ceo/api/breeds/list/all');
  });

  it('set user message mutation', () => {
    const initialState: UserMessageState = {
      type: null,
      message: null
    };
    const store = createUserMessageStore(initialState);
    store.commit('setUserMessage', {
      type: 'ERROR',
      message: 'Example of error test'
    });

    expect(store.state.type).toBe('ERROR');

    store.commit('clearUserMessage');

    expect(store.state.type).toBe(null);
  });
});
