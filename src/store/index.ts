import { createStore } from 'vuex';
import { userMessage } from '@/store/modules/userMessage';
import { breed } from '@/store/modules/breed';

export default createStore({
  modules: {
    userMessage,
    breed
  }
});
