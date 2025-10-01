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
  { label: 'FREE SPINS', color: '#FFAAE5' },
  { label: 'TRY AGAIN', color: '#F027C8' },
  { label: 'FREE SPINS', color: '#F5D4EB' },
  { label: 'TRY AGAIN', color: '#E000B4' },
  { label: 'FREE SPINS', color: '#FFAAE5' },
  { label: 'TRY AGAIN', color: '#F027C8' },
];

const Wheel: React.FC<WheelProps> = ({ spinsLeft, setSpinsLeft }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [angle, setAngle] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinCount, setSpinCount] = useState(0);
  const [claimed, setClaimed] = useState(false);

  const sliceAngle = (2 * Math.PI) / sectors.length;

  // crtanje kola
  const drawWheel = (rotation: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width;
    const radius = size / 2;
    const centerX = size / 2;
    const centerY = size / 2;

    ctx.clearRect(0, 0, size, size);

    sectors.forEach((sector, i) => {
      const startAngle = i * sliceAngle + rotation;
      const endAngle = startAngle + sliceAngle;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = sector.color;
      ctx.fill();

      ctx.save();
      ctx.translate(centerX, centerY);

      const angleRad = startAngle + sliceAngle / 2;
      const textRadius = radius - size / 4.5;
      const x = Math.cos(angleRad) * textRadius;
      const y = Math.sin(angleRad) * textRadius;

      ctx.textAlign = 'center';
      ctx.fillStyle = '#FFF';
      const fontSize = size / 22;
      ctx.font = `800 ${fontSize}px Jost`;

      if (sector.label === 'TRY AGAIN') {
        ctx.fillText('TRY', x, y - fontSize / 2);
        ctx.fillText('AGAIN', x, y + fontSize / 1.2);
      } else {
        ctx.fillText('FREE', x, y - fontSize / 2);
        ctx.fillText('SPINS', x, y + fontSize / 1.2);
      }

      ctx.restore();
    });
  };

  useEffect(() => {
    drawWheel(angle);
  }, [angle]);

  const spin = () => {
    if (spinsLeft <= 0 || isSpinning) return;

    setIsSpinning(true);

    const nextSpinCount = spinCount + 1;
    setSpinCount(nextSpinCount);

    let rotation = angle;
    let frames = 0;

    let targetIndex = nextSpinCount === 1 ? 1 : 0;
    let targetAngle = targetIndex * sliceAngle;

    if (nextSpinCount === 1) {
      targetAngle += sliceAngle / 6;
    }

    const pointerOffset = -Math.PI / 2;
    const extraSpins = 5 * 2 * Math.PI;
    const finalAngle = extraSpins + pointerOffset - targetAngle;

    const interval = setInterval(() => {
      frames++;
      const progress = frames / 100;
      rotation = angle + finalAngle * Math.sin((progress * Math.PI) / 2);
      setAngle(rotation);

      if (frames >= 100) {
        clearInterval(interval);
        setIsSpinning(false);
        setSpinsLeft((prev) => prev - 1);

        // 🔑 Sada tek ovdje pozivamo modal nakon drugog spina
        if (nextSpinCount === 2) {
          setTimeout(() => {
            onOpen();
          }, 750);
        }
      }
    }, 20);
  };

  return (
    <Box
      position="relative"
      w="100%"
      maxW={['300px', '400px', '500px']}
      aspectRatio="1/1"
      mx="auto"
      mb={['20px', '40px', '60px']}
    >
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
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
          top: '-6%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '12%',
          height: 'auto',
        }}
      />

      {/* Winning Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setClaimed(false);
          onClose();
        }}
        isCentered
      >
        <ModalOverlay bg="rgba(0,0,0,0.7)" />
        <ModalContent
          position="relative"
          w="95%"
          maxW="480px"
          h="auto"
          py={8}
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
            <Text fontSize={['18px', '22px']} fontWeight="bold" mb={2}>
              CONGRATULATIONS YOU WON:
            </Text>
            <Text
              fontSize="clamp(3rem, 7vw, 5rem)"
              fontWeight="extrabold"
              color="pink.200"
              lineHeight="1"
            >
              5
            </Text>
            <Text fontSize={['22px', '32px']} fontWeight="bold" mb={6}>
              FREE SPINS
            </Text>

            {claimed && (
              <Box
                border="2px dashed #FF2AD5"
                borderRadius="12px"
                py={3}
                px={6}
                fontSize="22px"
                fontWeight="bold"
                color="white"
                mb={6}
              >
                "WHALE.IO"
              </Box>
            )}

            {!claimed ? (
              <Button
                bg="pink.500"
                color="white"
                size="lg"
                borderRadius="full"
                px={10}
                onClick={() => setClaimed(true)}
                _hover={{ bg: 'pink.400' }}
              >
                CLAIM PRIZE
              </Button>
            ) : (
              <Button
                bg="pink.400"
                color="white"
                size="lg"
                borderRadius="full"
                px={10}
                onClick={() => {
                  navigator.clipboard.writeText('WHALE.IO');
                  onClose();
                }}
                _hover={{ bg: 'pink.300' }}
              >
                COPY & CLAIM
              </Button>
            )}
          </Box>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Wheel;
