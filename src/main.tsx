import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, Box, Image } from '@chakra-ui/react';

import Wheel from './components/Wheel';
import SpinsBanner from './components/SpinsBanner';
import MobileLayout from './layouts/MobileLayout';
import WhaleLogo from './logos/WhaleLogo';

// 👇 DesktopApp
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
      {/* Likovi + wheel */}
      <Box
        display="flex"
        alignItems="flex-end"
        justifyContent="center"
        h="100%"
        px="1vw"
      >
        {/* Lik lijevo */}
        <Image
          src="/character-left.png"
          alt="Character Left"
          objectFit="contain"
          w={['40vw', '42vw', '44vw']}
          maxW="700px"
          aspectRatio={631 / 1036}
          pointerEvents="none"
          alignSelf="flex-end"
          mr="-3vw"
          mb="-20vh"
        />

        {/* Centralni dio (Logo + Banner + Wheel) */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap="clamp(8px, 2vh, 16px)" // 👈 bliže logo i banner
          w={['60vw', '45vw', '32vw']}
          maxW="clamp(300px, 40vw, 700px)"
        >
          {/* Whale Logo */}
          <WhaleLogo width="clamp(100px, 12vw, 160px)" />

          {/* Spins Banner */}
          <SpinsBanner spinsLeft={spinsLeft} />

          {/* Wheel */}
          <Box w="100%" aspectRatio="1/1">
            <Wheel spinsLeft={spinsLeft} setSpinsLeft={setSpinsLeft} />
          </Box>
        </Box>

        {/* Lik desno */}
        <Image
          src="/rightcarachter.png"
          alt="Character Right"
          objectFit="contain"
          w={['40vw', '42vw', '44vw']}
          maxW="clamp(300px, 45vw, 700px)"
          aspectRatio={631 / 1036}
          pointerEvents="none"
          alignSelf="flex-end"
          ml="-3vw"
          mb="-20vh"
        />
      </Box>
    </Box>
  );
};

// 👇 Root bira Mobile ili Desktop
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
