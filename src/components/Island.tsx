import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { GROUND_Y } from '@/constants'

/* ── Low-poly tree ───────────────────────────────────────────── */
function Tree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.1, 1.0, 5]} />
        <meshToonMaterial color="#8B6B4A" />
      </mesh>
      <mesh position={[0, 1.3, 0]} castShadow>
        <coneGeometry args={[0.55, 1.0, 5]} />
        <meshToonMaterial color="#3D7A4A" />
      </mesh>
      <mesh position={[0, 1.9, 0]} castShadow>
        <coneGeometry args={[0.4, 0.8, 5]} />
        <meshToonMaterial color="#4A8C5C" />
      </mesh>
      <mesh position={[0, 2.3, 0]} castShadow>
        <coneGeometry args={[0.28, 0.6, 5]} />
        <meshToonMaterial color="#5AA66A" />
      </mesh>
    </group>
  )
}

/* ── Rock cluster ────────────────────────────────────────────── */
function Rock({ position, scale = 1, color = '#9E9585' }: { position: [number, number, number]; scale?: number; color?: string }) {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow rotation={[0.3, 0.6, 0.1]}>
        <dodecahedronGeometry args={[0.35, 0]} />
        <meshToonMaterial color={color} />
      </mesh>
      <mesh position={[0.25, -0.08, 0.15]} castShadow rotation={[0.1, 1.5, 0]}>
        <dodecahedronGeometry args={[0.2, 0]} />
        <meshToonMaterial color="#B5A99A" />
      </mesh>
    </group>
  )
}

/* ── Grass tuft ──────────────────────────────────────────────── */
function GrassTuft({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.z = Math.sin(clock.getElapsedTime() * 1.8 + position[0] * 3) * 0.06
  })
  return (
    <group position={position} ref={ref}>
      <mesh rotation={[0, 0, -0.12]}><boxGeometry args={[0.03, 0.28, 0.015]} /><meshToonMaterial color="#4A8C5C" /></mesh>
      <mesh rotation={[0, 0.9, 0.1]} position={[0.04, 0, 0]}><boxGeometry args={[0.03, 0.24, 0.015]} /><meshToonMaterial color="#5AA66A" /></mesh>
      <mesh rotation={[0, -0.7, -0.14]} position={[-0.03, 0, 0.02]}><boxGeometry args={[0.03, 0.2, 0.015]} /><meshToonMaterial color="#6BC07A" /></mesh>
    </group>
  )
}

/* ── Flower ───────────────────────────────────────────────────── */
function Flower({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.012, 0.018, 0.24, 4]} />
        <meshToonMaterial color="#5AA66A" />
      </mesh>
      <mesh position={[0, 0.28, 0]}>
        <sphereGeometry args={[0.05, 6, 6]} />
        <meshToonMaterial color={color} />
      </mesh>
    </group>
  )
}

