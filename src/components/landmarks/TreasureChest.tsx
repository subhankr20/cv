import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useLandmarkProximity } from '@/hooks/useLandmarkProximity'
import { useWorld } from '@/store/useWorld'

export default function TreasureChest({ position }: { position: [number, number, number] }) {
  useLandmarkProximity('treasure_chest', position, 3.5)
  const activePanel = useWorld(state => state.activePanel)
  const groupRef = useRef<THREE.Group>(null)
  const lidRef = useRef<THREE.Group>(null)
  const glowRef = useRef<THREE.PointLight>(null)
  const [opened, setOpened] = useState(false)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const isNear = activePanel === 'treasure_chest'

    // Open lid when near
    if (lidRef.current) {
      const targetAngle = isNear ? -Math.PI / 2.5 : 0
      lidRef.current.rotation.x += (targetAngle - lidRef.current.rotation.x) * 0.06
    }

    if (isNear && !opened) setOpened(true)

    // Glow pulsing from inside when open
    if (glowRef.current) {
      glowRef.current.intensity = isNear ? 3 + Math.sin(t * 3) * 1.5 : 0.3
    }

    // Gentle bob for the whole chest
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(t * 1.2) * 0.04
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Base platform */}
      <mesh position={[0, 0.04, 0]} receiveShadow>
        <cylinderGeometry args={[0.8, 0.9, 0.08, 8]} />
        <meshToonMaterial color="#8B6B4A" />
      </mesh>

      {/* Chest body (bottom) */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[1.0, 0.5, 0.7]} />
        <meshToonMaterial color="#8B6B4A" />
      </mesh>
      {/* Body trim */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[1.05, 0.08, 0.75]} />
        <meshToonMaterial color="#FFD56B" />
      </mesh>
      {/* Body corner bands */}
      <mesh position={[-0.48, 0.35, 0]}>
        <boxGeometry args={[0.06, 0.52, 0.72]} />
        <meshToonMaterial color="#FFD56B" />
      </mesh>
      <mesh position={[0.48, 0.35, 0]}>
        <boxGeometry args={[0.06, 0.52, 0.72]} />
        <meshToonMaterial color="#FFD56B" />
      </mesh>

      {/* Lock */}
      <mesh position={[0, 0.35, 0.36]}>
        <boxGeometry args={[0.12, 0.15, 0.04]} />
        <meshToonMaterial color="#FFD56B" />
      </mesh>
      <mesh position={[0, 0.3, 0.38]}>
        <cylinderGeometry args={[0.04, 0.04, 0.04, 8]} />
        <meshToonMaterial color="#1A1A1A" />
      </mesh>

      {/* Lid (hinged — pivot from back edge) */}
      <group ref={lidRef} position={[0, 0.6, -0.35]}>
        {/* Lid body (curved top) */}
        <mesh position={[0, 0.15, 0.35]} castShadow>
          <boxGeometry args={[1.05, 0.06, 0.72]} />
          <meshToonMaterial color="#A0784A" />
        </mesh>
        {/* Lid curve */}
        <mesh position={[0, 0.22, 0.35]} castShadow>
          <cylinderGeometry args={[0.52, 0.52, 1.05, 8, 1, false, 0, Math.PI]} />
          <meshToonMaterial color="#8B6B4A" />
        </mesh>
        {/* Lid gold band */}
        <mesh position={[0, 0.22, 0.35]}>
          <cylinderGeometry args={[0.53, 0.53, 0.06, 8, 1, false, 0, Math.PI]} />
          <meshToonMaterial color="#FFD56B" />
        </mesh>
      </group>

      {/* Interior glow + gems */}
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[0.85, 0.3, 0.55]} />
        <meshBasicMaterial color="#FFD56B" transparent opacity={0.3} />
      </mesh>
      {/* Gems inside */}
      <mesh position={[-0.2, 0.35, 0.05]}>
        <octahedronGeometry args={[0.08, 0]} />
        <meshBasicMaterial color="#E63946" />
      </mesh>
      <mesh position={[0.15, 0.32, -0.1]}>
        <octahedronGeometry args={[0.07, 0]} />
        <meshBasicMaterial color="#A8E6CF" />
      </mesh>
      <mesh position={[0, 0.38, 0.12]}>
        <octahedronGeometry args={[0.06, 0]} />
        <meshBasicMaterial color="#7B8CDE" />
      </mesh>

      {/* HIRE ME beacon — only shows when opened */}
      {opened && (
        <HireMeBeacon />
      )}

      {/* Internal glow */}
      <pointLight ref={glowRef} position={[0, 0.5, 0]} intensity={0.3} color="#FFD56B" distance={5} />
    </group>
  )
}

/* ── Floating "HIRE ME" animation ────────────────────────────── */
function HireMeBeacon() {
  const groupRef = useRef<THREE.Group>(null)
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.position.y = 1.5 + Math.sin(t * 1.5) * 0.2
      groupRef.current.rotation.y = t * 0.8
    }
    if (ringRef.current) {
      ringRef.current.scale.setScalar(1 + Math.sin(t * 3) * 0.15)
    }
  })

  return (
    <group ref={groupRef} position={[0, 1.5, 0]}>
      {/* Glowing orb */}
      <mesh>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshBasicMaterial color="#FFD56B" />
      </mesh>

      {/* Pulsing ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.35, 0.42, 24]} />
        <meshBasicMaterial color="#FF8A5B" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>

      {/* Outer ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 0.55, 24]} />
        <meshBasicMaterial color="#A8E6CF" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* Upward beam of light */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.02, 0.15, 2, 8]} />
        <meshBasicMaterial color="#FFD56B" transparent opacity={0.25} />
      </mesh>

      <pointLight position={[0, 0, 0]} intensity={2} color="#FFD56B" distance={6} />
    </group>
  )
}
