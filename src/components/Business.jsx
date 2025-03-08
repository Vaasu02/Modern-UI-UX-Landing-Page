import { features } from "../constants";
import styles, { layout } from "../style";
import Button from "./Button";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FeatureCard = ({ icon, title, content, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const iconElement = card.querySelector('.icon-wrapper');

    // 3D tilt effect
    const handleMouseMove = (e) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      gsap.to(card, {
        rotateY: x * 20, // Rotate based on mouse X position
        rotateX: -y * 20, // Rotate based on mouse Y position
        duration: 0.5,
        ease: "power2.out",
        transformPerspective: 1000,
      });

      // Icon float effect
      gsap.to(iconElement, {
        y: -5,
        x: 5,
        scale: 1.2,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      // Reset card position
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.5,
        ease: "power2.out"
      });

      // Reset icon position
      gsap.to(iconElement, {
        y: 0,
        x: 0,
        scale: 1,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`flex flex-row p-6 rounded-[20px] feature-card cursor-pointer transform-gpu`}
    >
      <div className="icon-wrapper w-[64px] h-[64px] rounded-full bg-dimBlue flex justify-center items-center">
        <img src={icon} alt="icon" className="w-[50%] h-[50%] object-contain" />
      </div>
      <div className="flex-1 flex flex-col ml-3">
        <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23px] mb-1">
          {title}
        </h4>
        <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px] mb-1">
          {content}
        </p>
      </div>
    </div>
  );
};

const Business = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const cards = Array.from(cardsRef.current.children);
    const textElements = textRef.current.children;

    // Text animation from left
    gsap.fromTo(textElements,
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
          trigger: textRef.current,
          start: "top center+=100",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Stagger animate cards on scroll
    gsap.fromTo(cards,
      {
        opacity: 0,
        y: 50,
        rotateX: -15
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center+=100",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="features" ref={sectionRef} className={layout.section}>
      <div className={layout.sectionInfo}>
        <div ref={textRef}>
          <h2 className={styles.heading2}>
            You do the business, <br className="sm:block hidden" /> we'll handle
            the money.
          </h2>
          <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
            With the right credit card, you can improve your financial life by
            building credit, earning rewards and saving money. But with hundreds
            of credit cards on the market.
          </p>
          <Button styles={`mt-10`} />
        </div>
      </div>

      <div ref={cardsRef} className={`${layout.sectionImg} flex-col`}>
        {features.map((feature, index) => (
          <FeatureCard key={feature.id} {...feature} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Business;