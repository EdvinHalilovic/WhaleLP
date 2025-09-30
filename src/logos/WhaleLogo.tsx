import React from 'react';
import { Flex, Text, Image } from '@chakra-ui/react';
import keyMascot from '../logos/key-mascot.svg';

interface WhaleLogoProps {
  width?: string | number;
  height?: string | number;
}

const WhaleLogo: React.FC<WhaleLogoProps> = ({
  width = 'clamp(120px, 28vw, 180px)', // manja širina
  height = 'auto',
}) => {
  return (
    <Flex
      direction="row"
      align="center"
      justify="center"
      gap="clamp(4px, 1vw, 10px)" // manji razmak između ikone i teksta
      width={width}
      height={height}
      flexShrink={0}
    >
      <Image
        src={keyMascot}
        alt="Whale Logo"
        width="clamp(22px, 6vw, 34px)" // ikonica manja
        height="auto"
        flexShrink={0}
        objectFit="contain"
      />
      <Text
        color="#FFF"
        textAlign="center"
        textShadow="0 4px 4px rgba(0, 0, 0, 0.25)"
        fontFamily="Jost, sans-serif"
        fontSize="clamp(14px, 3vw, 26px)" // tekst manji
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
