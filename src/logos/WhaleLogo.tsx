import React from 'react';
import { Flex, Text, Image } from '@chakra-ui/react';
import keyMascot from '../logos/key-mascot.svg';

interface WhaleLogoProps {
  width?: string | number;
  height?: string | number;
}

const WhaleLogo: React.FC<WhaleLogoProps> = ({
  width = 'clamp(8rem, 20vw, 12rem)', // skaluje od ~128px do ~192px
  height = 'auto',
}) => {
  return (
    <Flex
      direction="row"
      align="center"
      justify="center"
      gap="clamp(0.25rem, 1vw, 0.75rem)" // razmak se prilagođava
      width={width}
      height={height}
      flexShrink={0}
    >
      {/* Ikonica */}
      <Image
        src={keyMascot}
        alt="Whale Logo"
        width="clamp(1.5rem, 5vw, 2.5rem)" // min 24px, max ~40px
        height="auto"
        flexShrink={0}
        objectFit="contain"
      />

      {/* Tekst */}
      <Text
        color="#FFF"
        textAlign="center"
        textShadow="0 4px 4px rgba(0, 0, 0, 0.25)"
        fontFamily="Jost, sans-serif"
        fontSize="clamp(1rem, 3vw, 1.6rem)" // min 16px, max ~25px
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

export default WhaleLogo;
