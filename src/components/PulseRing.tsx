import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { GROUND_Y } from '@/constants'

export default function PulseRing({ position }: { position: THREE.Vector3 }) {
  const ringRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.MeshBasicMaterial>(null)
  const scaleRef = useRef(0.2)
  const opacityRef = useRef(1)

  useFrame((_, delta) => {
    if (!ringRef.current || !materialRef.current) return
    scaleRef.current += delta * 4
    opacityRef.current -= delta * 1.5
    ringRef.current.scale.setScalar(scaleRef.current)
    materialRef.current.opacity = Math.max(0, opacityRef.current)
    if (opacityRef.current <= 0) ringRef.current.visible = false
  })

  return (
    <mesh
      ref={ringRef}
      position={[position.x, GROUND_Y + 0.03, position.z]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <ringGeometry args={[0.6, 0.8, 32]} />
      <meshBasicMaterial
        ref={materialRef}
        color="#A8E6CF"
        transparent
        opacity={1}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
