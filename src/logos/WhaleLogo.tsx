import React from 'react';
import { Flex, Text, Image } from '@chakra-ui/react';
import keyMascot from '../logos/key-mascot.svg';

interface WhaleLogoProps {
  width?: string | number;
  height?: string | number;
}

const WhaleLogo: React.FC<WhaleLogoProps> = ({
  width = 'clamp(140px, 18vw, 180px)', // skaluje, max 180px
  height = 'auto',
}) => {
  return (
    <Flex
      direction="row"
      align="center"
      justify="center"
      gap="clamp(0.25rem, 1vw, 0.75rem)"
      w={width}
      h={height}
      aspectRatio="15 / 4" // 👈 uvijek drži proporciju 15:4
      minW="140px"
      maxW="180px"
      borderRadius="8px"
    >
      {/* Ikonica */}
      <Image
        src={keyMascot}
        alt="Whale Logo"
        w="clamp(20px, 2vw, 32px)"
        h="auto"
        objectFit="contain"
      />

      {/* Tekst */}
      <Text
        color="#FFF"
        textAlign="center"
        textShadow="0 4px 4px rgba(0, 0, 0, 0.25)"
        fontFamily="Jost, sans-serif"
        fontSize="clamp(0.9rem, 2.2vw, 1.2rem)"
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
