import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import MobileSpinsBanner from './MobileSpinsBanner';
import MobileCharacterWheelLayout from './MobileCharacterWheelLayout';

interface MobileLayoutProps {
  spinsLeft: number;
  setSpinsLeft: React.Dispatch<React.SetStateAction<number>>;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({
  spinsLeft,
  setSpinsLeft,
}) => {
  return (
    <Box
      w="100vw"
      minH="100dvh" // koristi dynamic viewport da pozadina pokrije full screen i na mobilnim
      bgImage="url('/background.jpg')"
      bgSize="cover"
      bgPos="center"
      bgRepeat="no-repeat"
      overflow="hidden"
    >
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
