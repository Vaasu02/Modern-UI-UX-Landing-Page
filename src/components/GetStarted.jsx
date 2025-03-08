import React, { useEffect, useRef } from 'react'
import styles from '../style'
import { arrowUp } from '../assets'
import gsap from 'gsap'

const GetStarted = () => {
  const buttonRef = useRef(null);
  const arrowRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    const arrow = arrowRef.current;
    let arrowAnimation;
    
    const handleHover = () => {
      // Kill any existing animations
      gsap.killTweensOf([button, arrow]);

      // Scale and glow animation
      gsap.to(button, {
        scale: 1.1,
        boxShadow: '0 0 20px rgba(51, 187, 207, 0.7), 0 0 40px rgba(51, 187, 207, 0.3)',
        duration: 0.3,
        ease: "power2.out"
      });

      // Arrow bounce animation
      arrowAnimation = gsap.to(arrow, {
        y: -6,
        duration: 0.6,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1
      });
    };

    const handleHoverOut = () => {
      // Kill any existing animations
      gsap.killTweensOf([button, arrow]);
      if (arrowAnimation) arrowAnimation.kill();

      // Reset animations
      gsap.to(button, {
        scale: 1,
        boxShadow: 'none',
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(arrow, {
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    if (button && arrow) {
      button.addEventListener('mouseenter', handleHover);
      button.addEventListener('mouseleave', handleHoverOut);

      return () => {
        button.removeEventListener('mouseenter', handleHover);
        button.removeEventListener('mouseleave', handleHoverOut);
        gsap.killTweensOf([button, arrow]);
        if (arrowAnimation) arrowAnimation.kill();
      };
    }
  }, []);

  return (
    <div 
      ref={buttonRef} 
      className={`${styles.flexCenter} w-[140px] h-[140px] rounded-full bg-blue-gradient p-[2px] cursor-pointer`}
      style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
    >
      <div className={`${styles.flexCenter} flex-col bg-primary w-[100%] h-[100%] rounded-full`}>
        <div className={`${styles.flexStart} flex-row`}>
          <p className='font-poppins font-medium text-[18px] leading-[23px] mr-2'>
            <span className='text-gradient'>Get</span>
          </p>
          <img 
            ref={arrowRef}
            src={arrowUp} 
            alt='arrow' 
            className='w-[23px] h-[23px] object-contain'
          />
        </div>
        <p className='font-poppins font-medium text-[18px] leading-[23px]'>
          <span className='text-gradient'>Started</span>
        </p>
      </div>
    </div>
  )
}

export default GetStarted