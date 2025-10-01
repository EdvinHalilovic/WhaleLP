import React from 'react';
import { Flex, Box, Image } from '@chakra-ui/react';

import character from '../logos/character.png';

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
      width="clamp(320px, 90vw, 390px)" // max širina 390px kao u figmi
      flexShrink={0}
      gap="clamp(1rem, 3vh, 2rem)" // razmak između charactera i wheela
    >
      {/* Character */}
      <Box
        width="clamp(200px, 70vw, 390px)" // minimalno 200px, max 390px
        aspectRatio="759 / 827" // omjer slike
        flexShrink={0}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Image
          src={character}
          alt="Character"
          objectFit="contain"
          width="100%"
          height="100%"
        />
      </Box>

      {/* Wheel */}
      <Box
        width="clamp(240px, 85vw, 358px)" // Figma max 358px
        aspectRatio="1 / 1" // kvadrat
        flexShrink={0}
      >
        <Wheel spinsLeft={spinsLeft} setSpinsLeft={setSpinsLeft} />
      </Box>
    </Flex>
  );
};

export default MobileCharacterWheelLayout;
