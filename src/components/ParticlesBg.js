import { useCallback, useMemo } from 'react';
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';

const ParticlesBg = () => {
  const options = useMemo(() => {
    return {
      fullScreen: {
        zIndex: 0,
      },
      interactivity: {
        events: {
          onClick: { enable: true, mode: 'push' },
          onHover: { enable: true, mode: 'repulse' },
        },
        modes: { repulse: { distance: 100 }, push: { quantity: 10 } },
      },
      particles: {
        links: { enable: true, distance: 100 },
        move: { enable: true, speed: { min: 1, max: 3 } },
        size: { value: { min: 1, max: 3 } },
        opacity: { value: { min: 0.1, max: 0.7 } },
      },
    };
  }, []);
  const particlesInit = useCallback((engine) => {
    loadFull(engine);
  }, []);

  return <Particles init={particlesInit} options={options} />;
};

export default ParticlesBg;
