import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, Box } from '@chakra-ui/react';

import Wheel from './components/Wheel';

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <Box
        w="100vw"
        h="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="pink.200"
      >
        <Wheel />
      </Box>
    </ChakraProvider>
  </React.StrictMode>
);
