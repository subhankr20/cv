import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Howl } from "howler";

interface SoundContextType {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

const SoundContext = createContext<SoundContextType | null>(null);

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) throw new Error("useSound must be used within SoundProvider");
  return context;
};

const SOUNDS = [
  { id: "nature", url: "https://actions.google.com/sounds/v1/water/rain_on_roof.ogg", range: [0, 0.2] },
  { id: "classroom", url: "https://actions.google.com/sounds/v1/foley/pen_writing.ogg", range: [0.2, 0.35] },
  { id: "digital", url: "https://actions.google.com/sounds/v1/scifi/computer_room.ogg", range: [0.5, 0.7] },
  { id: "crowd", url: "https://actions.google.com/sounds/v1/crowds/stadium_cheer.ogg", range: [0.8, 1.0] },
];

export const SoundProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const soundsRef = useRef<{ [key: string]: Howl }>({});

  useEffect(() => {
    SOUNDS.forEach(s => {
      soundsRef.current[s.id] = new Howl({
        src: [s.url],
        loop: true,
        volume: 0,
        html5: true,
      });
    });

    const handleScroll = () => {
      if (!isPlaying) return;

      const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);

      SOUNDS.forEach(s => {
        const howl = soundsRef.current[s.id];
        const [start, end] = s.range;
        
        // Simple linear fade based on range proximity
        let volume = 0;
        const mid = (start + end) / 2;
        const dist = Math.abs(scrollProgress - mid);
        const rangeWidth = (end - start) / 2;

        if (dist < rangeWidth) {
          volume = 1 - (dist / rangeWidth);
        }

        howl.volume(volume * 0.3); // Max volume 0.3
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      Object.values(soundsRef.current).forEach(h => h.unload());
    };
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      Object.values(soundsRef.current).forEach(h => h.play());
    } else {
      Object.values(soundsRef.current).forEach(h => h.pause());
    }
  }, [isPlaying]);

  return (
    <SoundContext.Provider value={{ isPlaying, setIsPlaying }}>
      {children}
    </SoundContext.Provider>
  );
};
