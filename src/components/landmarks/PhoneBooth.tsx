import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useLandmarkProximity } from '@/hooks/useLandmarkProximity'
import { useWorld } from '@/store/useWorld'

export default function PhoneBooth({ position }: { position: [number, number, number] }) {
  useLandmarkProximity('phone_booth', position, 3.5)
  const setMode = useWorld(state => state.setMode)
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const glowRef = useRef<THREE.PointLight>(null)

  useFrame(({ clock }) => {
    if (glowRef.current) {
      glowRef.current.intensity = 1.5 + Math.sin(clock.getElapsedTime() * 2) * 0.3
    }
  })

  const handleClick = (e: any) => {
    e.stopPropagation()
    setMode('contact')
  }

  return (
    <group
      position={position}
      ref={groupRef}
      onClick={handleClick}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer' }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'auto' }}
    >
      {/* Base / Floor Tile */}
      <mesh position={[0, 0.06, 0]} receiveShadow>
        <boxGeometry args={[1.4, 0.12, 1.4]} />
        <meshToonMaterial color="#9E9585" />
      </mesh>

      {/* Main booth body */}
      <mesh position={[0, 1.8, 0]} castShadow>
        <boxGeometry args={[1.1, 3.2, 1.1]} />
        <meshToonMaterial color={hovered ? '#FF4D5E' : '#E63946'} />
      </mesh>

      {/* Interior (dark inset) */}
      <mesh position={[0, 1.8, 0.02]}>
        <boxGeometry args={[0.9, 2.8, 0.9]} />
        <meshToonMaterial color="#3D1A1A" />
      </mesh>

      {/* Glass panels — front */}
      <mesh position={[0, 2.0, 0.56]}>
        <boxGeometry args={[0.85, 2.0, 0.04]} />
        <meshPhysicalMaterial color="#ffffff" transmission={0.85} transparent roughness={0.05} />
      </mesh>
      {/* Glass panels — left */}
      <mesh position={[0.56, 2.0, 0]}>
        <boxGeometry args={[0.04, 2.0, 0.85]} />
        <meshPhysicalMaterial color="#ffffff" transmission={0.85} transparent roughness={0.05} />
      </mesh>
      {/* Glass panels — right */}
      <mesh position={[-0.56, 2.0, 0]}>
        <boxGeometry args={[0.04, 2.0, 0.85]} />
        <meshPhysicalMaterial color="#ffffff" transmission={0.85} transparent roughness={0.05} />
      </mesh>

      {/* Red cross bars on glass */}
      <mesh position={[0, 2.0, 0.58]}>
        <boxGeometry args={[0.85, 0.04, 0.01]} />
        <meshToonMaterial color="#E63946" />
      </mesh>
      <mesh position={[0, 1.5, 0.58]}>
        <boxGeometry args={[0.85, 0.04, 0.01]} />
        <meshToonMaterial color="#E63946" />
      </mesh>
      <mesh position={[0, 2.5, 0.58]}>
        <boxGeometry args={[0.85, 0.04, 0.01]} />
        <meshToonMaterial color="#E63946" />
      </mesh>

      {/* Crown / roof dome */}
      <mesh position={[0, 3.5, 0]} castShadow>
        <boxGeometry args={[1.2, 0.15, 1.2]} />
        <meshToonMaterial color="#E63946" />
      </mesh>
      <mesh position={[0, 3.7, 0]} castShadow>
        <sphereGeometry args={[0.65, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshToonMaterial color={hovered ? '#FF4D5E' : '#E63946'} />
      </mesh>

      {/* Telephone inside */}
      <mesh position={[0, 1.5, -0.3]}>
        <boxGeometry args={[0.2, 0.35, 0.15]} />
        <meshToonMaterial color="#1A1A1A" />
      </mesh>
      {/* Receiver */}
      <mesh position={[0, 1.7, -0.25]} rotation={[0, 0, Math.PI / 6]}>
        <capsuleGeometry args={[0.04, 0.2, 4, 8]} />
        <meshToonMaterial color="#1A1A1A" />
      </mesh>

      {/* "TELEPHONE" sign */}
      <mesh position={[0, 3.2, 0.57]}>
        <boxGeometry args={[0.7, 0.15, 0.02]} />
        <meshBasicMaterial color="#FFD56B" />
      </mesh>

      {/* Interior warm light */}
      <pointLight ref={glowRef} position={[0, 2.5, 0]} intensity={1.5} color="#FFD56B" distance={6} />

      {/* Ground glow when hovered */}
      {hovered && (
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.5, 24]} />
          <meshBasicMaterial color="#FFD56B" transparent opacity={0.15} />
        </mesh>
      )}
    </group>
  )
}
