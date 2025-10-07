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

  // ✅ Responsive vrijednosti (telefoni / tableti)
  const paddingValue = useBreakpointValue({
    base: 'clamp(0.5rem, 3vw, 1rem)', // telefoni
    md: 'clamp(1rem, 4vw, 9rem)', // tableti
  });

  const gapValue = useBreakpointValue({
    base: 'clamp(1rem, 4vh, 2rem)', // telefoni
    md: '140px', // tableti - više prostora između bannera i wheela
  });

  const justifyValue = useBreakpointValue({
    base: 'flex-start', // telefoni
    md: 'space-evenly', // tableti
  });

  const bannerMarginTop = useBreakpointValue({
    base: '2vh', // telefoni
    md: '7vh', // tableti
  });

  const flexHeight = useBreakpointValue({
    base: 'auto',
    md: '50vh',
  });

  // ✅ Pomjeraj lika samo na tabletima ka gore
  const characterTranslateY = useBreakpointValue({
    base: '0', // ništa na telefonima
    md: '-1%', // pomakni gore za iPad Mini / Air
    lg: '-12%', // malo više ako hoćeš i za veće tablete
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
      pt={useBreakpointValue({ base: '6vh', md: '4vh' })}
    >
      <SoundButton />

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
          transform={`translateY(${characterTranslateY})`} // 👈 ovo je ključ!
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
