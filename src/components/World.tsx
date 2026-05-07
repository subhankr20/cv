import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Island from './Island'
import SkyDome from './SkyDome'

export default function World() {
  return (
    <Canvas
      camera={{
        position: [18, 14, 18],
        fov: 45,
        near: 0.1,
        far: 200,
      }}
      shadows
      gl={{ antialias: true, alpha: false }}
      style={{ width: '100%', height: '100%' }}
    >
      {/* Sunset sky dome */}
      <SkyDome />

      {/* Lighting: warm golden-hour */}
      <ambientLight intensity={0.4} color="#FFD56B" />
      <directionalLight
        position={[15, 20, 10]}
        intensity={1.6}
        color="#FF8A5B"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
      />
      {/* Cool fill from opposite side */}
      <directionalLight
        position={[-10, 8, -10]}
        intensity={0.3}
        color="#7B8CDE"
      />

      {/* Terrain placeholder */}
      <Island />

      {/* Camera controls */}
      <OrbitControls
        enablePan={false}
        minDistance={12}
        maxDistance={40}
        minPolarAngle={Math.PI * 0.15}
        maxPolarAngle={Math.PI * 0.45}
        enableDamping
        dampingFactor={0.05}
        target={[0, 0, 0]}
      />
    </Canvas>
  )
}
