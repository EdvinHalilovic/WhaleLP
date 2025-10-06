import React, { useEffect } from 'react';
import { Box, Flex, useBreakpointValue } from '@chakra-ui/react';
import MobileSpinsBanner from './MobileSpinsBanner';
import MobileCharacterWheelLayout from './MobileCharacterWheelLayout';
import SoundButton from '../components/SoundButton';

interface MobileLayoutProps {
  spinsLeft: number;
  setSpinsLeft: React.Dispatch<React.SetStateAction<number>>;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({
  spinsLeft,
  setSpinsLeft,
}) => {
  // ✅ iOS Safari height fix
  useEffect(() => {
    const setAppHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    };
    setAppHeight();
    window.addEventListener('resize', setAppHeight);
    return () => window.removeEventListener('resize', setAppHeight);
  }, []);

  // ✅ Responsive vrijednosti
  const paddingValue = useBreakpointValue({
    base: 'clamp(0.5rem, 3vw, 1rem)',
    md: 'clamp(1rem, 4vw, 9rem)',
  });

  const gapValue = useBreakpointValue({
    base: 'clamp(1rem, 4vh, 2rem)',
    md: '140px',
  });

  const justifyValue = useBreakpointValue({
    base: 'flex-start',
    md: 'space-evenly',
  });

  const bannerMarginTop = useBreakpointValue({
    base: '2vh',
    md: '7vh',
  });

  const flexHeight = useBreakpointValue({
    base: 'auto',
    md: '50vh',
  });

  const characterTranslateY = useBreakpointValue({
    base: '0',
    md: '-1%',
    lg: '-12%',
  });

  return (
    <Box
      w="100vw"
      minH="var(--app-height)"
      bgImage="url('/mobile-bg.png')"
      bgSize="cover"
      bgPos="center"
      bgRepeat="no-repeat"
      overflow="hidden"
      position="relative" // 🔥 ključno da logo ima referencu za apsolutno pozicioniranje
    >
      {/* 🔊 Dugme za zvuk */}
      <SoundButton />

      {/* 🔥 Whale.io logo — uvek vidljiv */}

      {/* 🔹 Glavni sadržaj */}
      <Flex
        direction="column"
        align="center"
        justify={justifyValue}
        w="100%"
        h={flexHeight}
        p={paddingValue}
        gap={gapValue}
      >
        {/* === Banner === */}
        <Box mt={bannerMarginTop} w="100%">
          <MobileSpinsBanner spinsLeft={spinsLeft} />
        </Box>

        {/* === Character + Wheel === */}
        <Box
          w={useBreakpointValue({ base: '100%', md: '100%' })}
          display="flex"
          justifyContent="center"
          alignItems="center"
          transform={`translateY(${characterTranslateY})`}
          transition="transform 0.4s ease"
        >
          <MobileCharacterWheelLayout
            spinsLeft={spinsLeft}
            setSpinsLeft={setSpinsLeft}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default MobileLayout;
