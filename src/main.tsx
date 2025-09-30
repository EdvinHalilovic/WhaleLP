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
        {/* Lik lijevo */}
        <Image
          src="/character-left.png"
          alt="Character Left"
          position="absolute"
          left={['-60px', '-40px', '20px', '100px']}
          bottom={['-40px', '-60px', '-80px', '-100px']}
          w="clamp(120px, 20vw, 400px)"
          display={['none', 'block']}
          objectFit="contain"
          pointerEvents="none"
        />

        {/* Lik desno */}
        <Image
          src="/rightcarachter.png"
          alt="Character Right"
          position="absolute"
          right={['-60px', '-40px', '20px', '100px']}
          bottom={['-40px', '-60px', '-80px', '-100px']}
          w="clamp(120px, 20vw, 400px)"
          display={['none', 'block']}
          objectFit="contain"
          pointerEvents="none"
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
          gap="clamp(16px, 4vw, 40px)"
          w="90vw"
          maxW="600px"
          px={[2, 4, 6]}
        >
          <SpinsBanner spinsLeft={spinsLeft} />

          {/* Wheel wrapper – potpuno responsive */}
          <Box w="clamp(200px, 40vw, 420px)" aspectRatio="1/1">
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
