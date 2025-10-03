import React, { useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/react';
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
  // FIX za iOS Safari height
  useEffect(() => {
    const setAppHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    };
    setAppHeight();
    window.addEventListener('resize', setAppHeight);
    return () => window.removeEventListener('resize', setAppHeight);
  }, []);

  return (
    <Box
      w="100vw"
      minH="var(--app-height)"
      bgImage="url('/mobile-bg.png')"
      bgSize="cover"
      bgPos="center"
      bgRepeat="no-repeat"
      overflow="visible"
    >
      <SoundButton />

      <Flex
        direction="column"
        align="center"
        justify="flex-start"
        w="100%"
        h="100%"
        p="clamp(0.5rem, 3vw, 1rem)"
        gap="clamp(1rem, 4vh, 2rem)"
      >
        {/* Banner */}
        <MobileSpinsBanner spinsLeft={spinsLeft} />

        {/* Character + Wheel */}
        <MobileCharacterWheelLayout
          spinsLeft={spinsLeft}
          setSpinsLeft={setSpinsLeft}
        />
      </Flex>
    </Box>
  );
};

export default MobileLayout;
