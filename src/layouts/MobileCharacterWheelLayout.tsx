import React from 'react';
import { Box, Flex, Image, useBreakpointValue } from '@chakra-ui/react';
import Wheel from '../components/Wheel';

interface MobileCharacterWheelLayoutProps {
  spinsLeft: number;
  setSpinsLeft: React.Dispatch<React.SetStateAction<number>>;
}

const MobileCharacterWheelLayout: React.FC<MobileCharacterWheelLayoutProps> = ({
  spinsLeft,
  setSpinsLeft,
}) => {
  // ⬆️ Lik ide gore SAMO na tabletima

  const characterLift = useBreakpointValue({ base: '0', md: '-20%' }) ?? '0';

  return (
    <Flex
      direction="column"
      align="center"
      justify="flex-start"
      h="100%"
      position="relative"
    >
      {/* === Character === */}
      <Image
        src="/MobileLayoutCharacter.png"
        alt="Character"
        objectFit="contain"
        maxW="420px"
        w="115%" // isti scaling kao prije
        zIndex={1}
        mb="clamp(3.5rem, 6vw, 3.5rem)"
        position="relative"
        top={characterLift} // 👈 samo na tabletima pomjera 40% gore
        transition="top 0.4s ease"
      />

      {/* === Wheel preko lika === */}
      <Box
        position="absolute"
        bottom="0"
        left="50%"
        transform="translateX(-50%) scale(1.15)" // wheel ostaje isti
        transformOrigin="bottom center"
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