/* ── Main Island ─────────────────────────────────────────────── */
export default function Island() {
  const geometry = useMemo(() => {
    // CylinderGeometry: top radius 15, bottom radius 11, height 4
    // Centered at origin, so top face = Y+2, bottom face = Y-2
    const geo = new THREE.CylinderGeometry(15, 11, 4, 48, 4, false)
    const pos = geo.attributes.position
    const colors: number[] = []

    const grassA = new THREE.Color('#5AA66A')
    const grassB = new THREE.Color('#6BAA75')
    const grassC = new THREE.Color('#8FCB8B')
    const dirt = new THREE.Color('#8B7355')
    const rock = new THREE.Color('#6E635A')

    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i)
      const x = pos.getX(i)
      const z = pos.getZ(i)

      if (y > 1.5) {
        // ─── TOP FACE: KEEP PERFECTLY FLAT ───
        // No Y displacement at all! Just color variation.
        const t = (Math.sin(x * 0.6) * Math.cos(z * 0.5) + 1) * 0.5
        const col = t > 0.6 ? grassC.clone() : t > 0.3 ? grassB.clone() : grassA.clone()
        colors.push(col.r, col.g, col.b)
      } else if (y > -0.5) {
        // ─── SIDES: sculpt inward for organic feel ───
        const noise = Math.sin(x * 0.8 + z * 0.6) * 0.3
        pos.setX(i, x + x * noise * 0.02)
        pos.setZ(i, z + z * noise * 0.02)
        colors.push(dirt.r, dirt.g, dirt.b)
      } else {
        // ─── BOTTOM: taper aggressively for floating rock look ───
        const scale = 0.4 + Math.random() * 0.25
        pos.setX(i, x * scale)
        pos.setZ(i, z * scale)
        pos.setY(i, y - Math.random() * 1.2)
        colors.push(rock.r, rock.g, rock.b)
      }
    }

    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    geo.computeVertexNormals()
    return geo
  }, [])

  // ─── Scatter positions ────────────────────────────────────────
  const G = GROUND_Y // shorthand

  const trees = useMemo(() => [
    [5, G, -6], [-6, G, -4], [3, G, -10], [-3, G, 5], [8, G, 4],
    [-9, G, 2], [11, G, -2], [-4, G, -9], [7, G, -8], [-7, G, 6],
    [2, G, 9], [-11, G, -1], [6, G, 2], [-2, G, -7],
  ] as [number, number, number][], [G])

  const rocks = useMemo(() => [
    [4, G, 3], [-3, G, -3], [9, G, -1], [-8, G, -6],
    [0, G, -8], [6, G, -5], [-5, G, 8], [10, G, 3],
    [-10, G, -4], [3, G, 6],
  ] as [number, number, number][], [G])

  const grassTufts = useMemo(() =>
    Array.from({ length: 50 }, () => {
      const x = (Math.random() - 0.5) * 26
      const z = (Math.random() - 0.5) * 26
      if (Math.sqrt(x * x + z * z) > 13) return null
      return [x, G, z] as [number, number, number]
    }).filter(Boolean) as [number, number, number][],
  [G])

  const flowers = useMemo(() => [
    { pos: [2, G, 3] as [number, number, number], color: '#FF6B8A' },
    { pos: [-4, G, 6] as [number, number, number], color: '#FFD56B' },
    { pos: [7, G, -2] as [number, number, number], color: '#A8E6CF' },
    { pos: [-6, G, -1] as [number, number, number], color: '#FF8A5B' },
    { pos: [1, G, -5] as [number, number, number], color: '#C4A8E6' },
    { pos: [-9, G, 4] as [number, number, number], color: '#FF6B8A' },
    { pos: [5, G, 7] as [number, number, number], color: '#FFD56B' },
    { pos: [-1, G, 2] as [number, number, number], color: '#7B8CDE' },
  ], [G])

  return (
    <group>
      {/* Main island body */}
      <mesh geometry={geometry} receiveShadow castShadow>
        <meshLambertMaterial vertexColors flatShading />
      </mesh>

      {/* Dirt paths — flat on the surface */}
      <mesh position={[0, G + 0.01, 0]} rotation={[-Math.PI / 2, 0, 0.3]} receiveShadow>
        <planeGeometry args={[26, 0.7]} />
        <meshLambertMaterial color="#C4B8A8" transparent opacity={0.35} />
      </mesh>
      <mesh position={[1, G + 0.01, 2]} rotation={[-Math.PI / 2, 0, -0.5]} receiveShadow>
        <planeGeometry args={[16, 0.6]} />
        <meshLambertMaterial color="#C4B8A8" transparent opacity={0.3} />
      </mesh>
      <mesh position={[-3, G + 0.01, -2]} rotation={[-Math.PI / 2, 0, 1.2]} receiveShadow>
        <planeGeometry args={[12, 0.5]} />
        <meshLambertMaterial color="#B5A99A" transparent opacity={0.25} />
      </mesh>

      {/* Trees — all at GROUND_Y */}
      {trees.map((pos, i) => <Tree key={`t${i}`} position={pos} scale={0.7 + (i % 5) * 0.15} />)}

      {/* Rocks — all at GROUND_Y */}
      {rocks.map((pos, i) => <Rock key={`r${i}`} position={pos} scale={0.7 + (i % 3) * 0.3} />)}

      {/* Grass tufts — all at GROUND_Y */}
      {grassTufts.map((pos, i) => <GrassTuft key={`g${i}`} position={pos} />)}

      {/* Flowers — all at GROUND_Y */}
      {flowers.map((f, i) => <Flower key={`f${i}`} position={f.pos} color={f.color} />)}

      {/* Ocean far below */}
      <mesh position={[0, -6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[120, 64]} />
        <meshBasicMaterial color="#1a3a5c" transparent opacity={0.2} />
      </mesh>

      {/* Subtle edge glow ring */}
      <mesh position={[0, 0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[14.5, 15.5, 48]} />
        <meshBasicMaterial color="#A8E6CF" transparent opacity={0.06} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}
