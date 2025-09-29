import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, Box, Image } from '@chakra-ui/react';

import Wheel from './components/Wheel';
import SpinsBanner from './components/SpinsBanner';

const App: React.FC = () => {
  const [spinsLeft, setSpinsLeft] = useState(2);

  return (
    <ChakraProvider>
      {/* Fullscreen container */}
      <Box
        w="100vw"
        h="100vh"
        position="relative"
        overflow="hidden"
        bgImage="url('/background.jpg')"
        bgSize="cover"
        bgPos="center"
        bgRepeat="no-repeat"
      >
        {/* Likovi sa strane */}
        <Image
          src="/character-left.png"
          alt="Character Left"
          position="absolute"
          left="50px"
          bottom="-370px"
          width={['200px', '400px', '631px']}
          height="auto"
          objectFit="contain"
        />

        <Image
          src="/rightcarachter.png"
          alt="Character Right"
          position="absolute"
          right="50px"
          bottom="-370px"
          width={['200px', '400px', '651px']}
          height="auto"
          objectFit="contain"
        />

        {/* Centrirani container za banner i wheel */}
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="40px" // razmak između bannera i wheel-a
        >
          <SpinsBanner spinsLeft={spinsLeft} />

          <Box w={['200px', '300px', '400px']} h={['200px', '300px', '400px']}>
            <Wheel spinsLeft={spinsLeft} setSpinsLeft={setSpinsLeft} />
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
