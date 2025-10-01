import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import MobileWhaleLogo from './MobileWhaleLogo';
import splash from '../logos/splash.png';

interface MobileSpinsBannerProps {
  spinsLeft: number;
}

const MobileSpinsBanner: React.FC<MobileSpinsBannerProps> = ({ spinsLeft }) => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap="clamp(0.5rem, 2vh, 1rem)" // razmak responsivno
      width="100%"
    >
      {/* Whale logo */}
      <Box
        display="flex"
        justifyContent="center"
        marginTop="clamp(8px, 2vh, 20px)"
        marginBottom="clamp(8px, 2vh, 16px)"
        width="100%"
      >
        <MobileWhaleLogo />
      </Box>

      {/* YOU GOT tekst */}
      <Text
        color="#FFF"
        textAlign="center"
        textShadow="0 4px 4px rgba(0, 0, 0, 0.25)"
        fontFamily="Jost, sans-serif"
        fontSize="clamp(18px, 5vw, 24px)" // figma 24px -> adaptivno
        fontWeight="800"
        lineHeight="clamp(24px, 6vw, 32px)" // figma 32px -> adaptivno
      >
        YOU GOT
      </Text>

      {/* Splash pozadina sa SPINS LEFT */}
      <Flex justify="center" width="100%">
        <Box
          width="clamp(240px, 85vw, 344px)" // Figma 344px, ali responsivno
          aspectRatio="43 / 8" // Figma aspect ratio
          backgroundImage={`url(${splash})`}
          backgroundSize="100% 100%"
          backgroundRepeat="no-repeat"
          display="flex"
          alignItems="center"
          justifyContent="center"
          padding="0 0.5rem"
          borderRadius="40px" // Figma border radius 40
          maxWidth="90vw"
        >
          <Text
            width="100%"
            color="#FFF"
            textAlign="center"
            textShadow="0 5px 5px rgba(0, 0, 0, 0.25)"
            fontFamily="Jost, sans-serif"
            fontSize="clamp(14px, 4vw, 18px)" // skaluje 14 → 18px
            fontWeight="800"
            lineHeight="1.2"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {spinsLeft} SPINS LEFT
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default MobileSpinsBanner;
