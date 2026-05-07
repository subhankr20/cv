import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import gsap from "gsap";

const TiltCard = forwardRef<HTMLDivElement, { children: React.ReactNode, className?: string }>(
  ({ children, className }, ref) => {
    const internalRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => internalRef.current!);

    useEffect(() => {
      const card = internalRef.current;
      if (!card) return;

      const onMouseMove = (e: MouseEvent) => {
        const { left, top, width, height } = card.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        
        const xPercent = (x / width - 0.5) * 15; // 15 degree max tilt
        const yPercent = (y / height - 0.5) * -15;

        gsap.to(card, {
          rotateY: xPercent,
          rotateX: yPercent,
          duration: 0.5,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      };

      const onMouseLeave = () => {
        gsap.to(card, {
          rotateY: 0,
          rotateX: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      };

      card.addEventListener("mousemove", onMouseMove);
      card.addEventListener("mouseleave", onMouseLeave);

      return () => {
        card.removeEventListener("mousemove", onMouseMove);
        card.removeEventListener("mouseleave", onMouseLeave);
      };
    }, []);

    return (
      <div ref={internalRef} className={className} style={{ transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    );
  }
);

TiltCard.displayName = "TiltCard";

export default TiltCard;
