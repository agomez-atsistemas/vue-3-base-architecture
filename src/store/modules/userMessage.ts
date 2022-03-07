export enum UserMessageType {
  error = 'ERROR',
  info = 'INFO'
}
export interface UserMessageState {
  type: UserMessageType | null;
  message: string | null;
}

export const userMessage = {
  namespaced: true,
  state: (): UserMessageState => ({
    type: null,
    message: null
  }),
  mutations: {
    setUserMessage: (state: UserMessageState, payload: UserMessageState): void => {
      state.type = payload.type;
      state.message = payload.message;
    },
    clearUserMessage: (state: UserMessageState): void => {
      state.type = null;
      state.message = null;
    }
  },
  actions: {},
  getters: {}
};
