import { useRef } from 'react'
import * as THREE from 'three'
import { useLandmarkProximity } from '@/hooks/useLandmarkProximity'
import { useFrame } from '@react-three/fiber'

export default function PenGarden({ position }: { position: [number, number, number] }) {
  useLandmarkProximity('pen_garden', position, 4)
  const groupRef = useRef<THREE.Group>(null)
  const floatersRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (floatersRef.current) {
      floatersRef.current.rotation.y = clock.getElapsedTime() * 0.2
      floatersRef.current.position.y = Math.sin(clock.getElapsedTime()) * 0.2
    }
  })

  return (
    <group position={position} ref={groupRef}>
      {/* The Oversized Pen */}
      <group position={[0, 1.5, 0]} rotation={[0.2, 0, 0.1]}>
        {/* Pen Tip (nib) */}
        <mesh position={[0, -1.5, 0]} castShadow>
          <coneGeometry args={[0.2, 0.8, 16]} />
          <meshToonMaterial color="#FFD56B" />
        </mesh>
        {/* Pen Body */}
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.2, 2.5, 16]} />
          <meshToonMaterial color="#1A1A1A" />
        </mesh>
        {/* Pen Cap */}
        <mesh position={[0, 1.5, 0]} castShadow>
          <cylinderGeometry args={[0.32, 0.3, 0.8, 16]} />
          <meshToonMaterial color="#2D6A8F" />
        </mesh>
      </group>

      {/* Floating words/fireflies */}
      <group ref={floatersRef} position={[0, 1, 0]}>
        <mesh position={[1, 1, 1]}>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshBasicMaterial color="#FFD56B" />
        </mesh>
        <mesh position={[-1, 2, -0.5]}>
          <boxGeometry args={[0.15, 0.15, 0.15]} />
          <meshBasicMaterial color="#A8E6CF" />
        </mesh>
        <mesh position={[0.5, 3, -1]}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshBasicMaterial color="#FF8A5B" />
        </mesh>
      </group>

      <pointLight position={[0, 1, 0]} intensity={1} color="#FFD56B" distance={4} />
    </group>
  )
}
