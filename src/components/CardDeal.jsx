import { card } from "../assets";
import styles, { layout } from "../style";
import Button from "./Button";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CardDeal = () => {
  const cardRef = useRef(null);
  const contentRef = useRef(null);
  const floatingElementsRef = useRef(null);

  useEffect(() => {
    // Card 3D rotation effect
    const card = cardRef.current;
    
    const handleMouseMove = (e) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      gsap.to(card, {
        rotateY: x * 20,
        rotateX: -y * 20,
        duration: 0.5,
        ease: "power2.out",
        transformPerspective: 1000,
        transformStyle: "preserve-3d"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    // Add floating elements
    const createFloatingElements = () => {
      const elements = [];
      for (let i = 0; i < 5; i++) {
        const element = document.createElement('div');
        element.className = 'absolute w-2 h-2 bg-blue-gradient rounded-full';
        floatingElementsRef.current.appendChild(element);
        elements.push(element);

        // Random position around the card
        gsap.set(element, {
          x: gsap.utils.random(-100, 100),
          y: gsap.utils.random(-100, 100),
          scale: gsap.utils.random(0.5, 1.5),
          opacity: gsap.utils.random(0.3, 0.7)
        });

        // Floating animation
        gsap.to(element, {
          x: `+=${gsap.utils.random(-50, 50)}`,
          y: `+=${gsap.utils.random(-50, 50)}`,
          duration: gsap.utils.random(2, 4),
          repeat: -1,
          yoyo: true,
          ease: "none"
        });
      }
      return elements;
    };

    // Content animation on scroll
    gsap.fromTo(contentRef.current.children,
      {
        x: -100,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top center+=100",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Card animation on scroll
    gsap.fromTo(cardRef.current,
      {
        y: 100,
        opacity: 0,
        rotateY: 45
      },
      {
        y: 0,
        opacity: 1,
        rotateY: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top center+=100",
          toggleActions: "play none none reverse"
        }
      }
    );

    const floatingElements = createFloatingElements();
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      floatingElements.forEach(element => element.remove());
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className={layout.section}>
      <div ref={contentRef} className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          Find a better card deal <br className="sm:block hidden" /> in few easy
          steps.
        </h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Discover our premium card solutions tailored to your needs. With competitive rates, 
          advanced security features, and worldwide acceptance, our cards make your financial 
          journey smoother and more rewarding.
        </p>

        <Button styles={`mt-10`} />
      </div>

      <div className={layout.sectionImg}>
        <div ref={floatingElementsRef} className="relative w-full h-full">
          <img 
            ref={cardRef}
            src={card} 
            alt="billing" 
            className="w-[100%] h-[100%] relative z-[5] transform-gpu"
          />
        </div>
      </div>
    </section>
  );
};

export default CardDeal;