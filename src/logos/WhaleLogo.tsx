import React from 'react';
import { Flex, Text, Image } from '@chakra-ui/react';
import keyMascot from '../logos/key-mascot.svg';

interface WhaleLogoProps {
  width?: string | number;
  height?: string | number;
}

const WhaleLogo: React.FC<WhaleLogoProps> = ({
  width = '180px',
  height = '48px',
}) => {
  return (
    <Flex
      direction="row"
      align="center"
      justify="center"
      gap="12px"
      width={width}
      height={height}
    >
      {/* SVG logo iz public/logos/ */}
      <Image src={keyMascot} alt="Whale Logo" width="44px" height="47px" />

      {/* Tekst Whale.io */}
      <Text
        color="#FFF"
        textAlign="center"
        textShadow="0 5.813px 5.813px rgba(0, 0, 0, 0.25)"
        fontFamily="Jost"
        fontSize="32px"
        fontStyle="normal"
        fontWeight="800"
        lineHeight="36px"
      >
        Whale.io
      </Text>
    </Flex>
  );
};

export default WhaleLogo;
