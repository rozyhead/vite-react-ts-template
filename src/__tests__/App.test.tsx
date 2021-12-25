import { render, screen } from '@testing-library/react';
import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils';

import '@testing-library/jest-dom';

import App from '@/App';
import { GraphQLUserQuery } from '@/components/GraphQLUser';
import { RelayEnvironmentProvider } from 'react-relay';

describe('<App />', () => {
  it('renders without errors', async () => {
    const environment = createMockEnvironment();
    environment.mock.queueOperationResolver((operation) => {
      return MockPayloadGenerator.generate(operation, {
        User() {
          return {
            login: 'test-user',
          };
        },
      });
    });
    environment.mock.queuePendingOperation(GraphQLUserQuery, {});

    render(
      <RelayEnvironmentProvider environment={environment}>
        <App />
      </RelayEnvironmentProvider>
    );

    expect(await screen.findByText('test-user')).toBeInTheDocument();
  });
});
