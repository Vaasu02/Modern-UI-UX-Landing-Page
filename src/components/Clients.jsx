import { clients } from "../constants";
import styles from "../style";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Clients = () => {
  const sectionRef = useRef(null);
  const logosRef = useRef(null);

  useEffect(() => {
    const logos = Array.from(logosRef.current.children);

    // Animate logos on scroll
    gsap.fromTo(logos,
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
          trigger: sectionRef.current,
          start: "top center+=100",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Add hover and click animations for each logo
    logos.forEach(logo => {
      const img = logo.querySelector('img');
      
      // Hover animation
      logo.addEventListener('mouseenter', () => {
        gsap.to(img, {
          scale: 1.2,
          rotate: 5,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      logo.addEventListener('mouseleave', () => {
        gsap.to(img, {
          scale: 1,
          rotate: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      // Click animation
      logo.addEventListener('click', () => {
        gsap.to(img, {
          scale: 0.8,
          duration: 0.1,
          ease: "power2.out",
          yoyo: true,
          repeat: 1
        });

        // Add your click action here (e.g., open link)
        const clientData = clients.find(client => client.logo === img.src.split('/').pop());
        if (clientData?.link) {
          window.open(clientData.link, '_blank');
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      // Clean up event listeners if component unmounts
      logos.forEach(logo => {
        const img = logo.querySelector('img');
        logo.removeEventListener('mouseenter', () => {});
        logo.removeEventListener('mouseleave', () => {});
        logo.removeEventListener('click', () => {});
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className={`${styles.flexCenter} my-4`}>
      <div ref={logosRef} className="flex flex-wrap w-full justify-center items-center gap-6">
        {clients.map((client) => (
          <div 
            key={client.id} 
            className={`flex-1 ${styles.flexCenter} min-w-[120px] max-w-[200px] cursor-pointer filter grayscale hover:grayscale-0 transition-all duration-300`}
          >
            <img 
              src={client.logo} 
              alt="client_logo" 
              className="sm:w-[192px] w-[100px] object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Clients;