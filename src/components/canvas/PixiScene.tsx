import { useState, useRef, useEffect, useMemo } from "react";
import { Stage, Container, TilingSprite, Sprite, useTick } from "@pixi/react";

// We use import.meta.env.BASE_URL to ensure assets resolve correctly in GitHub Pages subpath
const BASE_URL = import.meta.env.BASE_URL;

// ParallaxLayers using TilingSprite for infinite seamless scrolling
const PixiParallaxLayers = ({ scrollY, windowWidth }: { scrollY: number, windowWidth: number }) => {
  const biome1End = windowWidth * 2;
  const biome2End = biome1End + windowWidth * 1.5;
  const biome3End = biome2End + windowWidth * 2.0;
  const biome4End = biome3End + windowWidth * 1.5;
  const biome5End = biome4End + windowWidth * 1.5;
  const biome6End = biome5End + windowWidth * 2.0;

  const bgSet = useMemo(() => {
    if (scrollY < biome1End) return "default";
    if (scrollY < biome2End) return "classroom";
    if (scrollY < biome3End) return "door";
    if (scrollY < biome4End) return "catacombs";
    if (scrollY < biome5End) return "studio";
    if (scrollY < biome6End) return "viral";
    return "default";
  }, [scrollY, windowWidth, biome1End, biome2End, biome3End, biome4End, biome5End, biome6End]);

  const layers = useMemo(() => {
    const assets = {
      default: { sky: "sky_layer.png", far: "far_layer.png", mid: "mid_layer.png", near: "near_layer.png", fg: "fg_layer.png" },
      classroom: { sky: "sky_layer.png", far: "classroom_bg.png", mid: "mid_layer.png", near: "near_layer.png", fg: "fg_layer.png" },
      door: { sky: "sky_layer.png", far: "door_bg.png", mid: "mid_layer.png", near: "near_layer.png", fg: "fg_layer.png" },
      catacombs: { sky: "catacombs_bg.png", far: "catacombs_bg.png", mid: "catacombs_bg.png", near: "catacombs_bg.png", fg: "catacombs_bg.png" },
      studio: { sky: "sky_layer.png", far: "studio_bg.png", mid: "mid_layer.png", near: "near_layer.png", fg: "fg_layer.png" },
      viral: { sky: "sky_layer.png", far: "viral_bg.png", mid: "mid_layer.png", near: "near_layer.png", fg: "fg_layer.png" }
    };
    
    const set = assets[bgSet as keyof typeof assets] || assets.default;

    return [
      { depth: 0.05, src: `${BASE_URL}assets/${set.sky}`, yOffset: -200, height: 1024 },
      { depth: 0.2, src: `${BASE_URL}assets/${set.far}`, yOffset: 0, height: 1024 },
      { depth: 0.5, src: `${BASE_URL}assets/${set.mid}`, yOffset: 200, height: 1024 },
      { depth: 1.0, src: `${BASE_URL}assets/${set.near}`, yOffset: 400, height: 1024 },
      { depth: 1.4, src: `${BASE_URL}assets/${set.fg}`, yOffset: 550, height: 1024 },
    ];
  }, [bgSet]);

  return (
    <Container>
      {layers.map((l, i) => (
        <TilingSprite
          key={i}
          image={l.src}
          width={windowWidth}
          height={l.height}
          y={l.yOffset}
          tilePosition={{ x: -scrollY * l.depth, y: 0 }}
        />
      ))}
    </Container>
  );
};

// Character Controller using the generated sprite
const PixiCharacter = ({ vScroll }: { vScroll: number }) => {
  const [y, setY] = useState(500);
  const [scaleX, setScaleX] = useState(0.5); // Scale down the 1024x1024 generation
  const time = useRef(0);

  useTick((delta) => {
    time.current += delta;
    const absVelocity = Math.abs(vScroll);
    
    let state = "idle";
    if (absVelocity > 10) state = "running";
    else if (absVelocity > 0.5) state = "walking";

    // Handle direction facing
    if (vScroll > 0) setScaleX(0.5);
    else if (vScroll < 0) setScaleX(-0.5);

    // Dynamic bobbing based on speed
    switch (state) {
      case "idle": setY(500 + Math.sin(time.current * 0.05) * 5); break;
      case "walking": setY(500 + Math.sin(time.current * 0.2) * 10); break;
      case "running": setY(500 + Math.sin(time.current * 0.4) * 20); break;
    }
  });

  return (
    <Sprite
      image={`${BASE_URL}assets/character.png`}
      x={250}
      y={y}
      anchor={0.5} // Center the anchor so scaling X to -1 flips cleanly
      scale={{ x: scaleX, y: 0.5 }}
    />
  );
};

// Main Scene Coordinator
const SceneCoordinator = ({ windowWidth }: { windowWidth: number }) => {
  const [scrollY, setScrollY] = useState(0);
  const [vScroll, setVScroll] = useState(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    setScrollY(window.scrollY);
  }, []);

  useTick(() => {
    const currentScroll = window.scrollY;
    setVScroll(currentScroll - lastScrollY.current);
    setScrollY(currentScroll);
    lastScrollY.current = currentScroll;
  });

  return (
    <Container>
      <PixiParallaxLayers scrollY={scrollY} windowWidth={windowWidth} />
      <PixiCharacter vScroll={vScroll} />
    </Container>
  );
};

export default function PixiScene() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
      <Stage
        width={dimensions.width}
        height={dimensions.height}
        options={{ 
          backgroundAlpha: 0, 
          resolution: window.devicePixelRatio || 1, 
          autoDensity: true 
        }}
      >
        <SceneCoordinator windowWidth={dimensions.width} />
      </Stage>
    </div>
  );
}
