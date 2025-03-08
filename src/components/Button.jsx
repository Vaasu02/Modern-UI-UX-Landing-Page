import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Button = ({ styles }) => {
  const buttonRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    const text = textRef.current;

    const handleMouseEnter = () => {
      // Button scale and shadow effect
      gsap.to(button, {
        scale: 1.05,
        boxShadow: '0 0 15px rgba(51, 187, 207, 0.3)',
        duration: 0.3,
        ease: "power2.out"
      });

      // Text bounce effect
      gsap.to(text, {
        y: -2,
        duration: 0.2,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      // Reset button scale and shadow
      gsap.to(button, {
        scale: 1,
        boxShadow: 'none',
        duration: 0.3,
        ease: "power2.out"
      });

      // Reset text position
      gsap.to(text, {
        y: 0,
        duration: 0.2,
        ease: "power2.out"
      });
    };

    const handleClick = () => {
      // Click animation
      gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
      });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);
    button.addEventListener('click', handleClick);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
      button.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      type="button"
      className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none transform-gpu transition-transform ${styles}`}
    >
      <span ref={textRef} className="block">
        Get Started
      </span>
    </button>
  );
};

export default Button;