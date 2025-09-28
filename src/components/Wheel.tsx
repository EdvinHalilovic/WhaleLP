import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Text,
} from '@chakra-ui/react';

const sectors = [
  { color: '#f82', label: '$1000' },
  { color: '#0bf', label: '$500' },
  { color: '#fb0', label: '$200' },
  { color: '#0fb', label: '$50' },
  { color: '#b0f', label: '$1' },
  { color: '#f0b', label: 'NOTHING' },
  { color: '#bf0', label: 'LOSE' },
];

const Wheel: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [winner, setWinner] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const tot = sectors.length;
  const PI = Math.PI;
  const TAU = 2 * PI;
  const arc = TAU / sectors.length;
  let angVel = 0; // Angular velocity
  let ang = 0; // Angle in radians
  const friction = 0.991;

  const rand = (m: number, M: number) => Math.random() * (M - m) + m;
  const getIndex = () => Math.floor(tot - (ang / TAU) * tot) % tot;

  function drawSector(
    ctx: CanvasRenderingContext2D,
    sector: any,
    i: number,
    rad: number
  ) {
    const ang = arc * i;
    ctx.save();
    // COLOR
    ctx.beginPath();
    ctx.fillStyle = sector.color;
    ctx.moveTo(rad, rad);
    ctx.arc(rad, rad, rad, ang, ang + arc);
    ctx.lineTo(rad, rad);
    ctx.fill();
    // TEXT
    ctx.translate(rad, rad);
    ctx.rotate(ang + arc / 2);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText(sector.label, rad - 10, 10);
    ctx.restore();
  }

  function rotate(ctx: CanvasRenderingContext2D) {
    ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`;
  }

  function frame(ctx: CanvasRenderingContext2D) {
    if (!angVel) return;
    angVel *= friction;
    if (angVel < 0.002) {
      angVel = 0;
      const sector = sectors[getIndex()] ?? { color: 'gray', label: 'NOTHING' }; // ✅ fallback
      setWinner(sector.label);
      onOpen();
    }
    ang += angVel;
    ang %= TAU;
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

    const rad = canvas.width / 2;
    sectors.forEach((sector, i) => drawSector(ctx, sector, i, rad));
    rotate(ctx);
    engine(ctx);
  }, []);

  const spin = () => {
    if (!angVel) angVel = rand(0.25, 0.45);
  };

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#ffb6c1',
      }}
    >
      <div style={{ position: 'relative' }}>
        {/* Wheel */}
        <canvas
          id="wheel"
          ref={canvasRef}
          width={window.innerWidth < 500 ? 250 : 400}
          height={window.innerWidth < 500 ? 250 : 400}
          style={{ borderRadius: '50%', border: '5px solid black' }}
        />

        {/* Spin Button */}
        <Button
          id="spin"
          onClick={spin}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            width: '80px',
            height: '80px',
            background: 'purple',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          SPIN
        </Button>

        {/* Pointer */}
        <div
          style={{
            position: 'absolute',
            top: '-20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '15px solid transparent',
            borderRight: '15px solid transparent',
            borderBottom: '30px solid yellow',
          }}
        />
      </div>

      {/* Modal */}
      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="rgba(0,0,0,0.7)" />
        <ModalContent
          bgGradient="linear(to-br, pink.300, purple.400)"
          color="white"
          borderRadius="2xl"
          boxShadow="2xl"
          textAlign="center"
          p={6}
        >
          <ModalHeader fontSize="2xl" fontWeight="extrabold">
            🎉 Congratulations!
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <Text fontSize="3xl" fontWeight="bold" mb={4}>
              {winner}
            </Text>
            <Button
              colorScheme="pink"
              size="lg"
              w="full"
              borderRadius="full"
              onClick={onClose}
            >
              Close
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Wheel;
