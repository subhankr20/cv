import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* ── Low-poly tree ───────────────────────────────────────────── */
function Tree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.12, 1.2, 6]} />
        <meshToonMaterial color="#8B6B4A" />
      </mesh>
      <mesh position={[0, 1.6, 0]} castShadow>
        <coneGeometry args={[0.6, 1.2, 6]} />
        <meshToonMaterial color="#4A8C5C" />
      </mesh>
      <mesh position={[0, 2.2, 0]} castShadow>
        <coneGeometry args={[0.45, 0.9, 6]} />
        <meshToonMaterial color="#5AA66A" />
      </mesh>
      <mesh position={[0, 2.7, 0]} castShadow>
        <coneGeometry args={[0.3, 0.7, 6]} />
        <meshToonMaterial color="#6BC07A" />
      </mesh>
    </group>
  )
}

/* ── Rock cluster ────────────────────────────────────────────── */
function Rock({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow rotation={[0.2, 0.5, 0.1]}>
        <dodecahedronGeometry args={[0.4, 0]} />
        <meshToonMaterial color="#9E9585" />
      </mesh>
      <mesh position={[0.3, -0.1, 0.2]} castShadow rotation={[0.1, 1.2, 0]}>
        <dodecahedronGeometry args={[0.25, 0]} />
        <meshToonMaterial color="#B5A99A" />
      </mesh>
    </group>
  )
}

/* ── Grass tuft ──────────────────────────────────────────────── */
function GrassTuft({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 2 + position[0]) * 0.05
    }
  })
  return (
    <group position={position} ref={groupRef}>
      <mesh rotation={[0, 0, -0.1]}>
        <boxGeometry args={[0.04, 0.35, 0.02]} />
        <meshToonMaterial color="#5AA66A" />
      </mesh>
      <mesh rotation={[0, 0.8, 0.1]} position={[0.05, 0, 0]}>
        <boxGeometry args={[0.04, 0.3, 0.02]} />
        <meshToonMaterial color="#6BC07A" />
      </mesh>
      <mesh rotation={[0, -0.6, -0.15]} position={[-0.04, 0, 0.02]}>
        <boxGeometry args={[0.04, 0.25, 0.02]} />
        <meshToonMaterial color="#4A8C5C" />
      </mesh>
    </group>
  )
}

/* ── Flower ───────────────────────────────────────────────────── */
function Flower({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.5
  })
  return (
    <group position={position} ref={ref}>
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.015, 0.02, 0.3, 4]} />
        <meshToonMaterial color="#6BAA75" />
      </mesh>
      <mesh position={[0, 0.35, 0]}>
        <sphereGeometry args={[0.06, 6, 6]} />
        <meshToonMaterial color={color} />
      </mesh>
    </group>
  )
}

