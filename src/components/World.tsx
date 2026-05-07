import { useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import Island from './Island'
import SkyDome from './SkyDome'
import Character from './Character'
import PulseRing from './PulseRing'
import Particles from './Particles'
import { useWorld } from '@/store/useWorld'

function ClickGround() {
  const [rings, setRings] = useState<{ id: number; pos: THREE.Vector3 }[]>([])

  const handleClick = useCallback((e: any) => {
    e.stopPropagation()
    const point = e.point.clone()

    // Clamp to island radius
    const dist = Math.sqrt(point.x ** 2 + point.z ** 2)
    if (dist > 14) return // Click outside island — ignore

    point.y = 2
    useWorld.getState().setCharacterTarget(point)

    // Spawn a pulse ring
    const id = Date.now()
    setRings((prev) => [...prev.slice(-4), { id, pos: point }])

    // Remove after 1s
    setTimeout(() => {
      setRings((prev) => prev.filter((r) => r.id !== id))
    }, 1000)
  }, [])

  return (
    <>
      {/* Invisible ground collider for raycasting */}
      <mesh
        position={[0, 1.8, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        onClick={handleClick}
        visible={false}
      >
        <circleGeometry args={[15, 32]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Pulse rings */}
      {rings.map((r) => (
        <PulseRing key={r.id} position={r.pos} />
      ))}
    </>
  )
}

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
      <SkyDome />

      {/* Warm golden-hour lighting */}
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
      <directionalLight
        position={[-10, 8, -10]}
        intensity={0.3}
        color="#7B8CDE"
      />

      <Island />
      <Character />
      <ClickGround />
      <Particles />

      <OrbitControls
        enablePan={false}
        minDistance={12}
        maxDistance={40}
        minPolarAngle={Math.PI * 0.15}
        maxPolarAngle={Math.PI * 0.45}
        enableDamping
        dampingFactor={0.05}
        target={[0, 2, 0]}
      />
    </Canvas>
  )
}
