import React from 'react';
import { Box, Flex, Image } from '@chakra-ui/react';
import Wheel from '../components/Wheel';

interface MobileCharacterWheelLayoutProps {
  spinsLeft: number;
  setSpinsLeft: React.Dispatch<React.SetStateAction<number>>;
}

const MobileCharacterWheelLayout: React.FC<MobileCharacterWheelLayoutProps> = ({
  spinsLeft,
  setSpinsLeft,
}) => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="flex-start"
      w="100%"
      h="100%"
      position="relative"
      overflow="hidden"
    >
      {/* Character */}
      <Image
        src="/MobileLayoutCharacter.png" // tvoja slika iz public/
        alt="Character"
        objectFit="contain"
        w="100%"
        maxW="420px"
        zIndex={1}
      />

      {/* Wheel preko lika */}
      <Box
        position="absolute"
        bottom="0"
        left="50%"
        transform="translateX(-50%)"
        w="clamp(280px, 80vw, 420px)"
        aspectRatio="1/1"
        zIndex={2}
      >
        <Wheel spinsLeft={spinsLeft} setSpinsLeft={setSpinsLeft} />
      </Box>
    </Flex>
  );
};

export default MobileCharacterWheelLayout;
