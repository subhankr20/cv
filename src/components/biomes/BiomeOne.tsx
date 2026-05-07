import { ArrowDown } from "lucide-react";
import TiltCard from "../ui/TiltCard";

export default function BiomeOne() {
  return (
    <section className="relative w-[200vw] h-full flex items-center shrink-0 z-10 pointer-events-none">
      <div className="w-screen h-full flex flex-col items-center justify-center pointer-events-auto px-4">
        
        <TiltCard className="flex flex-col items-center">
          <h1 className="font-display text-7xl md:text-9xl text-cream-paper tracking-tighter drop-shadow-lg mb-6 text-center will-change-transform">
            SUBHANKAR<br />PATRA
          </h1>
          
          <p className="font-mono text-lg md:text-xl text-afternoon-gold max-w-2xl text-center mb-12">
            Sales · Marketing · Storytelling
          </p>
        </TiltCard>
        
        <div className="flex flex-col items-center gap-2 mt-12 animate-bounce">
          <span className="font-sans text-sm tracking-widest uppercase text-cream-paper/70">
            Press ↓ to Begin
          </span>
          <ArrowDown className="text-mint-highlight w-6 h-6" />
        </div>
      </div>
      
      <div className="w-screen h-full pointer-events-none" />
    </section>
  );
}
