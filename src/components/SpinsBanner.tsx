import React from 'react';
import WhaleLogo from '../logos/WhaleLogo';
import splash from '../logos/splash.png';

interface SpinsBannerProps {
  spinsLeft: number;
}

const SpinsBanner: React.FC<SpinsBannerProps> = ({ spinsLeft }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'clamp(1rem, 3vw, 2rem)', // fleksibilan razmak
        width: '100%',
      }}
    >
      {/* Whale logo */}

      <div
        style={{
          color: '#FFF',
          textAlign: 'center',
          fontSize: 'clamp(16px, 3.5vw, 32px)',
          fontWeight: 800,
          lineHeight: 1.2,
          textShadow: '0 2px 4px rgba(0,0,0,0.3)',
        }}
      >
        YOU GOT
      </div>

      {/* Splash background */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: 'clamp(200px, 80%, 430px)',
            maxWidth: '90vw', // da nikad ne pređe ekran
            aspectRatio: '43 / 8',
            backgroundImage: `url(${splash})`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 10px',
          }}
        >
          <span
            style={{
              width: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap', // ako želiš da puca na malom, promijeni u 'normal'
              color: '#FFF',
              textAlign: 'center',
              textShadow: '0 5px 5px rgba(0, 0, 0, 0.25)',
              fontFamily: 'Jost, sans-serif',
              fontSize: 'clamp(14px, 4vw, 28px)',
              fontWeight: 800,
              lineHeight: 1.2,
              flexShrink: 1,
            }}
          >
            {spinsLeft} SPINS LEFT
          </span>
        </div>
      </div>
    </div>
  );
};

export default SpinsBanner;
