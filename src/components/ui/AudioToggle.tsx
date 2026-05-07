import { Volume2, VolumeX } from "lucide-react";
import { useSound } from "../audio/SoundManager";

export default function AudioToggle() {
  const { isPlaying, setIsPlaying } = useSound();

  return (
    <button
      onClick={() => setIsPlaying(!isPlaying)}
      className="fixed top-6 right-6 z-50 p-3 rounded-full bg-midnight-ink/50 backdrop-blur-md border border-cream-paper/10 text-cream-paper hover:bg-midnight-ink hover:scale-110 transition-all duration-300 shadow-xl"
      aria-label={isPlaying ? "Mute sound" : "Play sound"}
    >
      {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
    </button>
  );
}
