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
        gap: '24px', // razmak između WhaleLogo, YOU GOT i splash
      }}
    >
      <WhaleLogo />

      <div
        style={{
          color: '#FFF',
          textAlign: 'center',
          fontSize: '32px',
          fontWeight: 800,
        }}
      >
        YOU GOT
      </div>

      {/* Splash wraper */}
      <div
        style={{
          width: '100%', // zauzme širinu parenta
          display: 'flex',
          justifyContent: 'center', // centriraj splash unutra
        }}
      >
        {/* Splash dugme */}
        <div
          style={{
            width: '430px', // 👉 kontrolišeš koliko zauzima (probaj 70%, 80%, 90%)
            maxWidth: '1000px', // da ne ide preko ekrana
            aspectRatio: '43 / 8', // čuva proporciju splash-a
            backgroundImage: `url(${splash})`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80px',
          }}
        >
          <span
            style={{
              maxWidth: '80%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',

              color: '#FFF',
              textAlign: 'center',
              textShadow: '0 5px 5px rgba(0, 0, 0, 0.25)',
              fontFamily: 'Jost, sans-serif',
              fontSize: '34.409px',
              fontWeight: 800,
              lineHeight: '41.29px',
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
