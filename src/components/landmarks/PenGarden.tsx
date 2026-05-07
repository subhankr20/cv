import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useLandmarkProximity } from '@/hooks/useLandmarkProximity'

export default function PenGarden({ position }: { position: [number, number, number] }) {
  useLandmarkProximity('pen_garden', position, 4)
  const wordsRef = useRef<THREE.Group>(null)
  const penRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (penRef.current) {
      penRef.current.rotation.z = Math.sin(t * 0.5) * 0.03
    }
    if (wordsRef.current) {
      wordsRef.current.children.forEach((child, i) => {
        child.position.y = 1.5 + ((t * 0.4 + i * 1.2) % 4)
        ;(child as any).material && ((child as any).material.opacity = 1 - ((t * 0.4 + i * 1.2) % 4) / 4)
      })
    }
  })

  return (
    <group position={position}>
      {/* The Giant Fountain Pen */}
      <group ref={penRef} position={[0, 0, 0]}>
        {/* Nib */}
        <mesh position={[0, 0.4, 0]} castShadow>
          <coneGeometry args={[0.15, 0.8, 8]} />
          <meshToonMaterial color="#FFD56B" />
        </mesh>
        {/* Nib slit */}
        <mesh position={[0, 0.5, 0.01]}>
          <boxGeometry args={[0.01, 0.5, 0.01]} />
          <meshBasicMaterial color="#1A1A1A" />
        </mesh>
        {/* Grip section */}
        <mesh position={[0, 1.2, 0]} castShadow>
          <cylinderGeometry args={[0.18, 0.22, 1, 12]} />
          <meshToonMaterial color="#2D2A4A" />
        </mesh>
        {/* Gold ring */}
        <mesh position={[0, 0.75, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.06, 12]} />
          <meshToonMaterial color="#FFD56B" />
        </mesh>
        {/* Body */}
        <mesh position={[0, 2.3, 0]} castShadow>
          <cylinderGeometry args={[0.22, 0.18, 2, 12]} />
          <meshToonMaterial color="#1A1A1A" />
        </mesh>
        {/* Cap */}
        <mesh position={[0, 3.5, 0]} castShadow>
          <cylinderGeometry args={[0.24, 0.22, 0.6, 12]} />
          <meshToonMaterial color="#2D6A8F" />
        </mesh>
        {/* Cap finial */}
        <mesh position={[0, 3.85, 0]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshToonMaterial color="#FFD56B" />
        </mesh>
      </group>

      {/* Floating word fireflies */}
      <group ref={wordsRef}>
        {['#A8E6CF', '#FFD56B', '#FF8A5B', '#7B8CDE', '#FF6B8A', '#C4A8E6'].map((color, i) => (
          <mesh key={i} position={[Math.sin(i * 1.5) * 1.5, 2 + i * 0.5, Math.cos(i * 1.5) * 1.5]}>
            <sphereGeometry args={[0.08, 6, 6]} />
            <meshBasicMaterial color={color} transparent opacity={0.8} />
          </mesh>
        ))}
      </group>

      {/* Ink splatter ground decoration */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[1.5, 16]} />
        <meshBasicMaterial color="#2D2A4A" transparent opacity={0.15} />
      </mesh>

      <pointLight position={[0, 2, 0]} intensity={1} color="#FFD56B" distance={5} />
    </group>
  )
}
