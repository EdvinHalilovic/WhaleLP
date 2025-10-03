import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, Box, Image } from '@chakra-ui/react';

import Wheel from './components/Wheel';
import SpinsBanner from './components/SpinsBanner';
import MobileLayout from './layouts/MobileLayout';

// 👇 NOVA DesktopApp komponenta
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
      <Box
        display="flex"
        alignItems="flex-end" // 👈 spušta likove skroz dole
        justifyContent="center" // 👈 likovi bliže centru
        h="100%"
        gap="0" // 👈 manji razmak wheel <-> likovi
        px="1vw"
      >
        {/* Lik lijevo */}
        <Image
          src="/character-left.png"
          alt="Character Left"
          objectFit="contain"
          h={['70%', '85%', '95%']}
          maxW="28vw"
          pointerEvents="none"
          mb="-10vh" // 👈 malo spuštanje
          mr="-3vw"
        />

        {/* Wheel + Banner */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="flex-end"
          gap="clamp(20px, 5vh, 40px)"
          w={['60vw', '45vw', '32vw']}
          maxW="600px"
          mb="-5vh"
        >
          <SpinsBanner spinsLeft={spinsLeft} />
          <Box w="100%" aspectRatio="1/1">
            <Wheel spinsLeft={spinsLeft} setSpinsLeft={setSpinsLeft} />
          </Box>
        </Box>

        {/* Lik desno */}
        <Image
          src="/rightcarachter.png"
          alt="Character Right"
          objectFit="contain"
          h={['70%', '85%', '95%']}
          maxW="28vw"
          pointerEvents="none"
          ml="-3vw"
          mb="-10vh"
        />
      </Box>
    </Box>
  );
};

// 👇 Root koji bira Mobile ili Desktop
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
