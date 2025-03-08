import styles from "../style";
import { logo } from "../assets";
import { footerLinks, socialMedia } from "../constants";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef(null);
  const socialsRef = useRef(null);

  useEffect(() => {
    // Logo animation
    gsap.fromTo(logoRef.current,
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top center+=200",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Links stagger animation
    const linkColumns = Array.from(linksRef.current.children);
    gsap.fromTo(linkColumns,
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: linksRef.current,
          start: "top center+=200",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Social media icons animation with better mobile handling
    const socialIcons = Array.from(socialsRef.current.children);
    gsap.fromTo(socialIcons,
      {
        scale: 0,
        opacity: 0
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: socialsRef.current,
          start: "top bottom",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Hover animations for social media icons with touch support
    socialIcons.forEach(icon => {
      const hoverEffect = () => {
        gsap.to(icon, {
          scale: 1.2,
          rotate: 10,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      const resetEffect = () => {
        gsap.to(icon, {
          scale: 1,
          rotate: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      icon.addEventListener('mouseenter', hoverEffect);
      icon.addEventListener('mouseleave', resetEffect);
      icon.addEventListener('touchstart', hoverEffect, { passive: true });
      icon.addEventListener('touchend', resetEffect);
    });

    // Links hover animation
    const linkItems = document.querySelectorAll('.footer-link');
    linkItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        gsap.to(item, {
          x: 5,
          color: "#5ce1e6",
          duration: 0.3,
          ease: "power2.out"
        });
      });

      item.addEventListener('mouseleave', () => {
        gsap.to(item, {
          x: 0,
          color: "#ffffff99",
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
    <section ref={footerRef} className={`${styles.flexCenter} ${styles.paddingY} flex-col`}>
      <div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full`}>
        <div ref={logoRef} className="flex-[1] flex flex-col justify-start mr-10">
          <img
            src={logo}
            alt="hoobank"
            className="w-[266px] h-[72.14px] object-contain"
          />
          <p className={`${styles.paragraph} mt-4 max-w-[312px]`}>
            A new way to make the payments easy, reliable and secure.
          </p>
        </div>

        <div ref={linksRef} className="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10">
          {footerLinks.map((footerlink) => (
            <div key={footerlink.title} className={`flex flex-col ss:my-0 my-4 min-w-[150px]`}>
              <h4 className="font-poppins font-medium text-[18px] leading-[27px] text-white">
                {footerlink.title}
              </h4>
              <ul className="list-none mt-4">
                {footerlink.links.map((link, index) => (
                  <li
                    key={link.name}
                    className={`footer-link font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-secondary cursor-pointer ${
                      index !== footerlink.links.length - 1 ? "mb-4" : "mb-0"
                    }`}
                    onClick={() => window.open(link.link)}
                  >
                    {link.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
        <p className="font-poppins font-normal text-center text-[18px] leading-[27px] text-white">
          Copyright Ⓒ 2025 HooBank. All Rights Reserved.
        </p>

        <div ref={socialsRef} className="flex flex-row md:mt-0 mt-6 gap-6">
          {socialMedia.map((social) => (
            <img
              key={social.id}
              src={social.icon}
              alt={social.id}
              className="w-[21px] h-[21px] object-contain cursor-pointer transform-gpu hover:scale-125 transition-transform duration-300"
              onClick={() => window.open(social.link)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Footer;