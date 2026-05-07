import ScrollScene from "@/components/scroll/ScrollScene";
import BiomeOne from "@/components/biomes/BiomeOne";
import BiomeTwo from "@/components/biomes/BiomeTwo";
import BiomeThree from "@/components/biomes/BiomeThree";
import BiomeFour from "@/components/biomes/BiomeFour";
import BiomeFive from "@/components/biomes/BiomeFive";
import BiomeSix from "@/components/biomes/BiomeSix";
import BiomeSeven from "@/components/biomes/BiomeSeven";
import AudioToggle from "@/components/ui/AudioToggle";
import PixiScene from "@/components/canvas/PixiScene";
import LenisProvider from "@/components/scroll/LenisProvider";

function App() {
  return (
    <LenisProvider>
      <main className="relative w-full">
        <div className="noise-overlay" />
        <AudioToggle />
        <PixiScene />
        <ScrollScene>
          <BiomeOne />
          <BiomeTwo />
          <BiomeThree />
          <BiomeFour />
          <BiomeFive />
          <BiomeSix />
          <BiomeSeven />
        </ScrollScene>
      </main>
    </LenisProvider>
  );
}

export default App;
