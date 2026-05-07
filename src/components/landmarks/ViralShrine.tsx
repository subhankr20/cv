import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { useLandmarkProximity } from '@/hooks/useLandmarkProximity'
import { useWorld } from '@/store/useWorld'

export default function ViralShrine({ position }: { position: [number, number, number] }) {
  useLandmarkProximity('viral_shrine', position, 4.5)
  const groupRef = useRef<THREE.Group>(null)
  const activePanel = useWorld(state => state.activePanel)
  const [counter, setCounter] = useState(0)
  const [triggered, setTriggered] = useState(false)

  // Floating animation for slabs
  useFrame(({ clock }) => {
    if (groupRef.current) {
      const time = clock.getElapsedTime()
      // Animate the slabs (children 0 to 4)
      for (let i = 0; i < 5; i++) {
        const slab = groupRef.current.children[i]
        if (slab && slab.type === 'Mesh') {
          slab.position.y = (i * 0.8) + 0.5 + Math.sin(time * 2 + i) * 0.1
          slab.rotation.y = Math.sin(time * 0.5 + i) * 0.1
        }
      }
    }
  })

  // Counter animation when approached
  useEffect(() => {
    if (activePanel === 'viral_shrine' && !triggered) {
      setTriggered(true)
      let current = 0
      const target = 2300000
      const duration = 1500 // ms
      const startTime = performance.now()

      const updateCounter = (time: number) => {
        const elapsed = time - startTime
        const progress = Math.min(elapsed / duration, 1)
        // Ease out expo
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
        current = Math.floor(target * easeProgress)
        setCounter(current)

        if (progress < 1) {
          requestAnimationFrame(updateCounter)
        }
      }
      requestAnimationFrame(updateCounter)
    }
  }, [activePanel, triggered])

  // Format counter to 2.3M style if maxed, or commas during tick
  const displayCounter = counter >= 2300000 ? "2.3M VIEWS" : counter.toLocaleString()

  return (
    <group position={position} ref={groupRef}>
      {/* 5 Stacked smartphone-like slabs */}
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[0, (i * 0.8) + 0.5, 0]} castShadow>
          <boxGeometry args={[1.5, 0.6, 0.15]} />
          <meshPhysicalMaterial 
            color={i % 2 === 0 ? "#E63946" : "#FF8A5B"} 
            transmission={0.8} 
            opacity={1} 
            transparent 
            roughness={0.2} 
            emissive={i % 2 === 0 ? "#E63946" : "#FF8A5B"}
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}

      {/* Holographic Counter */}
      <Text
        position={[0, 5.5, 0]}
        fontSize={0.8}
        color="#FFF8EC"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#E63946"
      >
        {displayCounter}
      </Text>

      <pointLight position={[0, 3, 1]} intensity={1.5} color="#E63946" distance={6} />
    </group>
  )
}
