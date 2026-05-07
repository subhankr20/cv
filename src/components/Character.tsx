import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useWorld } from '@/store/useWorld'

const SPEED = 3.5
const ARRIVAL_THRESHOLD = 0.3

/**
 * Capsule-based character that walks to the target position.
 * Smooth rotation via slerp. Bobbing idle animation.
 */
export default function Character() {
  const groupRef = useRef<THREE.Group>(null)
  const { characterTarget, isMoving, setCharacterPos, setIsMoving, setCharacterTarget } = useWorld()
  const [bobPhase, setBobPhase] = useState(0)

  useFrame((_, delta) => {
    if (!groupRef.current) return

    const pos = groupRef.current.position

    if (characterTarget && isMoving) {
      // Direction to target
      const dir = new THREE.Vector3()
        .subVectors(characterTarget, pos)
        .setY(0)

      const distance = dir.length()

      if (distance < ARRIVAL_THRESHOLD) {
        // Arrived
        setIsMoving(false)
        setCharacterTarget(null as unknown as THREE.Vector3)
        return
      }

      dir.normalize()

      // Move
      const step = Math.min(SPEED * delta, distance)
      pos.add(dir.multiplyScalar(step))
      pos.y = 2 + Math.sin(bobPhase * 8) * 0.08 // Walk bob

      // Rotate to face direction
      const targetQ = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 0, 1),
        new THREE.Vector3(dir.x, 0, dir.z).normalize()
      )
      groupRef.current.quaternion.slerp(targetQ, 0.12)

      setCharacterPos(pos.clone())
      setBobPhase(bobPhase + delta)
    } else {
      // Idle bob
      setBobPhase(bobPhase + delta * 0.5)
      pos.y = 2 + Math.sin(bobPhase * 2) * 0.04
    }
  })

  return (
    <group ref={groupRef} position={[0, 2, 0]}>
      {/* Body — capsule */}
      <mesh castShadow position={[0, 0.5, 0]}>
        <capsuleGeometry args={[0.25, 0.5, 8, 16]} />
        <meshToonMaterial color="#FF8A5B" />
      </mesh>

      {/* Head */}
      <mesh castShadow position={[0, 1.15, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshToonMaterial color="#FFD56B" />
      </mesh>

      {/* Headset — torus */}
      <mesh position={[0, 1.3, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.22, 0.03, 8, 16]} />
        <meshToonMaterial color="#333" />
      </mesh>

      {/* Clipboard */}
      <mesh position={[0.35, 0.5, 0.1]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[0.2, 0.3, 0.02]} />
        <meshToonMaterial color="#C4B8A8" />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.1, 1.2, 0.27]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#1A1A1A" />
      </mesh>
      <mesh position={[0.1, 1.2, 0.27]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#1A1A1A" />
      </mesh>
    </group>
  )
}
