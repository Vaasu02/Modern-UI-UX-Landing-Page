import styles from "../style";
import { discount, robot } from "../assets";
import GetStarted from "./GetStarted";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParticlesBackground from "./ParticlesBackground";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const robotRef = useRef(null);
  const textRef = useRef(null);
  const discountRef = useRef(null);
  const robotWrapperRef = useRef(null);

  useEffect(() => {
    // Initial robot reveal animation
    gsap.fromTo(robotRef.current,
      {
        opacity: 0,
        scale: 0.8,
        filter: 'blur(15px)',
      },
      {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.5,
        ease: "power3.out",
      }
    );

    // Floating animation for robot (starts after reveal)
    gsap.to(robotRef.current, {
      y: 15,
      duration: 2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      delay: 1.5 // Start after reveal animation
    });

    // Gradient animation
    gsap.to([".pink__gradient", ".white__gradient", ".blue__gradient"], {
      opacity: 1,
      duration: 2,
      ease: "power2.inOut",
      stagger: 0.3
    });

    // Rest of your existing animations...
    const textElements = textRef.current.children;
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
        ease: "power2.out"
      }
    );

    gsap.fromTo(discountRef.current,
      {
        opacity: 0,
        y: -20
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5
      }
    );
  }, []);

  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY} relative`}>
      <ParticlesBackground />
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
        <div ref={discountRef} className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2">
          <img src={discount} alt="discount" className="w-[32px] h-[32px]" />
          <p className={`${styles.paragraph} ml-2`}>
            <span className="text-white">20%</span> Discount For{" "}
            <span className="text-white">1 Month</span> Account
          </p>
        </div>

        <div ref={textRef} className="flex flex-col w-full">
          <div className="flex justify-between items-start">
            <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
              The Next <br className="sm:block hidden" />{" "}
              <span className="text-gradient">Generation</span>{" "}
            </h1>
            <div className="ss:flex hidden md:mr-4 mr-0 md:mt-10">
              <GetStarted />
            </div>
          </div>
          
          <h1 className="font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
            Payment Method.
          </h1>
          
          <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
            Our team of experts uses a methodology to identify the credit cards
            most likely to fit your needs. We examine annual percentage rates,
            annual fees.
          </p>
        </div>
      </div>

      <div ref={robotWrapperRef} className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
        <img 
          ref={robotRef} 
          src={robot} 
          alt="billing" 
          className="w-[100%] h-[100%] relative z-[5] transform-gpu" 
        />

        {/* gradient start */}
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient opacity-0" />
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40 opacity-0" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient opacity-0" />
        {/* gradient end */}
      </div>

      <div className={`ss:hidden ${styles.flexCenter}`}>
        <GetStarted />
      </div>
    </section>
  );
};

export default Hero;