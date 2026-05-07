import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useLandmarkProximity } from '@/hooks/useLandmarkProximity'

export default function Library({ position }: { position: [number, number, number] }) {
  useLandmarkProximity('library', position, 4)
  const groupRef = useRef<THREE.Group>(null)
  const book1Ref = useRef<THREE.Mesh>(null)
  const book2Ref = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (book1Ref.current) {
      book1Ref.current.position.y = 2.5 + Math.sin(t * 1.5) * 0.2
      book1Ref.current.rotation.y = t * 0.4
    }
    if (book2Ref.current) {
      book2Ref.current.position.y = 2.0 + Math.sin(t * 1.5 + Math.PI) * 0.2
      book2Ref.current.rotation.y = -t * 0.3
    }
  })

  return (
    <group position={position} ref={groupRef}>
      {/* Pedestal Base */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[1, 1.2, 1, 8]} />
        <meshToonMaterial color="#C4B8A8" />
      </mesh>

      {/* Floating Book 1 (SMIT) */}
      <mesh ref={book1Ref} position={[0.5, 2.5, 0]} rotation={[0.2, 0, 0.1]} castShadow>
        <boxGeometry args={[0.8, 1.2, 0.2]} />
        <meshToonMaterial color="#2D6A8F" />
      </mesh>

      {/* Floating Book 2 (DPS) */}
      <mesh ref={book2Ref} position={[-0.5, 2.0, 0.5]} rotation={[-0.1, 0, -0.2]} castShadow>
        <boxGeometry args={[0.7, 1.0, 0.15]} />
        <meshToonMaterial color="#A8E6CF" />
      </mesh>

      {/* Magical glow */}
      <pointLight position={[0, 2, 0]} intensity={1} color="#A8E6CF" distance={4} />
    </group>
  )
}
