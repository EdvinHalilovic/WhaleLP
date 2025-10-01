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
        gap: 'clamp(0.75rem, 2vh, 1.5rem)', // razmak fleksibilan
        width: '100%',
      }}
    >
      {/* Whale logo */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 'clamp(8px, 2vh, 24px)', // manji top margin
          marginBottom: 'clamp(8px, 2vh, 20px)',
          width: '100%',
        }}
      >
        <WhaleLogo width="clamp(100px, 22vw, 160px)" height="auto" />
      </div>

      {/* Tekst YOU GOT */}
      <div
        style={{
          color: '#FFF',
          textAlign: 'center',
          fontSize: 'clamp(1rem, 2.5vw, 1.8rem)', // 16px → 28px
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
            width: 'clamp(200px, 75%, 420px)',
            maxWidth: '90vw',
            aspectRatio: '43 / 8',
            backgroundImage: `url(${splash})`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 0.5rem',
          }}
        >
          <span
            style={{
              width: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              color: '#FFF',
              textAlign: 'center',
              textShadow: '0 5px 5px rgba(0, 0, 0, 0.25)',
              fontFamily: 'Jost, sans-serif',
              fontSize: 'clamp(0.9rem, 3.5vw, 1.6rem)', // 14px → 26px
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
