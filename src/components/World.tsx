import { useState, useCallback, useRef, useEffect } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import Island from './Island'
import SkyDome from './SkyDome'
import Character from './Character'
import PulseRing from './PulseRing'
import Particles from './Particles'
import PhoneBooth from './landmarks/PhoneBooth'
import { useWorld } from '@/store/useWorld'

function ClickGround() {
  const [rings, setRings] = useState<{ id: number; pos: THREE.Vector3 }[]>([])

  const handleClick = useCallback((e: any) => {
    e.stopPropagation()
    const point = e.point.clone()

    // Clamp to island radius
    const dist = Math.sqrt(point.x ** 2 + point.z ** 2)
    if (dist > 14) return // Click outside island — ignore

    point.y = 2
    useWorld.getState().setCharacterTarget(point)

    // Spawn a pulse ring
    const id = Date.now()
    setRings((prev) => [...prev.slice(-4), { id, pos: point }])

    // Remove after 1s
    setTimeout(() => {
      setRings((prev) => prev.filter((r) => r.id !== id))
    }, 1000)
  }, [])

  return (
    <>
      {/* Invisible ground collider for raycasting */}
      <mesh
        position={[0, 1.8, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        onClick={handleClick}
        visible={false}
      >
        <circleGeometry args={[15, 32]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Pulse rings */}
      {rings.map((r) => (
        <PulseRing key={r.id} position={r.pos} />
      ))}
    </>
  )
}

function CameraController() {
  const mode = useWorld(state => state.mode)
  const isMoving = useWorld(state => state.isMoving)
  const controlsRef = useRef<any>(null)
  const { camera } = useThree()
  const idleTimer = useRef(0)

  useEffect(() => {
    if (mode === 'contact') {
      if (controlsRef.current) {
        controlsRef.current.enabled = false
        controlsRef.current.autoRotate = false
      }
      gsap.to(camera.position, {
        x: -7,
        y: 3.5,
        z: 7,
        duration: 1.2,
        ease: 'power2.inOut'
      })
      gsap.to(controlsRef.current.target, {
        x: -10,
        y: 2.5,
        z: 10,
        duration: 1.2,
        ease: 'power2.inOut'
      })
    } else {
      if (controlsRef.current) controlsRef.current.enabled = true
      gsap.to(camera.position, {
        x: 18,
        y: 14,
        z: 18,
        duration: 1.2,
        ease: 'power2.inOut'
      })
      gsap.to(controlsRef.current.target, {
        x: 0,
        y: 2,
        z: 0,
        duration: 1.2,
        ease: 'power2.inOut'
      })
    }
  }, [mode, camera])

  useFrame((_, delta) => {
    if (mode === 'explore' && !isMoving) {
      idleTimer.current += delta
      if (idleTimer.current > 8 && controlsRef.current && !controlsRef.current.autoRotate) {
        controlsRef.current.autoRotate = true
        controlsRef.current.autoRotateSpeed = 0.5
      }
    } else {
      idleTimer.current = 0
      if (controlsRef.current && controlsRef.current.autoRotate) {
        controlsRef.current.autoRotate = false
      }
    }
  })

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      minDistance={8}
      maxDistance={40}
      minPolarAngle={Math.PI * 0.15}
      maxPolarAngle={Math.PI * 0.45}
      enableDamping
      dampingFactor={0.05}
      target={[0, 2, 0]}
    />
  )
}

import WelcomeArch from './landmarks/WelcomeArch'
import Library from './landmarks/Library'
import DoorstepCulDeSac from './landmarks/DoorstepCulDeSac'
import PenGarden from './landmarks/PenGarden'
import DirectorsCut from './landmarks/DirectorsCut'
import ViralShrine from './landmarks/ViralShrine'

export default function World() {
  return (
    <Canvas
      camera={{
        position: [18, 14, 18],
        fov: 45,
        near: 0.1,
        far: 200,
      }}
      shadows
      gl={{ antialias: true, alpha: false }}
      style={{ width: '100%', height: '100%' }}
    >
      <SkyDome />

      {/* Warm golden-hour lighting */}
      <ambientLight intensity={0.4} color="#FFD56B" />
      <directionalLight
        position={[15, 20, 10]}
        intensity={1.6}
        color="#FF8A5B"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
      />
      <directionalLight
        position={[-10, 8, -10]}
        intensity={0.3}
        color="#7B8CDE"
      />

      <Island />
      <Character />
      <ClickGround />
      <Particles />
      
      {/* Landmarks */}
      <WelcomeArch position={[0, 0, 0]} />
      <Library position={[-8, 0, -8]} />
      <DoorstepCulDeSac position={[10, 0, 0]} />
      <PenGarden position={[8, 0, 8]} />
      <DirectorsCut position={[-5, 0, 10]} />
      <ViralShrine position={[0, 0, -11]} />
      
      <PhoneBooth position={[-10, 0, 10]} />

      <CameraController />
    </Canvas>
  )
}
