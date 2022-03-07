import { render } from '@testing-library/vue';
import { UserMessageState, UserMessageType } from '@/store/modules/userMessage';
import { createMockStore } from '../../tests/unit/mockStore';
import UserMessageUI from './UserMessageUI.vue';

describe('UserMessageUI.vue', () => {
  it('hides if no message', () => {
    const initialState: UserMessageState = {
      type: null,
      message: null
    };
    const mockStore = createMockStore(undefined, initialState);

    const { container } = render(UserMessageUI, {
      global: {
        plugins: [mockStore]
      }
    });
    const messageElement = container.querySelector('.UserMessage') as HTMLImageElement;
    expect(messageElement).toBeNull();
  });

  it('shows info message style', () => {
    const initialState: UserMessageState = {
      type: UserMessageType.info,
      message: 'Test message'
    };
    const mockStore = createMockStore(undefined, initialState);

    const { getByText } = render(UserMessageUI, {
      global: {
        plugins: [mockStore]
      }
    });
    expect(getByText('Test message'));
  });

  it('shows error message style', () => {
    const initialState: UserMessageState = {
      type: UserMessageType.error,
      message: 'Test error'
    };
    const mockStore = createMockStore(undefined, initialState);

    const { getByText } = render(UserMessageUI, {
      global: {
        plugins: [mockStore]
      }
    });
    expect(getByText('Test error'));
  });
});
