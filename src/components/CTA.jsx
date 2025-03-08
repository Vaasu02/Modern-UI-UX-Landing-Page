import styles from "../style";
import Button from "./Button";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Initial animation setup
    gsap.set(sectionRef.current, {
      backgroundPosition: "0% 0%",
    });

    // Gradient animation on hover
    sectionRef.current.addEventListener('mouseenter', () => {
      gsap.to(sectionRef.current, {
        backgroundPosition: "100% 100%",
        duration: 1,
        ease: "power2.out"
      });
    });

    sectionRef.current.addEventListener('mouseleave', () => {
      gsap.to(sectionRef.current, {
        backgroundPosition: "0% 0%",
        duration: 1,
        ease: "power2.out"
      });
    });

    // Text and button animation on scroll
    const textElements = textRef.current.children;
    
    gsap.fromTo(textElements,
      {
        x: -50,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center+=100",
          toggleActions: "play none none reverse"
        }
      }
    );

    gsap.fromTo(buttonRef.current,
      {
        scale: 0,
        opacity: 0
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center+=100",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Hover effect for the entire section
    const pulseAnimation = () => {
      gsap.to(sectionRef.current, {
        boxShadow: "0 0 30px rgba(51, 187, 207, 0.3)",
        scale: 1.02,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    const resetPulse = () => {
      gsap.to(sectionRef.current, {
        boxShadow: "none",
        scale: 1,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    sectionRef.current.addEventListener('mouseenter', pulseAnimation);
    sectionRef.current.addEventListener('mouseleave', resetPulse);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (sectionRef.current) {
        sectionRef.current.removeEventListener('mouseenter', pulseAnimation);
        sectionRef.current.removeEventListener('mouseleave', resetPulse);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} 
        sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow
        transition-all duration-300 hover:bg-gradient-to-br from-[#33bbcf] to-[#1a1a1a]
        cursor-pointer transform-gpu`}
    >
      <div ref={textRef} className="flex-1 flex flex-col">
        <h2 className={styles.heading2}>Let's try our service now!</h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Everything you need to accept card payments and grow your business
          anywhere on the planet.
        </p>
      </div>

      <div ref={buttonRef} className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
        <Button />
      </div>
    </section>
  );
};

export default CTA;