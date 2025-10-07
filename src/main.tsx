import React, { useState, useEffect, Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, Box, Image } from '@chakra-ui/react';
import SpinsBanner from './components/SpinsBanner';
import WhaleLogo from './logos/WhaleLogo';
import SoundButton from './components/SoundButton';

// ⚡ Lazy load težih komponenti
const Wheel = lazy(() => import('./components/Wheel'));
const CloudsScene = lazy(() => import('./components/CloudScene'));
const MobileLayout = lazy(() => import('./layouts/MobileLayout'));

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
      {/* 🌸 Clouds pri dnu */}
      <Suspense fallback={null}>
        <CloudsScene />
      </Suspense>

      <SoundButton />

      {/* Lijevi lik */}
      <Image
        loading="lazy"
        src="/character-left.png"
        alt="Character Left"
        position="absolute"
        left="0"
        bottom="0"
        w="33vw"
        h="auto"
        objectFit="contain"
        pointerEvents="none"
        mb="-45vh"
        ml="20vh"
        zIndex={2}
      />

      {/* Desni lik */}
      <Image
        loading="lazy"
        src="/rightcarachter.png"
        alt="Character Right"
        position="absolute"
        right="0"
        bottom="0"
        w="33vw"
        h="auto"
        objectFit="contain"
        pointerEvents="none"
        mb="-45vh"
        mr="20vh"
        zIndex={2}
      />

      {/* Centralni sadržaj */}
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
        zIndex={3}
      >
        <Box
          position="absolute"
          top="5%"
          left="50%"
          transform="translateX(-50%)"
          zIndex={3}
        >
          <WhaleLogo width="clamp(100px, 12vw, 160px)" />
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap="clamp(20px, 5vh, 40px)"
          mt="5rem"
        >
          <SpinsBanner spinsLeft={spinsLeft} />
          <Box w="clamp(200px, 36vw, 460px)" aspectRatio="1/1">
            <Suspense fallback={null}>
              <Wheel spinsLeft={spinsLeft} setSpinsLeft={setSpinsLeft} />
            </Suspense>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const Root = () => {
  const [spinsLeft, setSpinsLeft] = useState(2);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ChakraProvider>
      <Suspense fallback={null}>
        {isMobile ? (
          <>
            {/* 🌸 Clouds i na mobilnom */}
            <CloudsScene />
            <MobileLayout spinsLeft={spinsLeft} setSpinsLeft={setSpinsLeft} />
          </>
        ) : (
          <DesktopApp spinsLeft={spinsLeft} setSpinsLeft={setSpinsLeft} />
        )}
      </Suspense>
    </ChakraProvider>
  );
};

// 🚀 Bez StrictMode (brže mountanje u produkciji)
ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <Root />
);
