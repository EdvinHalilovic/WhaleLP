import React from 'react';
import { Flex, Text, Image } from '@chakra-ui/react';
import keyMascot from '../logos/key-mascot.svg';

interface WhaleLogoProps {
  width?: string | number;
  height?: string | number;
}

const WhaleLogo: React.FC<WhaleLogoProps> = ({
  width = 'clamp(140px, 30vw, 200px)',
  height = 'auto',
}) => {
  return (
    <Flex
      direction="row"
      align="center"
      justify="center"
      gap="clamp(4px, 2vw, 12px)" // fleksibilan razmak
      maxW={width}
      height={height}
      flexShrink={0}
    >
      <Image
        src={keyMascot}
        alt="Whale Logo"
        width="clamp(24px, 8vw, 44px)"
        height="clamp(24px, 8vw, 44px)" // dodano da bude u skladu sa fontom
        objectFit="contain"
      />
      <Text
        color="#FFF"
        textAlign="center"
        textShadow="0 5px 5px rgba(0, 0, 0, 0.25)"
        fontFamily="Jost, sans-serif"
        fontSize="clamp(16px, 4vw, 32px)"
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
