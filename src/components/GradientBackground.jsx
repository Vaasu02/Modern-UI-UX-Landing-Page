import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const GradientBackground = () => {
  const gradientRef = useRef(null);

  useEffect(() => {
    const moveGradient = (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth) * 100;
      const yPos = (clientY / window.innerHeight) * 100;

      gsap.to(gradientRef.current, {
        background: `radial-gradient(circle at ${xPos}% ${yPos}%, rgba(51, 187, 207, 0.1) 0%, rgba(0, 4, 15, 0.1) 100%)`,
        duration: 0.5,
      });
    };

    window.addEventListener('mousemove', moveGradient);

    return () => {
      window.removeEventListener('mousemove', moveGradient);
    };
  }, []);

  return (
    <div
      ref={gradientRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[1]"
    />
  );
};

export default GradientBackground; 