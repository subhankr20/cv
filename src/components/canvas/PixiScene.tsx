import { useState, useRef, useEffect } from "react";
import { Stage, Container, Graphics, useTick } from "@pixi/react";


// ParallaxLayers converted to a React component
const PixiParallaxLayers = ({ scrollY }: { scrollY: number }) => {
  const depths = [
    { depth: 0.05, color: 0xFF8A5B, height: 600, yOffset: 0 },
    { depth: 0.2, color: 0xFFD56B, height: 400, yOffset: 200 },
    { depth: 0.5, color: 0x2D6A8F, height: 300, yOffset: 350 },
    { depth: 1.0, color: 0x0F1B2D, height: 500, yOffset: 500 },
    { depth: 1.4, color: 0x1A1A1A, height: 300, yOffset: 650 },
  ];

  return (
    <Container>
      {depths.map((d, i) => (
        <Graphics
          key={i}
          x={-scrollY * d.depth}
          y={d.yOffset}
          draw={(g) => {
            g.clear();
            g.beginFill(d.color);
            g.drawRect(0, 0, 20000, d.height);
            g.endFill();
          }}
        />
      ))}
    </Container>
  );
};

// Character Controller converted to React component
const PixiCharacter = ({ vScroll }: { vScroll: number }) => {
  const [y, setY] = useState(500);
  const [scaleX, setScaleX] = useState(1);
  const time = useRef(0);

  useTick((delta) => {
    time.current += delta;
    const absVelocity = Math.abs(vScroll);
    
    let state = "idle";
    if (absVelocity > 10) state = "running";
    else if (absVelocity > 0.5) state = "walking";

    if (vScroll > 0) setScaleX(1);
    else if (vScroll < 0) setScaleX(-1);

    switch (state) {
      case "idle": setY(500 + Math.sin(time.current * 0.05) * 5); break;
      case "walking": setY(500 + Math.sin(time.current * 0.2) * 10); break;
      case "running": setY(500 + Math.sin(time.current * 0.4) * 15); break;
    }
  });

  return (
    <Graphics
      x={200}
      y={y}
      scale={[scaleX, 1]}
      draw={(g) => {
        g.clear();
        g.beginFill(0xE63946);
        g.drawRect(-30, -60, 60, 60);
        g.endFill();
      }}
    />
  );
};

// Main Scene Coordinator
const SceneCoordinator = () => {
  const [scrollY, setScrollY] = useState(0);
  const [vScroll, setVScroll] = useState(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Initial sync
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
      <PixiParallaxLayers scrollY={scrollY} />
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
        <SceneCoordinator />
      </Stage>
    </div>
  );
}
