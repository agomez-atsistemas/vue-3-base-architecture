import { createStore } from 'vuex';
import { breed, BreedState } from '@/store/modules/breed';
import { userMessage, UserMessageState } from '@/store/modules/userMessage';

const breedState: BreedState = {
  isLoading: true,
  breedList: [],
  selectedBreed: null,
  breedPhotoList: []
};

const userMessageState: UserMessageState = {
  type: null,
  message: null
};

const breedModule = {
  namespaced: true,
  state: (): BreedState => breedState,
  mutations: {
    setBreedList: jest.fn(),
    setSelectedBreed: jest.fn(),
    setBreedPhotoList: jest.fn(),
    setBreedPhotoListFailure: jest.fn()
  },
  actions: {
    fetchBreedList: jest.fn(),
    selectBreed: jest.fn()
  }
};

const userMessageModule = {
  namespaced: true,
  state: (): UserMessageState => userMessageState,
  mutations: {
    setUserMessage: jest.fn(),
    clearUserMessage: jest.fn()
  }
};

export const createMockStore = (
  initialBreedState: BreedState = breedState,
  initialuserMessageState: UserMessageState = userMessageState
) =>
  createStore({
    modules: {
      breed: {
        ...breedModule,
        state: {
          ...breedModule.state,
          ...initialBreedState
        }
      },
      userMessage: {
        ...userMessageModule,
        state: {
          ...userMessageModule.state,
          ...initialuserMessageState
        }
      }
    }
  });

export const createBreedStore = (initialState: BreedState) =>
  createStore({
    ...breed,
    state: {
      ...breed.state,
      ...initialState
    }
  });

export const createUserMessageStore = (initialState: UserMessageState) =>
  createStore({
    ...userMessage,
    state: {
      ...userMessage.state,
      ...initialState
    }
  });
