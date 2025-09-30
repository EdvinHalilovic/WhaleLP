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
          left={['-80px', '-40px', '20px', '140px']} // mobile → desktop
          bottom={['-60px', '-80px', '-100px', '-100px']}
          w={['0px', '120px', '240px', '400px']} // na najmanjem ekranu nestaje
          display={['none', 'block']} // sakrij na najmanjem
          objectFit="contain"
          pointerEvents="none"
        />

        {/* Lik desno */}
        <Image
          src="/rightcarachter.png"
          alt="Character Right"
          position="absolute"
          right={['-80px', '-40px', '20px', '100px']}
          bottom={['-60px', '-80px', '-100px', '-100px']}
          w={['0px', '120px', '240px', '400px']}
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
          gap={['16px', '24px', '32px', '40px']}
          w="100%"
          maxW="600px"
          px={[2, 4, 6]} // padding za male ekrane
        >
          <SpinsBanner spinsLeft={spinsLeft} />

          {/* Wheel wrapper – responsive veličine */}
          <Box
            w={['200px', '260px', '340px', '420px']}
            h={['200px', '260px', '340px', '420px']}
          >
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
