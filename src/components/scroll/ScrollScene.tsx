import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ScrollContext } from "./ScrollContext";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollScene({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [tween, setTween] = useState<gsap.core.Tween | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    if (!container || !wrapper) return;

    const getScrollAmount = () => {
      const scrollWidth = container.scrollWidth;
      return -(scrollWidth - window.innerWidth);
    };

    const ctx = gsap.context(() => {
      const horizontalTween = gsap.to(container, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => `+=${getScrollAmount() * -1}`,
          pin: true,
          scrub: 0,
          invalidateOnRefresh: true,
        }
      });
      setTween(horizontalTween);
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={wrapperRef} className="scroll-trigger-wrapper overflow-hidden w-full h-screen relative bg-transparent z-10 pointer-events-none">
      <div 
        ref={containerRef} 
        className="flex h-full w-[max-content] will-change-transform"
      >
        <ScrollContext.Provider value={tween}>
          {children}
        </ScrollContext.Provider>
      </div>
    </div>
  );
}
