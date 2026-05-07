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
import WelcomeArch from './landmarks/WelcomeArch'
import Library from './landmarks/Library'
import DoorstepCulDeSac from './landmarks/DoorstepCulDeSac'
import PenGarden from './landmarks/PenGarden'
import DirectorsCut from './landmarks/DirectorsCut'
import ViralShrine from './landmarks/ViralShrine'
import PhoneBooth from './landmarks/PhoneBooth'
import TreasureChest from './landmarks/TreasureChest'
import { useWorld } from '@/store/useWorld'
import { GROUND_Y, ISLAND_RADIUS } from '@/constants'

/* ── Click-to-move ground plane ──────────────────────────────── */
function ClickGround() {
  const [rings, setRings] = useState<{ id: number; pos: THREE.Vector3 }[]>([])

  const handleClick = useCallback((e: any) => {
    e.stopPropagation()
    const point = e.point.clone()

    const dist = Math.sqrt(point.x ** 2 + point.z ** 2)
    if (dist > ISLAND_RADIUS) return

    point.y = GROUND_Y
    useWorld.getState().setCharacterTarget(point)

    const id = Date.now()
    setRings((prev) => [...prev.slice(-3), { id, pos: point }])
    setTimeout(() => setRings((prev) => prev.filter((r) => r.id !== id)), 900)
  }, [])

  return (
    <>
      <mesh
        position={[0, GROUND_Y, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        onClick={handleClick}
        visible={false}
      >
        <circleGeometry args={[ISLAND_RADIUS + 1, 48]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      {rings.map((r) => (
        <PulseRing key={r.id} position={r.pos} />
      ))}
    </>
  )
}

/* ── Camera controller ───────────────────────────────────────── */
function CameraController() {
  const mode = useWorld(state => state.mode)
  const isMoving = useWorld(state => state.isMoving)
  const controlsRef = useRef<any>(null)
  const { camera } = useThree()
  const idleTimer = useRef(0)

  useEffect(() => {
    if (!controlsRef.current) return
    if (mode === 'contact') {
      controlsRef.current.enabled = false
      controlsRef.current.autoRotate = false
      gsap.to(camera.position, { x: -7, y: 5, z: 7, duration: 1.2, ease: 'power2.inOut' })
      gsap.to(controlsRef.current.target, { x: -10, y: GROUND_Y + 1, z: 10, duration: 1.2, ease: 'power2.inOut' })
    } else {
      controlsRef.current.enabled = true
      gsap.to(camera.position, { x: 18, y: 14, z: 18, duration: 1.2, ease: 'power2.inOut' })
      gsap.to(controlsRef.current.target, { x: 0, y: GROUND_Y, z: 0, duration: 1.2, ease: 'power2.inOut' })
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
      if (controlsRef.current?.autoRotate) controlsRef.current.autoRotate = false
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
      target={[0, GROUND_Y, 0]}
    />
  )
}

/* ── World canvas ────────────────────────────────────────────── */
export default function World() {
  // All landmarks placed at GROUND_Y on the XZ plane
  const G = GROUND_Y

  return (
    <Canvas
      camera={{ position: [18, 14, 18], fov: 45, near: 0.1, far: 200 }}
      shadows
      gl={{ antialias: true, alpha: false }}
      style={{ width: '100%', height: '100%' }}
    >
      <SkyDome />

      <ambientLight intensity={0.5} color="#FFD56B" />
      <directionalLight
        position={[15, 20, 10]}
        intensity={1.8}
        color="#FF8A5B"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
      />
      <directionalLight position={[-10, 8, -10]} intensity={0.35} color="#7B8CDE" />
      {/* Hemisphere for softer fill */}
      <hemisphereLight args={['#FF8A5B', '#6BAA75', 0.3]} />

      <Island />
      <Character />
      <ClickGround />
      <Particles />

      {/* Landmarks — all Y = GROUND_Y so they sit on the surface */}
      <WelcomeArch    position={[0, G, 0]} />
      <Library        position={[-8, G, -7]} />
      <DoorstepCulDeSac position={[9, G, 0]} />
      <PenGarden      position={[7, G, 7]} />
      <DirectorsCut   position={[-4, G, 8]} />
      <ViralShrine    position={[0, G, -10]} />
      <PhoneBooth     position={[-9, G, 8]} />
      <TreasureChest  position={[5, G, -5]} />

      <CameraController />
    </Canvas>
  )
}
