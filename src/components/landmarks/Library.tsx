import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useLandmarkProximity } from '@/hooks/useLandmarkProximity'

export default function Library({ position }: { position: [number, number, number] }) {
  useLandmarkProximity('library', position, 4)
  const book1 = useRef<THREE.Group>(null)
  const book2 = useRef<THREE.Group>(null)
  const orbsRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (book1.current) {
      book1.current.position.y = 2.8 + Math.sin(t * 1.2) * 0.25
      book1.current.rotation.y = t * 0.3
      book1.current.rotation.z = Math.sin(t * 0.8) * 0.1
    }
    if (book2.current) {
      book2.current.position.y = 2.2 + Math.sin(t * 1.2 + 2) * 0.25
      book2.current.rotation.y = -t * 0.25
      book2.current.rotation.z = Math.sin(t * 0.6 + 1) * 0.08
    }
    if (orbsRef.current) {
      orbsRef.current.rotation.y = t * 0.5
    }
  })

  return (
    <group position={position}>
      {/* Pedestal — detailed stone column */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <cylinderGeometry args={[1.2, 1.4, 0.6, 8]} />
        <meshToonMaterial color="#9E9585" />
      </mesh>
      <mesh position={[0, 0.7, 0]} castShadow>
        <cylinderGeometry args={[0.9, 1.2, 0.3, 8]} />
        <meshToonMaterial color="#B5A99A" />
      </mesh>
      <mesh position={[0, 1.0, 0]} castShadow>
        <cylinderGeometry args={[0.7, 0.9, 0.3, 8]} />
        <meshToonMaterial color="#C4B8A8" />
      </mesh>

      {/* Floating Book 1 — SMIT (thick, blue) */}
      <group ref={book1} position={[0.6, 2.8, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.0, 1.4, 0.2]} />
          <meshToonMaterial color="#2D6A8F" />
        </mesh>
        {/* Book spine */}
        <mesh position={[-0.52, 0, 0]}>
          <boxGeometry args={[0.05, 1.4, 0.22]} />
          <meshToonMaterial color="#1A4A6A" />
        </mesh>
        {/* Pages edge */}
        <mesh position={[0.01, 0, 0.11]}>
          <boxGeometry args={[0.95, 1.3, 0.01]} />
          <meshBasicMaterial color="#FFF8EC" />
        </mesh>
      </group>

      {/* Floating Book 2 — DPS (thinner, green) */}
      <group ref={book2} position={[-0.5, 2.2, 0.5]}>
        <mesh castShadow>
          <boxGeometry args={[0.8, 1.0, 0.15]} />
          <meshToonMaterial color="#4A8C5C" />
        </mesh>
        <mesh position={[-0.42, 0, 0]}>
          <boxGeometry args={[0.04, 1.0, 0.17]} />
          <meshToonMaterial color="#3D7A4A" />
        </mesh>
        <mesh position={[0.01, 0, 0.08]}>
          <boxGeometry args={[0.75, 0.9, 0.01]} />
          <meshBasicMaterial color="#FFF8EC" />
        </mesh>
      </group>

      {/* Orbiting knowledge orbs */}
      <group ref={orbsRef} position={[0, 2.5, 0]}>
        {[0, 1.2, 2.4, 3.6, 4.8].map((offset, i) => (
          <mesh key={i} position={[Math.cos(offset) * 1.5, Math.sin(offset * 2) * 0.3, Math.sin(offset) * 1.5]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshBasicMaterial color="#A8E6CF" />
          </mesh>
        ))}
      </group>

      <pointLight position={[0, 2.5, 0]} intensity={1.2} color="#A8E6CF" distance={5} />
    </group>
  )
}
