import { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import gsap from 'gsap';

const NewsletterSubscribe = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const formRef = useRef(null);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#33bbcf', '#def9fa', '#ffffff']
      });

      // Success animation
      gsap.to(formRef.current, {
        scale: 1.05,
        duration: 0.2,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
      });

      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="w-full max-w-[300px]">
      <h4 className="font-poppins font-medium text-[18px] leading-[27px] text-white mb-4">
        Newsletter
      </h4>
      {!isSubscribed ? (
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            ref={inputRef}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="px-4 py-2 bg-[#1a1a1a] rounded-[10px] text-white outline-none border border-[#3F3E45] focus:border-[#33bbcf] transition-colors"
            required
          />
          <button
            type="submit"
            className="py-2 px-4 bg-blue-gradient rounded-[10px] font-poppins font-medium text-[16px] text-primary outline-none transform-gpu transition-all duration-300 hover:scale-105 hover:shadow-glow"
          >
            Subscribe
          </button>
        </form>
      ) : (
        <p className="font-poppins text-[16px] text-gradient">
          Thanks for subscribing! 🎉
        </p>
      )}
    </div>
  );
};

export default NewsletterSubscribe; 