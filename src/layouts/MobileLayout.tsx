import React, { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';

import MobileSpinsBanner from './MobileSpinsBanner';

const MobileLayout: React.FC = () => {
  // Broj spinova koji ostaje – kontrolisan iz parenta ili state-a
  const [spinsLeft] = useState(2);

  return (
    <Box
      w="100vw"
      h="100vh"
      bgImage="url('/background.jpg')" // možeš zamijeniti ako imaš drugi bg za mobile
      bgSize="cover"
      bgPos="center"
      overflow="hidden"
    >
      <Flex
        direction="column"
        align="center"
        justify="flex-start"
        w="100%"
        h="100%"
        p="clamp(0.5rem, 3vw, 1rem)" // malo paddinga responsivno
        gap="clamp(1rem, 4vh, 2rem)"
      >
        {/* Logo i banner */}

        <MobileSpinsBanner spinsLeft={spinsLeft} />

        {/* Ovdje kasnije ide wheel, dugmad, itd. */}
      </Flex>
    </Box>
  );
};

export default MobileLayout;
