import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useLandmarkProximity } from '@/hooks/useLandmarkProximity'

export default function DirectorsCut({ position }: { position: [number, number, number] }) {
  useLandmarkProximity('directors_cut', position, 4)
  const groupRef = useRef<THREE.Group>(null)
  const reelRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (reelRef.current) {
      reelRef.current.rotation.x = clock.getElapsedTime() * 0.5
    }
  })

  return (
    <group position={position} ref={groupRef} rotation={[0, -Math.PI / 4, 0]}>
      {/* Director's Chair */}
      <group position={[-1, 0, 0]}>
        {/* Legs */}
        <mesh position={[-0.4, 0.5, -0.4]} castShadow><boxGeometry args={[0.1, 1, 0.1]} /><meshToonMaterial color="#8B7355" /></mesh>
        <mesh position={[0.4, 0.5, -0.4]} castShadow><boxGeometry args={[0.1, 1, 0.1]} /><meshToonMaterial color="#8B7355" /></mesh>
        <mesh position={[-0.4, 0.5, 0.4]} castShadow><boxGeometry args={[0.1, 1, 0.1]} /><meshToonMaterial color="#8B7355" /></mesh>
        <mesh position={[0.4, 0.5, 0.4]} castShadow><boxGeometry args={[0.1, 1, 0.1]} /><meshToonMaterial color="#8B7355" /></mesh>
        {/* Seat */}
        <mesh position={[0, 1, 0]} castShadow><boxGeometry args={[1, 0.05, 1]} /><meshToonMaterial color="#1A1A1A" /></mesh>
        {/* Backrest */}
        <mesh position={[0, 1.5, -0.45]} castShadow><boxGeometry args={[1, 0.3, 0.05]} /><meshToonMaterial color="#1A1A1A" /></mesh>
        <mesh position={[-0.45, 1.3, -0.45]} castShadow><boxGeometry args={[0.1, 0.6, 0.1]} /><meshToonMaterial color="#8B7355" /></mesh>
        <mesh position={[0.45, 1.3, -0.45]} castShadow><boxGeometry args={[0.1, 0.6, 0.1]} /><meshToonMaterial color="#8B7355" /></mesh>
      </group>

      {/* Floating Timeline Screen */}
      <mesh position={[1, 1.5, 0]} rotation={[0, -Math.PI / 6, 0]}>
        <boxGeometry args={[1.8, 1, 0.05]} />
        <meshBasicMaterial color="#2D6A8F" transparent opacity={0.8} />
      </mesh>
      {/* Timeline tracks (simple lines) */}
      <mesh position={[1, 1.5, 0.03]} rotation={[0, -Math.PI / 6, 0]}>
        <planeGeometry args={[1.6, 0.1]} />
        <meshBasicMaterial color="#FF8A5B" />
      </mesh>
      <mesh position={[1, 1.3, 0.03]} rotation={[0, -Math.PI / 6, 0]}>
        <planeGeometry args={[1.6, 0.1]} />
        <meshBasicMaterial color="#A8E6CF" />
      </mesh>

      {/* Film Reel */}
      <mesh ref={reelRef} position={[1, 2.5, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.1, 16]} />
        <meshToonMaterial color="#C4B8A8" />
      </mesh>

      <pointLight position={[0.5, 1.5, 0.5]} intensity={0.8} color="#2D6A8F" distance={4} />
    </group>
  )
}
