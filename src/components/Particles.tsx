import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Floating ambient dust motes / bokeh particles.
 * 80 max for performance.
 */
export default function Particles() {
  const pointsRef = useRef<THREE.Points>(null)
  const count = 80

  const positions = useRef(
    Float32Array.from({ length: count * 3 }, (_, i) => {
      const axis = i % 3
      if (axis === 1) return Math.random() * 10 + 3 // y: above island
      return (Math.random() - 0.5) * 30 // x/z spread
    })
  ).current

  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    const pos = pointsRef.current.geometry.attributes.position
    const time = clock.getElapsedTime()

    for (let i = 0; i < count; i++) {
      const idx = i * 3
      pos.array[idx + 1] += Math.sin(time + i) * 0.003
      // Gentle drift
      pos.array[idx] += Math.sin(time * 0.3 + i * 0.5) * 0.002
    }
    pos.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#FFD56B"
        size={0.15}
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}
