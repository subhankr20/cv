import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useLandmarkProximity } from '@/hooks/useLandmarkProximity'

export default function DirectorsCut({ position }: { position: [number, number, number] }) {
  useLandmarkProximity('directors_cut', position, 4)
  const reelRef = useRef<THREE.Mesh>(null)
  const playheadRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (reelRef.current) reelRef.current.rotation.z = t * 1.5
    if (playheadRef.current) playheadRef.current.position.x = -0.6 + ((t * 0.3) % 1.2)
  })

  return (
    <group position={position} rotation={[0, -Math.PI / 4, 0]}>
      {/* Director's Chair — detailed */}
      <group position={[-1.2, 0, 0]}>
        {/* Front legs (X-cross) */}
        <mesh position={[-0.35, 0.45, 0.35]} rotation={[0.15, 0, 0]} castShadow>
          <boxGeometry args={[0.08, 0.9, 0.08]} />
          <meshToonMaterial color="#8B6B4A" />
        </mesh>
        <mesh position={[0.35, 0.45, 0.35]} rotation={[0.15, 0, 0]} castShadow>
          <boxGeometry args={[0.08, 0.9, 0.08]} />
          <meshToonMaterial color="#8B6B4A" />
        </mesh>
        {/* Back legs */}
        <mesh position={[-0.35, 0.45, -0.35]} rotation={[-0.15, 0, 0]} castShadow>
          <boxGeometry args={[0.08, 0.9, 0.08]} />
          <meshToonMaterial color="#8B6B4A" />
        </mesh>
        <mesh position={[0.35, 0.45, -0.35]} rotation={[-0.15, 0, 0]} castShadow>
          <boxGeometry args={[0.08, 0.9, 0.08]} />
          <meshToonMaterial color="#8B6B4A" />
        </mesh>
        {/* Seat (canvas) */}
        <mesh position={[0, 0.85, 0]} castShadow>
          <boxGeometry args={[0.8, 0.04, 0.65]} />
          <meshToonMaterial color="#1A1A1A" />
        </mesh>
        {/* Backrest */}
        <mesh position={[0, 1.4, -0.32]} castShadow>
          <boxGeometry args={[0.8, 0.4, 0.04]} />
          <meshToonMaterial color="#1A1A1A" />
        </mesh>
        {/* Back uprights */}
        <mesh position={[-0.38, 1.2, -0.32]} castShadow>
          <boxGeometry args={[0.08, 0.7, 0.08]} />
          <meshToonMaterial color="#8B6B4A" />
        </mesh>
        <mesh position={[0.38, 1.2, -0.32]} castShadow>
          <boxGeometry args={[0.08, 0.7, 0.08]} />
          <meshToonMaterial color="#8B6B4A" />
        </mesh>
        {/* Armrests */}
        <mesh position={[-0.42, 1.0, 0]} castShadow>
          <boxGeometry args={[0.06, 0.06, 0.5]} />
          <meshToonMaterial color="#8B6B4A" />
        </mesh>
        <mesh position={[0.42, 1.0, 0]} castShadow>
          <boxGeometry args={[0.06, 0.06, 0.5]} />
          <meshToonMaterial color="#8B6B4A" />
        </mesh>
      </group>

      {/* Floating editing screen */}
      <group position={[1, 0, 0]} rotation={[0, -Math.PI / 8, 0]}>
        {/* Monitor bezel */}
        <mesh position={[0, 1.6, 0]} castShadow>
          <boxGeometry args={[2.2, 1.3, 0.08]} />
          <meshToonMaterial color="#1A1A1A" />
        </mesh>
        {/* Screen surface */}
        <mesh position={[0, 1.6, 0.05]}>
          <boxGeometry args={[2.0, 1.1, 0.01]} />
          <meshBasicMaterial color="#2D2A4A" />
        </mesh>
        {/* Timeline tracks */}
        <mesh position={[0, 1.35, 0.06]}>
          <planeGeometry args={[1.8, 0.08]} />
          <meshBasicMaterial color="#FF8A5B" />
        </mesh>
        <mesh position={[0, 1.45, 0.06]}>
          <planeGeometry args={[1.8, 0.08]} />
          <meshBasicMaterial color="#A8E6CF" />
        </mesh>
        <mesh position={[0, 1.55, 0.06]}>
          <planeGeometry args={[1.8, 0.06]} />
          <meshBasicMaterial color="#7B8CDE" />
        </mesh>
        {/* Playhead (moves) */}
        <mesh ref={playheadRef} position={[0, 1.45, 0.07]}>
          <boxGeometry args={[0.02, 0.3, 0.01]} />
          <meshBasicMaterial color="#FFD56B" />
        </mesh>
        {/* Stand */}
        <mesh position={[0, 0.5, -0.1]} castShadow>
          <boxGeometry args={[0.1, 1, 0.1]} />
          <meshToonMaterial color="#1A1A1A" />
        </mesh>
        <mesh position={[0, 0.05, -0.1]} castShadow>
          <boxGeometry args={[0.6, 0.08, 0.4]} />
          <meshToonMaterial color="#1A1A1A" />
        </mesh>
      </group>

      {/* Film reel (rotating) */}
      <group position={[1, 2.6, 0]}>
        <mesh ref={reelRef} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.08, 16]} />
          <meshToonMaterial color="#C4B8A8" />
        </mesh>
        {/* Reel hole */}
        <mesh position={[0, 0, 0.01]}>
          <cylinderGeometry args={[0.12, 0.12, 0.1, 8]} />
          <meshToonMaterial color="#1A1A1A" />
        </mesh>
      </group>

      {/* Clapperboard on ground */}
      <group position={[-0.5, 0.15, 1]} rotation={[-Math.PI / 2, 0, 0.3]}>
        <mesh castShadow>
          <boxGeometry args={[0.6, 0.5, 0.04]} />
          <meshToonMaterial color="#1A1A1A" />
        </mesh>
        <mesh position={[0, 0.25, 0.03]}>
          <boxGeometry args={[0.6, 0.1, 0.03]} />
          <meshToonMaterial color="#FFD56B" />
        </mesh>
      </group>

      <pointLight position={[0.5, 1.8, 0.5]} intensity={0.8} color="#7B8CDE" distance={5} />
    </group>
  )
}
