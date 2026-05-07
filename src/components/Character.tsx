import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useWorld } from '@/store/useWorld'
import { GROUND_Y } from '@/constants'

const SPEED = 3.5
const ARRIVAL_THRESHOLD = 0.4

export default function Character() {
  const groupRef = useRef<THREE.Group>(null)
  const shadowRef = useRef<THREE.Mesh>(null)
  const { characterTarget, isMoving, setCharacterPos, setIsMoving, setCharacterTarget } = useWorld()
  const bobPhase = useRef(0)

  useFrame((_, delta) => {
    if (!groupRef.current) return

    const pos = groupRef.current.position

    if (characterTarget && isMoving) {
      const dir = new THREE.Vector3()
        .subVectors(characterTarget, pos)
        .setY(0) // Only move on XZ plane

      const distance = dir.length()

      if (distance < ARRIVAL_THRESHOLD) {
        setIsMoving(false)
        setCharacterTarget(null as unknown as THREE.Vector3)
        return
      }

      dir.normalize()

      const step = Math.min(SPEED * delta, distance)
      pos.x += dir.x * step
      pos.z += dir.z * step
      bobPhase.current += delta
      pos.y = GROUND_Y + Math.sin(bobPhase.current * 10) * 0.06

      // Face direction of movement
      const angle = Math.atan2(dir.x, dir.z)
      const targetQ = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, angle, 0))
      groupRef.current.quaternion.slerp(targetQ, 0.15)

      setCharacterPos(pos.clone())
    } else {
      // Gentle idle bob
      bobPhase.current += delta * 0.5
      pos.y = GROUND_Y + Math.sin(bobPhase.current * 2) * 0.03
    }

    // Keep shadow disc on ground
    if (shadowRef.current) {
      shadowRef.current.position.set(pos.x, GROUND_Y + 0.01, pos.z)
    }
  })

  return (
    <>
      <group ref={groupRef} position={[0, GROUND_Y, 0]} scale={1.3}>
        {/* Shadow / selection disc */}
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.5, 24]} />
          <meshBasicMaterial color="#1A1A1A" transparent opacity={0.3} />
        </mesh>

        {/* Feet */}
        <mesh castShadow position={[-0.1, 0.08, 0]}>
          <boxGeometry args={[0.12, 0.15, 0.22]} />
          <meshToonMaterial color="#2D2A4A" />
        </mesh>
        <mesh castShadow position={[0.1, 0.08, 0]}>
          <boxGeometry args={[0.12, 0.15, 0.22]} />
          <meshToonMaterial color="#2D2A4A" />
        </mesh>

        {/* Legs */}
        <mesh castShadow position={[-0.1, 0.3, 0]}>
          <boxGeometry args={[0.14, 0.3, 0.14]} />
          <meshToonMaterial color="#2D6A8F" />
        </mesh>
        <mesh castShadow position={[0.1, 0.3, 0]}>
          <boxGeometry args={[0.14, 0.3, 0.14]} />
          <meshToonMaterial color="#2D6A8F" />
        </mesh>

        {/* Body */}
        <mesh castShadow position={[0, 0.65, 0]}>
          <boxGeometry args={[0.4, 0.45, 0.25]} />
          <meshToonMaterial color="#FF8A5B" />
        </mesh>
        {/* Collar */}
        <mesh position={[0, 0.88, 0]}>
          <boxGeometry args={[0.42, 0.04, 0.27]} />
          <meshToonMaterial color="#FFF8EC" />
        </mesh>

        {/* Arms */}
        <mesh castShadow position={[-0.28, 0.6, 0]} rotation={[0, 0, 0.2]}>
          <boxGeometry args={[0.12, 0.35, 0.12]} />
          <meshToonMaterial color="#FFD56B" />
        </mesh>
        <mesh castShadow position={[0.28, 0.55, 0.08]} rotation={[0.3, 0, -0.2]}>
          <boxGeometry args={[0.12, 0.35, 0.12]} />
          <meshToonMaterial color="#FFD56B" />
        </mesh>

        {/* Clipboard in right hand */}
        <mesh position={[0.38, 0.4, 0.12]} rotation={[0.4, 0, -0.15]}>
          <boxGeometry args={[0.22, 0.3, 0.02]} />
          <meshToonMaterial color="#C4B8A8" />
        </mesh>
        <mesh position={[0.38, 0.56, 0.13]} rotation={[0.4, 0, -0.15]}>
          <boxGeometry args={[0.24, 0.03, 0.03]} />
          <meshToonMaterial color="#8B6B4A" />
        </mesh>

        {/* Head */}
        <mesh castShadow position={[0, 1.12, 0]}>
          <sphereGeometry args={[0.28, 16, 16]} />
          <meshToonMaterial color="#FFD56B" />
        </mesh>

        {/* Hair */}
        <mesh position={[0, 1.3, -0.05]}>
          <sphereGeometry args={[0.26, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshToonMaterial color="#1A1A1A" />
        </mesh>

        {/* Eyes */}
        <mesh position={[-0.09, 1.15, 0.25]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color="#FFF8EC" />
        </mesh>
        <mesh position={[0.09, 1.15, 0.25]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color="#FFF8EC" />
        </mesh>
        {/* Pupils */}
        <mesh position={[-0.09, 1.15, 0.285]}>
          <sphereGeometry args={[0.022, 8, 8]} />
          <meshBasicMaterial color="#1A1A1A" />
        </mesh>
        <mesh position={[0.09, 1.15, 0.285]}>
          <sphereGeometry args={[0.022, 8, 8]} />
          <meshBasicMaterial color="#1A1A1A" />
        </mesh>

        {/* Mouth */}
        <mesh position={[0, 1.05, 0.27]}>
          <boxGeometry args={[0.08, 0.02, 0.01]} />
          <meshBasicMaterial color="#E63946" />
        </mesh>

        {/* Headset */}
        <mesh position={[0, 1.25, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.22, 0.025, 8, 16]} />
          <meshToonMaterial color="#333" />
        </mesh>
        {/* Headset mic */}
        <mesh position={[-0.22, 1.1, 0.12]} rotation={[0.5, 0, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.15, 6]} />
          <meshToonMaterial color="#333" />
        </mesh>
        <mesh position={[-0.22, 1.03, 0.16]}>
          <sphereGeometry args={[0.025, 6, 6]} />
          <meshToonMaterial color="#333" />
        </mesh>

        {/* Selection glow ring */}
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.45, 0.55, 24]} />
          <meshBasicMaterial color="#A8E6CF" transparent opacity={0.25} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* External shadow (stays on ground plane regardless of bob) */}
      <mesh ref={shadowRef} position={[0, GROUND_Y + 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.6, 24]} />
        <meshBasicMaterial color="#1A1A1A" transparent opacity={0.2} />
      </mesh>
    </>
  )
}
