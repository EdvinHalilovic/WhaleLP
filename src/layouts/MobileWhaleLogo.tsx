import React from 'react';
import { Flex, Text, Image } from '@chakra-ui/react';
import keyMascot from '../logos/key-mascot.svg';

const MobileWhaleLogo: React.FC = () => {
  return (
    <Flex
      direction="row"
      align="center"
      justify="center"
      gap="clamp(0.25rem, 2vw, 0.5rem)" // razmak skaluje
      flexShrink={0}
      width="auto"
    >
      {/* Ikonica */}
      <Image
        src={keyMascot}
        alt="Whale Logo"
        width="clamp(32px, 10vw, 48px)" // min 32px, max 48px
        height="auto"
        objectFit="contain"
        flexShrink={0}
      />

      {/* Tekst */}
      <Text
        color="#FFF"
        textAlign="center"
        textShadow="0 2px 3px rgba(0, 0, 0, 0.25)"
        fontFamily="Jost, sans-serif"
        fontSize="clamp(0.9rem, 4vw, 1.2rem)" // min ~14px, max ~19px
        fontWeight="800"
        lineHeight="1.2"
        letterSpacing="0.02em"
        whiteSpace="nowrap"
      >
        Whale.io
      </Text>
    </Flex>
  );
};

export default MobileWhaleLogo;
