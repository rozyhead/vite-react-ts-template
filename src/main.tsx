import React from 'react';
import ReactDOM from 'react-dom';
import { loadQuery, RelayEnvironmentProvider } from 'react-relay';

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';

import App from './App';
import theme from './theme';
import { createEnvironment } from './relay-environment';
import {
  GraphQLUserQuery,
  GraphQLUserQueryType,
} from './components/GraphQLUser';

const environment = createEnvironment('https://api.github.com/graphql', {
  Authorization: `Bearer ${import.meta.env.VITE_GITHUB_PERSONAL_ACCESS_TOKEN}`,
});

const graphQLUserQuery = loadQuery<GraphQLUserQueryType>(
  environment,
  GraphQLUserQuery,
  {}
);

ReactDOM.render(
  <React.StrictMode>
    <RelayEnvironmentProvider environment={environment}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App graphQLUserQuery={graphQLUserQuery} />
      </ChakraProvider>
    </RelayEnvironmentProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
