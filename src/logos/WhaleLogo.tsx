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
      gap="8px"
      width={width}
      height={height}
    >
      {' '}
      <Image
        src={keyMascot}
        alt="Whale Logo"
        width="clamp(24px, 8vw, 44px)"
        height="auto"
      />{' '}
      <Text
        color="#FFF"
        textAlign="center"
        textShadow="0 5px 5px rgba(0, 0, 0, 0.25)"
        fontFamily="Jost"
        fontSize="clamp(16px, 4vw, 32px)"
        fontWeight="800"
        lineHeight="1.2"
      >
        {' '}
        Whale.io{' '}
      </Text>{' '}
    </Flex>
  );
};
export default WhaleLogo;
