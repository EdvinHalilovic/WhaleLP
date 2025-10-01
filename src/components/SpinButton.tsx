import { Box, Text } from '@chakra-ui/react';
import React from 'react';

const SpinButton = () => {
  return (
    <Box
      w="clamp(100px, 18vw, 150px)" // min 100px, raste sa ekranom do max 150px
      h="clamp(100px, 18vw, 150px)"
      borderRadius="full"
      border="clamp(4px, 1vw, 8px) solid #FFF"
      overflow="hidden"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
    >
      {/* Background image */}
      <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        bgImage="url('/SpinBackground.png')"
        bgSize="cover"
        bgPosition="center"
      />

      {/* Gradient overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        bgGradient="linear(180deg, #FF00CC 0%, #AD008A 100%)"
        mixBlendMode="color"
      />

      {/* Tekst */}
      <Text
        color="#FFF"
        textShadow="0 0 24px rgba(0, 0, 0, 0.80)"
        fontFamily="Jost, sans-serif"
        fontSize="clamp(18px, 4vw, 36px)" // tekst od 18px do 36px
        fontWeight="800"
        lineHeight="1.2"
        textAlign="center"
        zIndex={1}
      >
        SPIN
      </Text>
    </Box>
  );
};

export default SpinButton;
