import React from 'react';
import { Flex, Text, Image } from '@chakra-ui/react';
import keyMascot from '../logos/key-mascot.svg';

interface WhaleLogoProps {
  width?: string | number;
  height?: string | number;
}

const WhaleLogo: React.FC<WhaleLogoProps> = ({
  width = 'clamp(160px, 40vw, 260px)', // default širina responsivna
  height = 'auto',
}) => {
  return (
    <Flex
      direction="row"
      align="center"
      justify="center"
      gap="clamp(6px, 1.5vw, 14px)" // razmak ikona ↔ tekst
      width={width}
      height={height}
      flexShrink={0}
    >
      <Image
        src={keyMascot}
        alt="Whale Logo"
        width="clamp(28px, 8vw, 48px)" // ikonica skalira
        height="auto"
        flexShrink={0}
        objectFit="contain"
      />
      <Text
        color="#FFF"
        textAlign="center"
        textShadow="0 4px 4px rgba(0, 0, 0, 0.25)"
        fontFamily="Jost, sans-serif"
        fontSize="clamp(18px, 4vw, 34px)" // tekst fleksibilan
        fontWeight="800"
        lineHeight="1.2"
        letterSpacing="0.02em"
        whiteSpace="nowrap" // sprječava prelamanje
      >
        Whale.io
      </Text>
    </Flex>
  );
};

export default WhaleLogo;
