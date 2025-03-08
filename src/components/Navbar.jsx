import React, { useState, useEffect, useRef } from "react";
import { navLinks } from "../constants";
import { close, logo, menu } from "../assets";
import gsap from "gsap";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const navRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const navItems = navRef.current.querySelectorAll('.nav-link');

    navItems.forEach(item => {
      // Hover effect
      item.addEventListener('mouseenter', () => {
        gsap.to(item, {
          y: -3,
          duration: 0.2,
          ease: "power2.out"
        });

        // Create highlight effect
        gsap.to(item, {
          color: "#5ce1e6",
          textShadow: "0 0 8px rgba(92, 225, 230, 0.3)",
          duration: 0.2
        });
      });

      item.addEventListener('mouseleave', () => {
        if (item.textContent !== active) {
          gsap.to(item, {
            y: 0,
            color: "white",
            textShadow: "none",
            duration: 0.2,
            ease: "power2.out"
          });
        }
      });

      // Click effect
      item.addEventListener('click', () => {
        gsap.to(item, {
          scale: 0.95,
          duration: 0.1,
          ease: "power2.out",
          yoyo: true,
          repeat: 1
        });
      });
    });

    // Mobile menu animation
    if (menuRef.current && toggle) {
      gsap.fromTo(menuRef.current,
        {
          opacity: 0,
          y: -20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        }
      );
    }
  }, [toggle, active]);

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar relative z-[20]">
      <img src={logo} alt="hoobank" className="w-[124px] h-[32px]" />

      <ul ref={navRef} className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`nav-link font-poppins font-normal cursor-pointer text-[16px] ${
              active === nav.title ? "text-[#5ce1e6]" : "text-white"
            } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
            onClick={() => setActive(nav.title)}
          >
            <a href={`#${nav.id}`}>{nav.title}</a>
          </li>
        ))}
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain cursor-pointer"
          onClick={() => setToggle(!toggle)}
        />

        <div
          ref={menuRef}
          className={`${
            toggle ? "flex" : "hidden"
          } p-6 bg-black-gradient absolute top-[4.5rem] right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar z-[5]`}
        >
          <ul className="list-none flex flex-col justify-end items-start flex-1">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`nav-link font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? "text-[#5ce1e6]" : "text-white"
                } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => {
                  setActive(nav.title);
                  setToggle(false);
                }}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
