import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, Box, Image } from '@chakra-ui/react';

import Wheel from './components/Wheel';
import SpinsBanner from './components/SpinsBanner';
import MobileLayout from './layouts/MobileLayout';

const DesktopApp: React.FC<{
  spinsLeft: number;
  setSpinsLeft: React.Dispatch<React.SetStateAction<number>>;
}> = ({ spinsLeft, setSpinsLeft }) => {
  return (
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

      {/* Centrirani container */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="clamp(20px, 5vh, 40px)"
        w="90vw"
        maxW="600px"
        px={[2, 4, 6]}
      >
        {/* Banner gore */}
        <SpinsBanner spinsLeft={spinsLeft} />

        {/* Wheel ispod */}
        <Box
          w="clamp(220px, 45vw, 440px)"
          minW="200px"
          maxW="480px"
          aspectRatio="1/1"
        >
          <Wheel spinsLeft={spinsLeft} setSpinsLeft={setSpinsLeft} />
        </Box>
      </Box>
    </Box>
  );
};

const Root = () => {
  const [spinsLeft, setSpinsLeft] = useState(2);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ChakraProvider>
      {isMobile ? (
        <MobileLayout spinsLeft={spinsLeft} setSpinsLeft={setSpinsLeft} />
      ) : (
        <DesktopApp spinsLeft={spinsLeft} setSpinsLeft={setSpinsLeft} />
      )}
    </ChakraProvider>
  );
};

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
