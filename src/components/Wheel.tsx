import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@chakra-ui/react';

const sectors = [
  { color: '#f82', label: '$1000' },
  { color: '#0bf', label: '$500' },
  { color: '#fb0', label: '$200' },
  { color: '#0fb', label: '$50' },
  { color: '#b0f', label: '$100' },
  { color: '#f0b', label: '$5' },
  { color: '#bf0', label: 'LOSE' },
  { color: '#0ff', label: 'NOTHING' },
];

const Wheel: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [winner, setWinner] = useState<string | null>(null);
  const [angVel, setAngVel] = useState(0);
  const [ang, setAng] = useState(0);

  const tot = sectors.length;
  const PI = Math.PI;
  const TAU = 2 * PI;
  const arc = TAU / tot;
  const friction = 0.991;

  const getIndex = () => Math.floor(tot - (ang / TAU) * tot) % tot;

  const drawSector = (
    ctx: CanvasRenderingContext2D,
    sector: any,
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
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText(sector.label, rad - 10, 10);
    ctx.restore();
  };

  const rotate = (ctx: CanvasRenderingContext2D) => {
    const idx = getIndex();
    const sector = sectors[idx];

    if (!sector) return;

    ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`;

    if (!angVel) {
      setWinner(sector.label);
    }
  };

  const frame = (ctx: CanvasRenderingContext2D) => {
    if (!angVel) return;
    let newVel = angVel * friction;
    if (newVel < 0.002) newVel = 0;
    setAng((prev) => (prev + newVel) % TAU);
    setAngVel(newVel);
    rotate(ctx);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dia = canvas.width;
    const rad = dia / 2;

    sectors.forEach((sector, i) => drawSector(ctx, sector, i, rad));

    const engine = () => {
      frame(ctx);
      requestAnimationFrame(engine);
    };
    engine();
  }, [angVel]);

  const spin = () => {
    if (!angVel) setAngVel(Math.random() * 0.2 + 0.25);
  };

  return (
    <Box
      w="100vw"
      h="100vh"
      bg="pink"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Box position="relative" w={['80vw', '400px']} h={['80vw', '400px']}>
        <canvas
          id="wheel"
          ref={canvasRef}
          width={400}
          height={400}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '8px solid black',
            boxShadow: '0 0 20px rgba(0,0,0,0.5)',
          }}
        />
        <Box
          id="spin"
          onClick={spin}
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          w="30%"
          h="30%"
          bg="purple"
          color="white"
          borderRadius="50%"
          fontWeight="bold"
          cursor="pointer"
          boxShadow="0 0 10px rgba(0,0,0,0.5)"
        >
          SPIN
        </Box>
        <Box
          position="absolute"
          top="-20px"
          left="50%"
          transform="translateX(-50%)"
          w="0"
          h="0"
          borderLeft="20px solid transparent"
          borderRight="20px solid transparent"
          borderBottom="30px solid yellow"
        />
      </Box>

      {winner && (
        <Box mt={6} fontSize={['18px', '22px']} fontWeight="bold" color="white">
          🎉 Osvojio si: {winner}
        </Box>
      )}
    </Box>
  );
};

export default Wheel;
