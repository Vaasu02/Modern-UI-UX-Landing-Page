import { stats } from "../constants";
import styles from "../style";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Stats = () => {
  const statsRef = useRef(null);

  useEffect(() => {
    const statsElements = Array.from(statsRef.current.children);
    
    // Animate stats on scroll into view
    gsap.fromTo(statsElements, 
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top center+=100",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Counter animation function
    const animateValue = (element, start, end, duration, prefix = '', suffix = '') => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        element.textContent = `${prefix}${currentValue}${suffix}`;
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    // Setup counter animations
    statsElements.forEach(stat => {
      const valueElement = stat.querySelector('[data-value]');
      if (valueElement) {
        const rawValue = valueElement.getAttribute('data-value');
        const prefix = rawValue.startsWith('$') ? '$' : '';
        const suffix = rawValue.includes('M+') ? 'M+' : '+';
        const endValue = parseInt(rawValue.replace(/[^0-9]/g, ''));
        
        ScrollTrigger.create({
          trigger: stat,
          start: "top center+=100",
          onEnter: () => animateValue(valueElement, 0, endValue, 2000, prefix, suffix),
          once: true
        });
      }
    });

    // Hover animations
    statsElements.forEach(stat => {
      stat.addEventListener('mouseenter', () => {
        gsap.to(stat, {
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      stat.addEventListener('mouseleave', () => {
        gsap.to(stat, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });

    return () => {
      // Cleanup
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      statsElements.forEach(stat => {
        stat.removeEventListener('mouseenter', () => {});
        stat.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);

  return (
    <section ref={statsRef} className={`${styles.flexCenter} flex-row flex-wrap sm:mb-20 mb-6`}>
      {stats.map((stat) => (
        <div 
          key={stat.id} 
          className={`flex-1 flex justify-start items-center flex-row m-3 hover:bg-discount-gradient rounded-[10px] p-4 transition-colors duration-300`}
        >
          <h4 
            data-value={stat.value}
            className="font-poppins font-semibold xs:text-[40.89px] text-[30.89px] xs:leading-[53.16px] leading-[43.16px] text-white"
          >
            {stat.value}
          </h4>
          <p className="font-poppins font-normal xs:text-[20.45px] text-[15.45px] xs:leading-[26.58px] leading-[21.58px] text-gradient uppercase ml-3">
            {stat.title}
          </p>
        </div>
      ))}
    </section>
  );
};

export default Stats;