/* ── Main Island ─────────────────────────────────────────────── */
export default function Island() {
  const geometry = useMemo(() => {
    const geo = new THREE.CylinderGeometry(15, 11, 4, 48, 6, false)
    const pos = geo.attributes.position
    const colors: number[] = []

    const grassTop = new THREE.Color('#5AA66A')
    const grassLight = new THREE.Color('#8FCB8B')
    const grassDark = new THREE.Color('#3D7A4A')
    const dirt = new THREE.Color('#8B7355')
    const rock = new THREE.Color('#7A6E60')

    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i)
      const x = pos.getX(i)
      const z = pos.getZ(i)

      if (y > 0.5) {
        // Top surface — rolling hills
        const dist = Math.sqrt(x * x + z * z)
        const noise =
          Math.sin(x * 0.4 + 1.0) * Math.cos(z * 0.35) * 1.5 +
          Math.sin(x * 1.1 + z * 0.7) * 0.6 +
          Math.cos(x * 0.2 - z * 0.9) * 0.8
        pos.setY(i, y + noise - dist * 0.015)

        const t = (Math.sin(x * 0.8) + 1) * 0.5
        const col = grassDark.clone().lerp(t > 0.6 ? grassLight : grassTop, t)
        colors.push(col.r, col.g, col.b)
      } else if (y > -0.8) {
        // Side — dirt band
        colors.push(dirt.r, dirt.g, dirt.b)
      } else {
        // Underside — jagged rock
        const scale = 0.5 + Math.random() * 0.3
        pos.setX(i, x * scale)
        pos.setZ(i, z * scale)
        pos.setY(i, y - Math.random() * 0.8)
        colors.push(rock.r, rock.g, rock.b)
      }
    }

    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    geo.computeVertexNormals()
    return geo
  }, [])

  // Scatter positions for decoration
  const trees = useMemo(
    () => [
      [5, 2, -6], [-6, 2, -4], [3, 2, -10], [-3, 2, 5], [8, 2, 5],
      [-9, 2, 2], [11, 2, -3], [-4, 2, -9], [7, 2, -9], [-7, 2, 7],
      [2, 2, 8], [-11, 2, -2], [6, 2, 3], [-2, 2, -7],
    ] as [number, number, number][],
    []
  )

  const rocks = useMemo(
    () => [
      [4, 1.8, 3], [-3, 1.8, -3], [9, 1.8, -1], [-8, 1.8, -6],
      [0, 1.8, -9], [6, 1.8, -5], [-5, 1.8, 8], [10, 1.8, 4],
    ] as [number, number, number][],
    []
  )

  const grassTufts = useMemo(
    () =>
      Array.from({ length: 40 }, () => [
        (Math.random() - 0.5) * 24,
        1.9,
        (Math.random() - 0.5) * 24,
      ] as [number, number, number]).filter(
        ([x, _, z]) => Math.sqrt(x * x + z * z) < 13
      ),
    []
  )

  const flowers = useMemo(
    () => [
      { pos: [2, 1.9, 3] as [number, number, number], color: '#FF6B8A' },
      { pos: [-4, 1.9, 6] as [number, number, number], color: '#FFD56B' },
      { pos: [7, 1.9, -2] as [number, number, number], color: '#A8E6CF' },
      { pos: [-6, 1.9, -1] as [number, number, number], color: '#FF8A5B' },
      { pos: [1, 1.9, -5] as [number, number, number], color: '#C4A8E6' },
      { pos: [-9, 1.9, 4] as [number, number, number], color: '#FF6B8A' },
      { pos: [5, 1.9, 7] as [number, number, number], color: '#FFD56B' },
    ],
    []
  )

  return (
    <group>
      {/* Main island body */}
      <mesh geometry={geometry} receiveShadow castShadow>
        <meshLambertMaterial vertexColors flatShading />
      </mesh>

      {/* Winding footpath */}
      <mesh position={[0, 2.01, 0]} rotation={[-Math.PI / 2, 0, 0.3]} receiveShadow>
        <planeGeometry args={[28, 0.8, 20, 1]} />
        <meshLambertMaterial color="#C4B8A8" transparent opacity={0.4} />
      </mesh>
      <mesh position={[2, 2.01, 3]} rotation={[-Math.PI / 2, 0, -0.6]} receiveShadow>
        <planeGeometry args={[18, 0.7, 12, 1]} />
        <meshLambertMaterial color="#C4B8A8" transparent opacity={0.35} />
      </mesh>

      {/* Trees */}
      {trees.map((pos, i) => (
        <Tree key={`t${i}`} position={pos} scale={0.7 + Math.random() * 0.6} />
      ))}

      {/* Rocks */}
      {rocks.map((pos, i) => (
        <Rock key={`r${i}`} position={pos} scale={0.8 + Math.random() * 0.5} />
      ))}

      {/* Grass tufts */}
      {grassTufts.map((pos, i) => (
        <GrassTuft key={`g${i}`} position={pos} />
      ))}

      {/* Flowers */}
      {flowers.map((f, i) => (
        <Flower key={`f${i}`} position={f.pos} color={f.color} />
      ))}

      {/* Water plane far below */}
      <mesh position={[0, -6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[100, 64]} />
        <meshBasicMaterial color="#1a3a5c" transparent opacity={0.25} />
      </mesh>

      {/* Edge glow ring — subtle rim light around island */}
      <mesh position={[0, 0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[14.5, 15.5, 48]} />
        <meshBasicMaterial color="#A8E6CF" transparent opacity={0.08} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}
