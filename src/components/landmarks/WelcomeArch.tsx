import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useLandmarkProximity } from '@/hooks/useLandmarkProximity'

export default function WelcomeArch({ position }: { position: [number, number, number] }) {
  useLandmarkProximity('welcome_arch', position, 4)
  const lanternRef1 = useRef<THREE.Group>(null)
  const lanternRef2 = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (lanternRef1.current) lanternRef1.current.position.y = 3.5 + Math.sin(t * 2) * 0.05
    if (lanternRef2.current) lanternRef2.current.position.y = 3.5 + Math.sin(t * 2 + Math.PI) * 0.05
  })

  return (
    <group position={position}>
      {/* Left Pillar */}
      <mesh position={[-1.8, 1.5, 0]} castShadow>
        <boxGeometry args={[0.5, 3, 0.5]} />
        <meshToonMaterial color="#C4B8A8" />
      </mesh>
      <mesh position={[-1.8, 0.2, 0]} castShadow>
        <boxGeometry args={[0.7, 0.4, 0.7]} />
        <meshToonMaterial color="#9E9585" />
      </mesh>

      {/* Right Pillar */}
      <mesh position={[1.8, 1.5, 0]} castShadow>
        <boxGeometry args={[0.5, 3, 0.5]} />
        <meshToonMaterial color="#C4B8A8" />
      </mesh>
      <mesh position={[1.8, 0.2, 0]} castShadow>
        <boxGeometry args={[0.7, 0.4, 0.7]} />
        <meshToonMaterial color="#9E9585" />
      </mesh>

      {/* Top beam */}
      <mesh position={[0, 3.2, 0]} castShadow>
        <boxGeometry args={[4.5, 0.5, 0.7]} />
        <meshToonMaterial color="#8B6B4A" />
      </mesh>
      {/* Decorative trim */}
      <mesh position={[0, 3.5, 0]} castShadow>
        <boxGeometry args={[4.8, 0.12, 0.8]} />
        <meshToonMaterial color="#6BAA75" />
      </mesh>

      {/* Signboard */}
      <mesh position={[0, 2.6, 0.36]} castShadow>
        <boxGeometry args={[2.8, 0.7, 0.08]} />
        <meshToonMaterial color="#2D2A4A" />
      </mesh>
      {/* Sign glow inlay */}
      <mesh position={[0, 2.6, 0.41]}>
        <planeGeometry args={[2.5, 0.45]} />
        <meshBasicMaterial color="#FFD56B" />
      </mesh>

      {/* Hanging lanterns */}
      <group ref={lanternRef1} position={[-1.2, 3.5, 0.4]}>
        <mesh><cylinderGeometry args={[0.02, 0.02, 0.5, 4]} /><meshToonMaterial color="#8B6B4A" /></mesh>
        <mesh position={[0, -0.35, 0]}>
          <cylinderGeometry args={[0.12, 0.15, 0.3, 6]} />
          <meshBasicMaterial color="#E63946" />
        </mesh>
        <pointLight position={[0, -0.35, 0]} intensity={0.6} color="#FFD56B" distance={3} />
      </group>
      <group ref={lanternRef2} position={[1.2, 3.5, 0.4]}>
        <mesh><cylinderGeometry args={[0.02, 0.02, 0.5, 4]} /><meshToonMaterial color="#8B6B4A" /></mesh>
        <mesh position={[0, -0.35, 0]}>
          <cylinderGeometry args={[0.12, 0.15, 0.3, 6]} />
          <meshBasicMaterial color="#E63946" />
        </mesh>
        <pointLight position={[0, -0.35, 0]} intensity={0.6} color="#FFD56B" distance={3} />
      </group>

      {/* Stepping stones in front */}
      <mesh position={[0, 0.05, 1.5]} receiveShadow><cylinderGeometry args={[0.3, 0.35, 0.08, 6]} /><meshToonMaterial color="#B5A99A" /></mesh>
      <mesh position={[0.5, 0.05, 2.2]} receiveShadow><cylinderGeometry args={[0.25, 0.3, 0.08, 6]} /><meshToonMaterial color="#C4B8A8" /></mesh>
      <mesh position={[-0.3, 0.05, 2.8]} receiveShadow><cylinderGeometry args={[0.28, 0.32, 0.08, 6]} /><meshToonMaterial color="#B5A99A" /></mesh>
    </group>
  )
}
