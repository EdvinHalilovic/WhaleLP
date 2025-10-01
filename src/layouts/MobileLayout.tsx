import React from 'react';
import { Box } from '@chakra-ui/react';
import SpinsBanner from '../components/SpinsBanner';

interface MobileLayoutProps {
  spinsLeft: number;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ spinsLeft }) => {
  return (
    <Box
      w="100vw"
      h="100vh"
      position="relative"
      overflow="hidden"
      bgImage="url('/mobile-bg.png')" // tvoj background iz public/
      bgSize="cover"
      bgPos="center"
      bgRepeat="no-repeat"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      {/* Overlay rectangle iz Figma */}
      <Box
        w="100%"
        maxW="390px"
        h="240px"
        flexShrink={0}
        opacity={0.7}
        bgGradient="linear(180deg, #000 0%, rgba(0,0,0,0) 100%)"
        position="absolute"
        top={0}
        left="50%"
        transform="translateX(-50%)"
      />

      {/* SpinsBanner */}
      <Box mt="16px" w="100%" display="flex" justifyContent="center">
        <SpinsBanner spinsLeft={spinsLeft} />
      </Box>
    </Box>
  );
};

export default MobileLayout;
