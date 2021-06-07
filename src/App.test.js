import App from './App';
import { mount } from 'enzyme';
import { Provider } from 'urql';
import { never } from 'wonka';
import { render } from '@testing-library/react';

it('renders', () => {
  const mockClient = {
    executeQuery: jest.fn(() => never),
    executeMutation: jest.fn(() => never),
    executeSubscription: jest.fn(() => never),
  };

  const wrapper = render(
    <Provider value={mockClient}>
      <App />
    </Provider>
  );
});