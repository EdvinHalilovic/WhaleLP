import React from 'react';
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
  // ✅ Adaptive padding
  const paddingValue = useBreakpointValue({
    base: 'clamp(0.5rem, 3vw, 1rem)', // telefoni
    sm: 'clamp(1rem, 4vw, 2rem)', // mali tableti (iPad mini)
    md: 'clamp(2rem, 5vw, 3rem)', // srednji tableti
    lg: 'clamp(2.5rem, 6vw, 4rem)', // veći tableti
  });

  const gapValue = useBreakpointValue({
    base: 'clamp(1rem, 4vh, 2rem)',
    sm: 'clamp(1.5rem, 5vh, 3rem)',
    md: 'clamp(2rem, 6vh, 4rem)',
    lg: 'clamp(2.5rem, 8vh, 5rem)',
  });

  const justifyValue = useBreakpointValue({
    base: 'flex-start',
    sm: 'center',
    md: 'space-evenly',
    lg: 'space-evenly',
  });

  const bannerMarginTop = useBreakpointValue({
    base: '2vh',
    sm: '4vh',
    md: '6vh',
    lg: '8vh',
  });

  const flexHeight = useBreakpointValue({
    base: 'auto',
    sm: '60vh',
    md: '55vh',
    lg: '50vh',
  });

  // ✅ Pomjeraj lika progresivno više na većim tabletima
  const characterTranslateY = useBreakpointValue({
    base: '0',
    sm: '-5%',
    md: '49%',
    lg: '-20%',
  });

  const wheelWidth = useBreakpointValue({
    base: '85%',
    sm: '90%',
    md: '95%',
    lg: '100%',
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
      pt={useBreakpointValue({
        base: 'clamp(2vh, 4vh, 6vh)',
        sm: '3vh',
        md: '4vh',
      })}
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
        {/* === Character + Wheel === */}
        <Box
          w={wheelWidth}
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="relative" // 👈 dodano
          zIndex={5} // 👈 dodano
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
