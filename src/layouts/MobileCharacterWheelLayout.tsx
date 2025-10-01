import React from 'react';
import { Box, Flex, Image } from '@chakra-ui/react';
import Wheel from '../components/Wheel';

interface Props {
  spinsLeft: number;
  setSpinsLeft: React.Dispatch<React.SetStateAction<number>>;
}

const MobileCharacterWheelLayout: React.FC<Props> = ({
  spinsLeft,
  setSpinsLeft,
}) => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap="clamp(1rem, 4vh, 2rem)" // razmak između karaktera i wheela
      w="100%"
    >
      {/* Character */}
      <Box
        width="clamp(200px, 70vw, 390px)" // skaluje se od min 200px do max 390px
        aspectRatio="759 / 827" // originalni omjer slike iz Figma
        flexShrink={0}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Image
          src="/MobileLayoutCharacter.png" // iz public foldera
          alt="Character"
          objectFit="contain"
          width="100%"
          height="100%"
        />
      </Box>

      {/* Wheel */}
      <Box
        width="clamp(220px, 75vw, 358px)" // prema Figma: 358x358, ali responsive
        aspectRatio="1 / 1"
        flexShrink={0}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Wheel spinsLeft={spinsLeft} setSpinsLeft={setSpinsLeft} />
      </Box>
    </Flex>
  );
};

export default MobileCharacterWheelLayout;
