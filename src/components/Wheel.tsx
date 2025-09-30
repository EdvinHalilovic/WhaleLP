import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Button,
  useDisclosure,
  Text,
  Box,
} from '@chakra-ui/react';
import SpinButton from './SpinButton';

interface WheelProps {
  spinsLeft: number;
  setSpinsLeft: React.Dispatch<React.SetStateAction<number>>;
}

const sectors = [
  { label: 'FREE SPINS', gradient: ['#FFAAE5', '#F5D4EB'] },
  { label: 'TRY AGAIN', gradient: ['#F027C8', '#E000B4'] },
  { label: 'FREE SPINS', gradient: ['#FFAAE5', '#F5D4EB'] },
  { label: 'TRY AGAIN', gradient: ['#F027C8', '#E000B4'] },
  { label: 'FREE SPINS', gradient: ['#FFAAE5', '#F5D4EB'] },
  { label: 'TRY AGAIN', gradient: ['#F027C8', '#E000B4'] },
];

const Wheel: React.FC<WheelProps> = ({ spinsLeft, setSpinsLeft }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [winner, setWinner] = useState<string | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSpinning, setIsSpinning] = useState(false);

  const PI = Math.PI;
  const TAU = 2 * PI;
  const arc = TAU / sectors.length;

  const ang = useRef(0);
  const angVel = useRef(0);

  const rand = (m: number, M: number) => Math.random() * (M - m) + m;

  function drawSector(
    ctx: CanvasRenderingContext2D,
    sector: any,
    i: number,
    rad: number
  ) {
    const angSector = arc * i;
    ctx.save();
    ctx.beginPath();

    const gradient = ctx.createLinearGradient(0, 0, 0, rad * 2);
    gradient.addColorStop(0, sector.gradient[0]);
    gradient.addColorStop(1, sector.gradient[1]);
    ctx.fillStyle = gradient;

    ctx.moveTo(rad, rad);
    ctx.arc(rad, rad, rad, angSector, angSector + arc);
    ctx.lineTo(rad, rad);
    ctx.fill();

    // tekst
    ctx.translate(rad, rad);
    ctx.rotate(angSector + arc / 2);
    ctx.textAlign = 'center';

    const fontSize = Math.floor(rad * 0.08);
    ctx.font = `800 ${fontSize}px Jost, sans-serif`;

    if (sector.label === 'TRY AGAIN') {
      // Bijeli tekst
      ctx.fillStyle = '#FFF';
      ctx.fillText(sector.label, rad * 0.65, fontSize / 3);
    } else if (sector.label === 'FREE SPINS') {
      // Gradient tekst (linear-gradient 180deg, #FF2AD5 → #C3009D)
      const textGradient = ctx.createLinearGradient(0, -fontSize, 0, fontSize);
      textGradient.addColorStop(0, '#FF2AD5');
      textGradient.addColorStop(1, '#C3009D');
      ctx.fillStyle = textGradient;
      ctx.fillText(sector.label, rad * 0.65, fontSize / 3);
    }

    ctx.restore();
  }

  function rotate(ctx: CanvasRenderingContext2D) {
    ctx.canvas.style.transform = `rotate(${ang.current - PI / 2}rad)`;
  }

  function frame(ctx: CanvasRenderingContext2D) {
    if (!angVel.current) return;

    ang.current += angVel.current;
    ang.current %= TAU;
    angVel.current *= 0.991;

    if (angVel.current < 0.002) {
      angVel.current = 0;

      let result: string;
      if (spinsLeft === 2) {
        result = 'TRY AGAIN';
      } else {
        result = 'FREE SPINS';
      }

      setWinner(result);
      if (result === 'FREE SPINS') {
        setTimeout(() => onOpen(), 100);
      }
      setSpinsLeft((prev) => prev - 1);
      setIsSpinning(false);
    }
    rotate(ctx);
  }

  function engine(ctx: CanvasRenderingContext2D) {
    frame(ctx);
    requestAnimationFrame(() => engine(ctx));
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // uvijek se prilagodi roditelju
    const resize = () => {
      const size = Math.min(canvas.parentElement!.offsetWidth, 500); // max 500px
      canvas.width = size;
      canvas.height = size;

      const rad = size / 2;
      ctx.clearRect(0, 0, size, size);
      sectors.forEach((sector, i) => drawSector(ctx, sector, i, rad));
      rotate(ctx);
    };

    resize();
    window.addEventListener('resize', resize);
    engine(ctx);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  const spin = () => {
    if (isSpinning || spinsLeft <= 0) return;
    setIsSpinning(true);
    angVel.current = rand(0.25, 0.45);
  };

  return (
    <Box
      position="relative"
      w="100%"
      maxW="500px"
      aspectRatio="1/1"
      mx="auto"
      mb="60px"
    >
      {/* Wheel */}
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
        }}
      />

      {/* Ring overlay */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        w="100%"
        h="100%"
        pointerEvents="none"
      >
        <Box position="relative" w="100%" h="100%">
          <Box
            as="img"
            src="/wheel-ring.svg"
            alt="Wheel Ring"
            w="100%"
            h="100%"
            objectFit="contain"
          />
          <Box
            position="absolute"
            top={0}
            left={0}
            w="100%"
            h="100%"
            bgGradient="linear(180deg, #F027C8 0%, #E000B4 100%)"
            mixBlendMode="color"
            style={{
              WebkitMaskImage: 'url(/wheel-ring.svg)',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskSize: 'contain',
            }}
          />
        </Box>
      </Box>

      {/* Spin Button */}
      <Box
        onClick={spin}
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        cursor="pointer"
      >
        <SpinButton />
      </Box>

      {/* Pointer */}
      <img
        src="/Group.svg"
        alt="pointer"
        style={{
          position: 'absolute',
          top: '-5%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '12%',
          height: 'auto',
        }}
      />

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="rgba(0,0,0,0.7)" />
        <ModalContent
          position="relative"
          w="90%"
          maxW="375px"
          h="auto"
          py={6}
          bg="transparent"
          boxShadow="none"
        >
          <Box
            as="img"
            src="/WinningModal.png"
            alt="Winning Frame"
            position="absolute"
            top="0"
            left="0"
            w="100%"
            h="100%"
            objectFit="contain"
            pointerEvents="none"
          />

          <Box
            position="relative"
            w="100%"
            h="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            color="white"
            px={6}
          >
            <Text fontSize={['16px', '20px']} fontWeight="bold" mb={2}>
              CONGRATULATIONS YOU WON:
            </Text>

            <Text
              fontSize={['40px', '64px']}
              fontWeight="extrabold"
              color="pink.200"
              lineHeight="1"
            >
              {winner === 'FREE SPINS' ? '5' : ''}
            </Text>

            <Text fontSize={['20px', '28px']} fontWeight="bold" mb={6}>
              {winner}
            </Text>

            <Button
              bg="pink.500"
              color="white"
              size="lg"
              borderRadius="full"
              px={10}
              onClick={onClose}
              _hover={{ bg: 'pink.400' }}
            >
              CLAIM PRIZE
            </Button>
          </Box>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Wheel;
