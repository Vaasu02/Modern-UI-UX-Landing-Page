import { quotes } from "../assets";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const FeedbackCard = ({ content, name, title, img }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    let bounds;

    const rotateToMouse = (e) => {
      bounds = card.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const leftX = mouseX - bounds.x;
      const topY = mouseY - bounds.y;
      const center = {
        x: leftX - bounds.width / 2,
        y: topY - bounds.height / 2
      };
      const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

      gsap.to(card, {
        duration: 0.5,
        rotationX: -center.y / 10,
        rotationY: center.x / 10,
        scale: 1.05,
        ease: "power3.out"
      });
    };

    const resetRotation = () => {
      gsap.to(card, {
        duration: 0.5,
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        ease: "power3.out"
      });
    };

    // Add hover effect
    card.addEventListener("mousemove", rotateToMouse);
    card.addEventListener("mouseleave", resetRotation);
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    return () => {
      card.removeEventListener("mousemove", rotateToMouse);
      card.removeEventListener("mouseleave", resetRotation);
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className="flex justify-between flex-col px-10 py-12 rounded-[20px] max-w-[370px] feedback-card cursor-pointer transform-gpu border border-[#3F3E45] hover:border-[#5ce1e6] transition-colors duration-300"
      style={{ transformStyle: "preserve-3d" }}
    >
      <img src={quotes} alt="double_quotes" className="w-[42.6px] h-[27.6px] object-contain" />
      <p className="font-poppins font-normal text-[18px] leading-[32.4px] text-white my-10">
        {content}
      </p>

      <div className="flex flex-row">
        <img src={img} alt={name} className="w-[48px] h-[48px] rounded-full" />
        <div className="flex flex-col ml-4">
          <h4 className="font-poppins font-semibold text-[20px] leading-[32px] text-white">
            {name}
          </h4>
          <p className="font-poppins font-normal text-[16px] leading-[24px] text-dimWhite">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard;