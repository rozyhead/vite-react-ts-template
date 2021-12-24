import { Text, TextProps } from '@chakra-ui/react';
import { PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { graphql } from 'relay-runtime';
import { GraphQLUserQuery as GraphQLUserQueryType } from './__generated__/GraphQLUserQuery.graphql';

export const GraphQLUserQuery = graphql`
  query GraphQLUserQuery {
    viewer {
      login
    }
  }
`;

export type { GraphQLUserQueryType };

export type GraphQLUserProps = {
  queryReference: PreloadedQuery<GraphQLUserQueryType>;
} & TextProps;

const GraphQLUser: React.VFC<GraphQLUserProps> = ({
  queryReference,
  ...rest
}) => {
  const data = usePreloadedQuery(GraphQLUserQuery, queryReference);
  return <Text {...rest}>{data.viewer.login}</Text>;
};

export default GraphQLUser;
