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

        {/* Glavni container */}
        <Box
          position="relative"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="flex-start"
          w="100%"
          h="100%"
          pt="clamp(20px, 5vh, 60px)" // padding top da logo uvijek vidiš
          gap="clamp(16px, 4vw, 40px)"
        >
          <SpinsBanner spinsLeft={spinsLeft} />

          {/* Wheel wrapper */}
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
