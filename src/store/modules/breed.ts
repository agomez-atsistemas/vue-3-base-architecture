import { Breed, getBreedList, getBreedPhotoList } from '@/services/dogsService';
import { Commit } from 'vuex';

export interface BreedState {
  isLoading: boolean;
  breedList: Breed[];
  selectedBreed?: string | null;
  breedPhotoList: string[];
}

export const breed = {
  namespaced: true,
  state: (): BreedState => ({
    isLoading: true,
    breedList: [],
    selectedBreed: null,
    breedPhotoList: []
  }),
  mutations: {
    setBreedList: (state: BreedState, payload: Breed[]): void => {
      state.isLoading = false;
      state.breedList = payload;
    },
    setSelectedBreed: (state: BreedState, payload: string): void => {
      state.isLoading = true;
      state.selectedBreed = payload;
    },
    setBreedPhotoList: (state: BreedState, payload: string[]): void => {
      state.isLoading = false;
      state.breedPhotoList = payload;
    },
    setBreedPhotoListFailure: (state: BreedState): void => {
      state.isLoading = false;
      state.breedPhotoList = [];
    }
  },
  actions: {
    async fetchBreedList({ commit }: { commit: Commit }): Promise<void> {
      try {
        commit('userMessage/clearUserMessage', null, { root: true });
        const response = await getBreedList();
        commit('setBreedList', response);
      } catch (error) {
        commit('userMessage/setUserMessage', { type: 'ERROR', message: error }, { root: true });
      }
    },
    async selectBreed({ commit }: { commit: Commit }, breedId: string): Promise<void> {
      try {
        commit('setSelectedBreed', breedId);
        commit('userMessage/clearUserMessage', null, { root: true });
        const response = await getBreedPhotoList(breedId);
        commit('setBreedPhotoList', response);
      } catch (error) {
        commit('setBreedPhotoListFailure');
        commit('userMessage/setUserMessage', { type: 'ERROR', message: error }, { root: true });
      }
    }
  },
  getters: {}
};
