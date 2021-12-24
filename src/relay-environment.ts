import {
  Environment,
  Network,
  RecordSource,
  RequestParameters,
  Store,
  Variables,
} from 'relay-runtime';

export function createEnvironment(
  graphqlEndpoint: string,
  headers: Record<string, string> | (() => Record<string, string>) = {}
) {
  async function fetchRelay(params: RequestParameters, variables: Variables) {
    console.log(
      `fetching query ${params.name} with ${JSON.stringify(variables)}`
    );

    const finalHeaders = typeof headers === 'function' ? headers() : headers;

    const response = await fetch(graphqlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...finalHeaders,
      },
      body: JSON.stringify({
        query: params.text,
        variables,
      }),
    });

    return await response.json();
  }

  return new Environment({
    network: Network.create(fetchRelay),
    store: new Store(new RecordSource()),
  });
}
