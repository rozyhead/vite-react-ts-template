import { motion } from 'framer-motion';
import { Suspense, useEffect, useState } from 'react';

import { Box, Button, Flex, Image, Link, Text } from '@chakra-ui/react';

import ThemeToggleButton from '@/components/ThemeToggleButton';
import logo from './logo.svg';
import GraphQLUser, {
  GraphQLUserQuery,
  GraphQLUserQueryType,
} from './components/GraphQLUser';
import { useQueryLoader } from 'react-relay';

const textFontSizes = [16, 18, 24, 30];

const App: React.VFC = () => {
  const [count, setCount] = useState(0);

  const [queryReference, loadQuery, disposeQuery] =
    useQueryLoader<GraphQLUserQueryType>(GraphQLUserQuery);

  useEffect(() => {
    loadQuery({});
    return disposeQuery;
  }, [disposeQuery, loadQuery]);

  return (
    <Box>
      <Flex
        as="header"
        direction="column"
        alignItems="center"
        justifyContent="center"
        h="100vh"
        fontSize="3xl"
      >
        <motion.div
          animate={{ rotateZ: 360 }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: 'linear',
          }}
        >
          <Image src={logo} alt="" h="40vmin" />
        </motion.div>
        <Text fontSize={textFontSizes}>
          Hello Vite + React + Typescript + Chakra UI!
        </Text>
        <Suspense fallback={<Text>Loading...</Text>}>
          {queryReference && <GraphQLUser queryReference={queryReference} />}
        </Suspense>
        <Button
          colorScheme="blue"
          fontSize={textFontSizes}
          onClick={() => setCount((c) => c + 1)}
          marginTop="2"
        >
          count is: {count}
        </Button>
        <Text fontSize={textFontSizes}>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </Text>
        <Text fontSize={textFontSizes}>
          <Link href="https://reactjs.org" isExternal color="#61dafb">
            Learn React
          </Link>
          {' | '}
          <Link
            href="https://vitejs.dev/guide/features.html"
            isExternal
            color="#61dafb"
          >
            Vite Docs
          </Link>
          {' | '}
          <Link
            href="https://www.typescriptlang.org/"
            isExternal
            color="#61dafb"
          >
            Typescript
          </Link>
          {' | '}
          <Link href="https://chakra-ui.com" isExternal color="#61dafb">
            Chakra UI
          </Link>
        </Text>
      </Flex>
      <ThemeToggleButton pos="fixed" bottom="2" right="2" />
    </Box>
  );
};

export default App;
