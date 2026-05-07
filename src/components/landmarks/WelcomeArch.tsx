import { useRef } from 'react'
import * as THREE from 'three'
import { useLandmarkProximity } from '@/hooks/useLandmarkProximity'

export default function WelcomeArch({ position }: { position: [number, number, number] }) {
  useLandmarkProximity('welcome_arch', position, 4)
  const groupRef = useRef<THREE.Group>(null)

  return (
    <group position={position} ref={groupRef}>
      {/* Left Pillar */}
      <mesh position={[-1.5, 2, 0]} castShadow>
        <boxGeometry args={[0.6, 4, 0.6]} />
        <meshToonMaterial color="#C4B8A8" />
      </mesh>
      
      {/* Right Pillar */}
      <mesh position={[1.5, 2, 0]} castShadow>
        <boxGeometry args={[0.6, 4, 0.6]} />
        <meshToonMaterial color="#C4B8A8" />
      </mesh>

      {/* Crossbeam */}
      <mesh position={[0, 4.2, 0]} castShadow>
        <boxGeometry args={[4, 0.6, 0.8]} />
        <meshToonMaterial color="#8B7355" />
      </mesh>

      {/* Signboard */}
      <mesh position={[0, 3.2, 0]} castShadow>
        <boxGeometry args={[2.5, 0.8, 0.1]} />
        <meshToonMaterial color="#1A1A1A" />
      </mesh>
      
      {/* Sign Text (simplified as a lighter colored box for the low poly look, or use Text if we want actual text) */}
      <mesh position={[0, 3.2, 0.06]}>
        <planeGeometry args={[2.2, 0.5]} />
        <meshBasicMaterial color="#FFD56B" />
      </mesh>

      {/* Lanterns */}
      <mesh position={[-1.5, 3.2, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.2, 0.4, 6]} />
        <meshToonMaterial color="#E63946" />
      </mesh>
      <mesh position={[1.5, 3.2, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.2, 0.4, 6]} />
        <meshToonMaterial color="#E63946" />
      </mesh>
      
      {/* Lantern glow */}
      <pointLight position={[-1.5, 3.2, 0]} intensity={0.5} color="#FFD56B" distance={3} />
      <pointLight position={[1.5, 3.2, 0]} intensity={0.5} color="#FFD56B" distance={3} />
    </group>
  )
}
