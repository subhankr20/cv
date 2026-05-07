import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useLandmarkProximity } from '@/hooks/useLandmarkProximity'

function House({ position, rotation, color, delay }: { position: [number, number, number], rotation: [number, number, number], color: string, delay: number }) {
  const roofRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (roofRef.current) {
      // Gentle bounce for the roof to make it feel alive
      roofRef.current.position.y = 0.8 + Math.sin(t * 2 + delay) * 0.05
    }
  })

  return (
    <group position={position} rotation={rotation}>
      {/* House Body */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[1, 0.8, 1]} />
        <meshToonMaterial color="#C4B8A8" />
      </mesh>
      {/* Roof */}
      <mesh ref={roofRef} position={[0, 0.8, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <cylinderGeometry args={[0, 0.9, 0.8, 4]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Door */}
      <mesh position={[0, 0.3, 0.51]}>
        <boxGeometry args={[0.3, 0.5, 0.05]} />
        <meshToonMaterial color="#1A1A1A" />
      </mesh>
      {/* Glowing Doorbell */}
      <mesh position={[0.2, 0.3, 0.53]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color="#FFD56B" />
      </mesh>
    </group>
  )
}

export default function DoorstepCulDeSac({ position }: { position: [number, number, number] }) {
  useLandmarkProximity('doorstep', position, 4.5)
  const groupRef = useRef<THREE.Group>(null)

  return (
    <group position={position} ref={groupRef}>
      <House position={[-1.5, 0, -1]} rotation={[0, Math.PI / 6, 0]} color="#FF8A5B" delay={0} />
      <House position={[0, 0, 0]} rotation={[0, 0, 0]} color="#2D6A8F" delay={1} />
      <House position={[1.5, 0, -1]} rotation={[0, -Math.PI / 6, 0]} color="#A8E6CF" delay={2} />

      {/* Water droplet particle effect placeholder (floating blue spheres) */}
      <mesh position={[-0.5, 2, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshBasicMaterial color="#7B8CDE" transparent opacity={0.6} />
      </mesh>
      <mesh position={[0.5, 1.5, 0.5]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial color="#7B8CDE" transparent opacity={0.6} />
      </mesh>
      <pointLight position={[0, 1, 0]} intensity={0.5} color="#7B8CDE" distance={3} />
    </group>
  )
}
