import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useLandmarkProximity } from '@/hooks/useLandmarkProximity'

function House({ position, rotation, roofColor, delay }: { position: [number, number, number]; rotation: [number, number, number]; roofColor: string; delay: number }) {
  const doorRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.PointLight>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (doorRef.current) doorRef.current.rotation.y = Math.sin(t * 1.5 + delay) * 0.3
    if (glowRef.current) glowRef.current.intensity = 0.4 + Math.sin(t * 3 + delay) * 0.2
  })

  return (
    <group position={position} rotation={rotation}>
      {/* Foundation */}
      <mesh position={[0, 0.08, 0]} receiveShadow>
        <boxGeometry args={[1.3, 0.15, 1.3]} />
        <meshToonMaterial color="#9E9585" />
      </mesh>
      {/* Walls */}
      <mesh position={[0, 0.55, 0]} castShadow>
        <boxGeometry args={[1.1, 0.8, 1.1]} />
        <meshToonMaterial color="#FFF8EC" />
      </mesh>
      {/* Window */}
      <mesh position={[0.3, 0.65, 0.56]}>
        <boxGeometry args={[0.25, 0.25, 0.02]} />
        <meshBasicMaterial color="#7B8CDE" transparent opacity={0.7} />
      </mesh>
      {/* Window frame */}
      <mesh position={[0.3, 0.65, 0.57]}>
        <boxGeometry args={[0.3, 0.005, 0.01]} />
        <meshToonMaterial color="#8B6B4A" />
      </mesh>
      <mesh position={[0.3, 0.65, 0.57]}>
        <boxGeometry args={[0.005, 0.3, 0.01]} />
        <meshToonMaterial color="#8B6B4A" />
      </mesh>
      {/* Door */}
      <group position={[-0.2, 0.35, 0.55]}>
        <mesh ref={doorRef} castShadow>
          <boxGeometry args={[0.3, 0.55, 0.05]} />
          <meshToonMaterial color="#8B6B4A" />
        </mesh>
        {/* Doorbell */}
        <mesh position={[0.18, 0, 0.03]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color="#FFD56B" />
        </mesh>
      </group>
      {/* Roof */}
      <mesh position={[0, 1.25, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[0.95, 0.8, 4]} />
        <meshToonMaterial color={roofColor} />
      </mesh>
      {/* Chimney */}
      <mesh position={[0.35, 1.3, -0.2]} castShadow>
        <boxGeometry args={[0.15, 0.4, 0.15]} />
        <meshToonMaterial color="#9E9585" />
      </mesh>
      {/* Interior glow */}
      <pointLight ref={glowRef} position={[0, 0.5, 0]} intensity={0.5} color="#FFD56B" distance={2} />
    </group>
  )
}

export default function DoorstepCulDeSac({ position }: { position: [number, number, number] }) {
  useLandmarkProximity('doorstep', position, 5)
  const dropsRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (!dropsRef.current) return
    dropsRef.current.children.forEach((child, i) => {
      child.position.y = 2 + ((clock.getElapsedTime() * 0.5 + i * 0.7) % 2)
      ;(child as THREE.Mesh).material && ((child as any).material.opacity = 1 - ((clock.getElapsedTime() * 0.5 + i * 0.7) % 2) / 2)
    })
  })

  return (
    <group position={position}>
      <House position={[-2, 0, -1]} rotation={[0, Math.PI / 5, 0]} roofColor="#FF8A5B" delay={0} />
      <House position={[0, 0, 0.5]} rotation={[0, 0, 0]} roofColor="#2D6A8F" delay={1.2} />
      <House position={[2, 0, -1]} rotation={[0, -Math.PI / 5, 0]} roofColor="#4A8C5C" delay={2.4} />

      {/* Cobblestone path */}
      {[[-1, 0.05, 1.5], [0, 0.05, 2], [1, 0.05, 1.5], [0.5, 0.05, 2.5]].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} receiveShadow>
          <cylinderGeometry args={[0.2 + i * 0.02, 0.25 + i * 0.02, 0.06, 6]} />
          <meshToonMaterial color="#B5A99A" />
        </mesh>
      ))}

      {/* Water droplet particles (R.O. Systems theme) */}
      <group ref={dropsRef}>
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={i} position={[(Math.random() - 0.5) * 4, 2, (Math.random() - 0.5) * 3]}>
            <sphereGeometry args={[0.06, 6, 6]} />
            <meshBasicMaterial color="#7B8CDE" transparent opacity={0.5} />
          </mesh>
        ))}
      </group>
    </group>
  )
}
