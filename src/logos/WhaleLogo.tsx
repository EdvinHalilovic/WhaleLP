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
      gap="clamp(4px, 1.5vw, 12px)" // fleksibilan razmak između ikone i teksta
      width={width}
      height={height}
      flexShrink={0}
      mt="clamp(12px, 4vh, 40px)" // gornji razmak (da logo ne zalijepi uz rub)
      mb="clamp(8px, 3vh, 24px)" // donji razmak prije "YOU GOT"
    >
      <Image
        src={keyMascot}
        alt="Whale Logo"
        width="clamp(24px, 7vw, 44px)" // ikona skalira s ekranom
        height="auto"
        flexShrink={0}
        objectFit="contain"
      />
      <Text
        color="#FFF"
        textAlign="center"
        textShadow="0 4px 4px rgba(0, 0, 0, 0.25)"
        fontFamily="Jost, sans-serif"
        fontSize="clamp(16px, 4vw, 32px)" // tekst fleksibilan
        fontWeight="800"
        lineHeight="1.2"
        letterSpacing="0.02em"
        whiteSpace="nowrap" // da ostane u jednom redu
        flexGrow={1}
      >
        Whale.io
      </Text>
    </Flex>
  );
};

export default WhaleLogo;
