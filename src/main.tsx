import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, Box, Image } from '@chakra-ui/react';
import Wheel from './components/Wheel';
import SpinsBanner from './components/SpinsBanner';
import MobileLayout from './layouts/MobileLayout';
import WhaleLogo from './logos/WhaleLogo';

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
        left="0"
        bottom="0"
        w="32vw" // zauzima skoro pola ekrana
        h="auto"
        maxW="none"
        objectFit="contain"
        pointerEvents="none"
        mb="-30vh"
        ml="20vh"
      />

      {/* Lik desno */}
      <Image
        src="/rightcarachter.png"
        alt="Character Right"
        position="absolute"
        right="0"
        bottom="0"
        w="32vw"
        h="auto"
        maxW="none"
        objectFit="contain"
        pointerEvents="none"
        mb="-35vh"
        mr="20vh"
      />

      {/* Centrirani container */}
      <Box
        position="absolute"
        top="54%"
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
        <WhaleLogo width="clamp(100px, 12vw, 160px)" />

        <SpinsBanner spinsLeft={spinsLeft} />

        {/* Wheel ispod */}
        <Box
          w="clamp(200px, 36vw, 460px)" // 👈 smanjeno
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
