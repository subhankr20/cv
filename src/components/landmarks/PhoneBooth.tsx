import { useRef, useState } from 'react'
import * as THREE from 'three'
import { useLandmarkProximity } from '@/hooks/useLandmarkProximity'
import { useWorld } from '@/store/useWorld'

export default function PhoneBooth({ position }: { position: [number, number, number] }) {
  useLandmarkProximity('phone_booth', position, 3.5)
  const setMode = useWorld((state) => state.setMode)
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

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
      {/* Booth Base/Floor */}
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.2, 1.2]} />
        <meshToonMaterial color="#C4B8A8" />
      </mesh>

      {/* Booth Body */}
      <mesh position={[0, 1.7, 0]} castShadow>
        <boxGeometry args={[1, 3, 1]} />
        <meshToonMaterial color="#E63946" />
        {/* Soft outline if hovered */}
        {hovered && (
          <meshBasicMaterial color="#ffffff" side={THREE.BackSide} wireframe={true} wireframeLinewidth={2} />
        )}
      </mesh>
      
      {/* Glass Panels */}
      <mesh position={[0, 1.8, 0.51]}>
        <boxGeometry args={[0.8, 1.8, 0.05]} />
        <meshPhysicalMaterial color="#ffffff" transmission={0.9} opacity={1} transparent roughness={0.1} />
      </mesh>
      <mesh position={[0.51, 1.8, 0]}>
        <boxGeometry args={[0.05, 1.8, 0.8]} />
        <meshPhysicalMaterial color="#ffffff" transmission={0.9} opacity={1} transparent roughness={0.1} />
      </mesh>
      <mesh position={[-0.51, 1.8, 0]}>
        <boxGeometry args={[0.05, 1.8, 0.8]} />
        <meshPhysicalMaterial color="#ffffff" transmission={0.9} opacity={1} transparent roughness={0.1} />
      </mesh>

      {/* Roof */}
      <mesh position={[0, 3.3, 0]} castShadow>
        <cylinderGeometry args={[0.7, 0.7, 0.2, 4]} />
        <meshToonMaterial color="#E63946" />
      </mesh>
      <mesh position={[0, 3.5, 0]} castShadow>
        <sphereGeometry args={[0.7, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshToonMaterial color="#E63946" />
      </mesh>

      {/* Interior Light */}
      <pointLight position={[0, 2.8, 0]} intensity={1.5} color="#FFD56B" distance={8} />
    </group>
  )
}
