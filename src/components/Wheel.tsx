import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Button,
} from '@chakra-ui/react';

const sectors: { color: string; label: string }[] = [
  { color: '#f82', label: '$1000' },
  { color: '#0bf', label: '$500' },
  { color: '#fb0', label: '$1' },
  { color: '#0fb', label: 'NOTHING' },
  { color: '#b0f', label: '$200' },
  { color: '#f0b', label: '$50' },
  { color: '#bf0', label: '$300' },
  { color: '#aaa', label: 'LOSE' },
];

const PI = Math.PI;
const TAU = 2 * PI;

const Wheel: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [angVel, setAngVel] = useState(0); // angular velocity
  const [angle, setAngle] = useState(0); // current angle
  const [winner, setWinner] = useState<string | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const tot = sectors.length;
  const arc = TAU / tot;
  const friction = 0.991;

  const getIndex = (ang: number) => Math.floor(tot - (ang / TAU) * tot) % tot;

  const drawSector = (
    ctx: CanvasRenderingContext2D,
    sector: { color: string; label: string },
    i: number,
    rad: number
  ) => {
    const ang = arc * i;
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = sector.color;
    ctx.moveTo(rad, rad);
    ctx.arc(rad, rad, rad, ang, ang + arc);
    ctx.lineTo(rad, rad);
    ctx.fill();

    ctx.translate(rad, rad);
    ctx.rotate(ang + arc / 2);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#fff';
    ctx.font = `bold ${rad * 0.08}px sans-serif`;
    ctx.fillText(sector.label, rad - 10, 10);
    ctx.restore();
  };

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dia = canvas.width;
    const rad = dia / 2;
    ctx.clearRect(0, 0, dia, dia);

    sectors.forEach((sector, i) => drawSector(ctx, sector, i, rad));
  };

  useEffect(() => {
    let frame: number;

    const animate = () => {
      if (angVel) {
        const newVel = angVel * friction;
        const newAng = (angle + newVel) % TAU;

        setAngVel(newVel > 0.002 ? newVel : 0);
        setAngle(newAng);

        if (newVel <= 0.002) {
          const idx = getIndex(newAng);
          const sector = sectors[idx];
          if (sector) {
            setWinner(sector.label);
            onOpen(); // otvori popup
          }
        }
      }
      frame = requestAnimationFrame(animate);
    };

    drawWheel();

    if (canvasRef.current) {
      canvasRef.current.style.transform = `rotate(${angle - PI / 2}rad)`;
    }

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [angle, angVel]);

  const spin = () => {
    if (!angVel) {
      setWinner(null);
      setAngVel(Math.random() * 0.3 + 0.25);
    }
  };

  return (
    <Box textAlign="center" p={4}>
      <Box position="relative" display="inline-block">
        {/* Marker */}
        <Box
          position="absolute"
          top="-15px"
          left="50%"
          ml="-12px"
          w="0"
          h="0"
          borderLeft="12px solid transparent"
          borderRight="12px solid transparent"
          borderBottom="25px solid yellow"
          zIndex={2}
        />

        {/* Wheel */}
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          style={{
            width: '80vw',
            maxWidth: '400px',
            height: 'auto',
            borderRadius: '50%',
            border: '6px solid black',
            boxShadow: '0 0 20px rgba(0,0,0,0.5)',
          }}
        />

        {/* Spin button */}
        <Box
          onClick={spin}
          fontWeight="bold"
          fontSize="18px"
          cursor="pointer"
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="absolute"
          top="50%"
          left="50%"
          w="25%"
          h="25%"
          mt="-12.5%"
          ml="-12.5%"
          bg="#673ab7"
          color="#fff"
          borderRadius="50%"
          boxShadow="0 0 0 5px #fff, 0 0px 10px 3px rgba(0,0,0,0.5)"
        >
          SPIN
        </Box>
      </Box>

      {/* Popup za rezultat */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          bgGradient="linear(to-b, pink.400, purple.600)"
          color="white"
          textAlign="center"
          borderRadius="lg"
          p={6}
        >
          <ModalHeader fontSize="2xl" fontWeight="bold">
            🎉 Čestitamo!
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box fontSize="40px" fontWeight="extrabold">
              {winner}
            </Box>
            <Button mt={4} colorScheme="pink" onClick={onClose}>
              Zatvori
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Wheel;
