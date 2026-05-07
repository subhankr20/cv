import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useLandmarkProximity } from '@/hooks/useLandmarkProximity'
import { useWorld } from '@/store/useWorld'

export default function ViralShrine({ position }: { position: [number, number, number] }) {
  useLandmarkProximity('viral_shrine', position, 5)
  const activePanel = useWorld(state => state.activePanel)
  const groupRef = useRef<THREE.Group>(null)
  const [counter, setCounter] = useState(0)
  const [triggered, setTriggered] = useState(false)
  const confettiRef = useRef<THREE.Group>(null)

  // Slab hover animation
  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    // Animate the phone slabs
    const slabs = groupRef.current.children.filter((_, i) => i < 6)
    slabs.forEach((slab, i) => {
      slab.position.y = 0.4 + i * 1.0 + Math.sin(t * 1.5 + i * 0.8) * 0.12
      slab.rotation.y = Math.sin(t * 0.4 + i * 0.6) * 0.08
    })
    // Confetti burst
    if (confettiRef.current && triggered) {
      confettiRef.current.children.forEach((p, i) => {
        p.position.y -= 0.02
        p.rotation.x += 0.05
        p.rotation.z += 0.03
        if (p.position.y < 0) p.position.y = 6 + Math.random() * 2
      })
    }
  })

  // Counter animation
  useEffect(() => {
    if (activePanel === 'viral_shrine' && !triggered) {
      setTriggered(true)
      const target = 2300000
      const duration = 2000
      const start = performance.now()
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(2, -10 * p)
        setCounter(Math.floor(target * eased))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }
  }, [activePanel, triggered])

  const displayCounter = counter >= 2300000 ? '2.3M' : counter.toLocaleString()

  return (
    <group position={position} ref={groupRef}>
      {/* 6 Stacked phone-shaped slabs — translucent and glowing */}
      {[...Array(6)].map((_, i) => (
        <group key={i} position={[0, 0.4 + i * 1.0, 0]}>
          {/* Phone body */}
          <mesh castShadow>
            <boxGeometry args={[0.8, 0.9, 0.08]} />
            <meshPhysicalMaterial
              color={['#E63946', '#FF8A5B', '#FFD56B', '#A8E6CF', '#7B8CDE', '#C4A8E6'][i]}
              transmission={0.6}
              transparent
              roughness={0.1}
              emissive={['#E63946', '#FF8A5B', '#FFD56B', '#A8E6CF', '#7B8CDE', '#C4A8E6'][i]}
              emissiveIntensity={0.3}
            />
          </mesh>
          {/* Screen inlay */}
          <mesh position={[0, 0, 0.045]}>
            <boxGeometry args={[0.65, 0.75, 0.005]} />
            <meshBasicMaterial color="#1A1A1A" transparent opacity={0.5} />
          </mesh>
          {/* Notch */}
          <mesh position={[0, 0.38, 0.045]}>
            <boxGeometry args={[0.15, 0.04, 0.005]} />
            <meshBasicMaterial color="#1A1A1A" />
          </mesh>
        </group>
      ))}

      {/* The big counter display — floating above the tower */}
      <group position={[0, 7, 0]}>
        {/* Holographic backing */}
        <mesh>
          <boxGeometry args={[2.5, 0.8, 0.02]} />
          <meshBasicMaterial color="#E63946" transparent opacity={0.15} />
        </mesh>
      </group>

      {/* Confetti particles (only when triggered) */}
      {triggered && (
        <group ref={confettiRef}>
          {Array.from({ length: 20 }).map((_, i) => (
            <mesh key={i} position={[(Math.random() - 0.5) * 3, 5 + Math.random() * 4, (Math.random() - 0.5) * 3]}>
              <boxGeometry args={[0.08, 0.08, 0.01]} />
              <meshBasicMaterial
                color={['#E63946', '#FFD56B', '#A8E6CF', '#FF8A5B', '#7B8CDE'][i % 5]}
              />
            </mesh>
          ))}
        </group>
      )}

      {/* Antenna/spire on top */}
      <mesh position={[0, 6.6, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.06, 0.8, 6]} />
        <meshToonMaterial color="#E63946" />
      </mesh>
      <mesh position={[0, 7.1, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial color="#FFD56B" />
      </mesh>

      <pointLight position={[0, 4, 1]} intensity={2} color="#E63946" distance={8} />
      <pointLight position={[0, 7, 0]} intensity={0.5} color="#FFD56B" distance={4} />
    </group>
  )
}
