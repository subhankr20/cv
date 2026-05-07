import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Howl } from "howler";

export default function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    soundRef.current = new Howl({
      src: ["https://actions.google.com/sounds/v1/water/rain_on_roof.ogg"],
      loop: true,
      volume: 0.15,
      html5: true,
    });

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (isPlaying) {
          soundRef.current?.pause();
        }
      } else {
        if (isPlaying) {
          soundRef.current?.play();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      soundRef.current?.unload();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (!soundRef.current) return;

    if (isPlaying) {
      soundRef.current.pause();
    } else {
      soundRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={togglePlay}
      className="fixed top-6 right-6 z-50 p-3 rounded-full bg-midnight-ink/50 backdrop-blur-md border border-cream-paper/10 text-cream-paper hover:bg-midnight-ink hover:scale-110 transition-all duration-300"
      aria-label={isPlaying ? "Mute sound" : "Play sound"}
    >
      {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
    </button>
  );
}
