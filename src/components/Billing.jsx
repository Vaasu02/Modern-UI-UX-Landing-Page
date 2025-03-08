import { apple, bill, google } from "../assets";
import styles, { layout } from "../style";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Billing = () => {
  const billRef = useRef(null);
  const contentRef = useRef(null);
  const gradientRef = useRef(null);

  useEffect(() => {
    // Floating animation for bill image
    gsap.to(billRef.current, {
      y: 15,
      duration: 2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1
    });

    // Content animation on scroll
    gsap.fromTo(contentRef.current.children,
      {
        x: 100,
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

    // Parallax effect for gradient
    ScrollTrigger.create({
      trigger: gradientRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        gsap.to(gradientRef.current, {
          y: self.progress * 100,
          duration: 0.5,
          ease: "none"
        });
      }
    });

    // Store buttons hover animations
    const storeButtons = document.querySelectorAll('.store-button');
    
    storeButtons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="product" className={layout.sectionReverse}>
      <div className={layout.sectionImgReverse}>
        <img 
          ref={billRef}
          src={bill} 
          alt="billing" 
          className="w-[100%] h-[100%] relative z-[5]" 
        />

        {/* gradient start */}
        <div ref={gradientRef} className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient" />
        <div ref={gradientRef} className="absolute z-[0] w-[50%] h-[50%] -left-1/2 bottom-0 rounded-full pink__gradient" />
        {/* gradient end */}
      </div>

      <div ref={contentRef} className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          Easily control your <br className="sm:block hidden" /> billing &
          invoicing
        </h2>
        <p className={`${styles.paragraph} max-w-[570px] mt-5`}>
          Experience seamless financial management with our advanced billing system. Track expenses, 
          automate invoicing, and manage subscriptions effortlessly. Our secure platform ensures 
          your transactions are protected 24/7.
        </p>

        <div className="flex flex-row flex-wrap sm:mt-10 mt-6">
          <img 
            src={apple} 
            alt="google_play" 
            className="w-[128.86px] h-[42.05px] object-contain mr-5 cursor-pointer store-button"
          />
          <img 
            src={google} 
            alt="google_play" 
            className="w-[144.17px] h-[43.08px] object-contain cursor-pointer store-button"
          />
        </div>
      </div>
    </section>
  );
};

export default Billing;
