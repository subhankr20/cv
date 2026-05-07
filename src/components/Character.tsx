import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useWorld } from '@/store/useWorld'
import { useKeyboard } from '@/hooks/useKeyboard'
import { GROUND_Y, ISLAND_RADIUS } from '@/constants'

const SPEED = 3.5
const ARRIVAL_THRESHOLD = 0.4

export default function Character() {
  const groupRef = useRef<THREE.Group>(null)
  const shadowRef = useRef<THREE.Mesh>(null)
  const bobPhase = useRef(0)
  const keys = useKeyboard()

  useFrame((_, delta) => {
    if (!groupRef.current) return
    const store = useWorld.getState()
    const pos = groupRef.current.position

    // ─── Keyboard movement (overrides click-to-move) ────────────
    const dir = new THREE.Vector3()
    const k = keys.current
    if (k.has('ArrowUp')    || k.has('KeyW')) dir.z -= 1
    if (k.has('ArrowDown')  || k.has('KeyS')) dir.z += 1
    if (k.has('ArrowLeft')  || k.has('KeyA')) dir.x -= 1
    if (k.has('ArrowRight') || k.has('KeyD')) dir.x += 1

    const hasKeyboard = dir.lengthSq() > 0

    if (hasKeyboard) {
      dir.normalize()

      const nextX = pos.x + dir.x * SPEED * delta
      const nextZ = pos.z + dir.z * SPEED * delta
      const dist = Math.sqrt(nextX * nextX + nextZ * nextZ)

      // Clamp to island
      if (dist < ISLAND_RADIUS) {
        pos.x = nextX
        pos.z = nextZ
      }

      bobPhase.current += delta
      pos.y = GROUND_Y + Math.sin(bobPhase.current * 10) * 0.06

      // Face direction
      const angle = Math.atan2(dir.x, dir.z)
      const targetQ = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, angle, 0))
      groupRef.current.quaternion.slerp(targetQ, 0.15)

      store.setCharacterPos(pos.clone())
      if (!store.isMoving) store.setIsMoving(true)
      // Cancel any pending click target
      if (store.characterTarget) store.setIsMoving(true)
      return
    }

    // ─── Click-to-move ──────────────────────────────────────────
    const { characterTarget, isMoving } = store

    if (characterTarget && isMoving) {
      const moveDir = new THREE.Vector3()
        .subVectors(characterTarget, pos)
        .setY(0)

      const distance = moveDir.length()

      if (distance < ARRIVAL_THRESHOLD) {
        store.setIsMoving(false)
        store.setCharacterTarget(null as unknown as THREE.Vector3)
        return
      }

      moveDir.normalize()
      const step = Math.min(SPEED * delta, distance)
      pos.x += moveDir.x * step
      pos.z += moveDir.z * step
      bobPhase.current += delta
      pos.y = GROUND_Y + Math.sin(bobPhase.current * 10) * 0.06

      const angle = Math.atan2(moveDir.x, moveDir.z)
      const targetQ = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, angle, 0))
      groupRef.current.quaternion.slerp(targetQ, 0.15)

      store.setCharacterPos(pos.clone())
    } else {
      // Idle bob
      bobPhase.current += delta * 0.5
      pos.y = GROUND_Y + Math.sin(bobPhase.current * 2) * 0.03
      if (store.isMoving) store.setIsMoving(false)
    }

    // Shadow disc
    if (shadowRef.current) {
      shadowRef.current.position.set(pos.x, GROUND_Y + 0.01, pos.z)
    }
  })

  return (
    <>
      <group ref={groupRef} position={[0, GROUND_Y, 0]} scale={1.3}>
        {/* Shadow disc */}
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

        {/* Clipboard */}
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
        <mesh position={[-0.22, 1.1, 0.12]} rotation={[0.5, 0, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.15, 6]} />
          <meshToonMaterial color="#333" />
        </mesh>
        <mesh position={[-0.22, 1.03, 0.16]}>
          <sphereGeometry args={[0.025, 6, 6]} />
          <meshToonMaterial color="#333" />
        </mesh>

        {/* Glow ring */}
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.45, 0.55, 24]} />
          <meshBasicMaterial color="#A8E6CF" transparent opacity={0.25} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* External shadow */}
      <mesh ref={shadowRef} position={[0, GROUND_Y + 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.6, 24]} />
        <meshBasicMaterial color="#1A1A1A" transparent opacity={0.2} />
      </mesh>
    </>
  )
}
