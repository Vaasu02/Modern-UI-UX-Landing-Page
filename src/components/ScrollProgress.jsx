import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollProgress = () => {
  const progressRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const progressBar = progressRef.current;
    const wrapper = wrapperRef.current;

    // Create scroll-linked animation
    gsap.to(progressBar, {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
        onUpdate: (self) => {
          // Update wrapper opacity based on scroll
          gsap.to(wrapper, {
            opacity: self.progress > 0 ? 1 : 0,
            duration: 0.3
          });
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div 
      ref={wrapperRef}
      className="fixed top-0 left-0 w-full h-1 bg-[#1a1a1a] z-50 opacity-0"
    >
      <div 
        ref={progressRef}
        className="h-full w-0 bg-gradient-to-r from-[#33bbcf] to-[#def9fa]"
      />
    </div>
  );
};

export default ScrollProgress; 