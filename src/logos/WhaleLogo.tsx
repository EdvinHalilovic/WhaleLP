import React from 'react';
import { Flex, Text, Image } from '@chakra-ui/react';
import keyMascot from '../logos/key-mascot.svg';

interface WhaleLogoProps {
  width?: string | number;
  height?: string | number;
}

const WhaleLogo: React.FC<WhaleLogoProps> = ({
  width = 'auto',
  height = 'auto',
}) => {
  return (
    <Flex
      direction="row"
      align="center"
      justify="center"
      gap="clamp(4px, 1.5vw, 10px)" // manji gap na uskim ekranima
      width={width}
      height={height}
      flexWrap="nowrap"
    >
      <Image
        src={keyMascot}
        alt="Whale Logo"
        width="clamp(20px, 6vw, 40px)"
        height="auto"
        flexShrink={0} // ikona se ne smanjuje preko mjere
      />
      <Text
        color="#FFF"
        textAlign="center"
        textShadow="0 4px 4px rgba(0, 0, 0, 0.25)"
        fontFamily="Jost, sans-serif"
        fontSize="clamp(14px, 4vw, 28px)"
        fontWeight="800"
        lineHeight="1.2"
        letterSpacing="0.02em"
        whiteSpace="nowrap" // ostaje u jednom redu
        flexGrow={1}
      >
        Whale.io
      </Text>
    </Flex>
  );
};

export default WhaleLogo;
