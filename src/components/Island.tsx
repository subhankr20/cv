import { useRef, useMemo } from 'react'
import * as THREE from 'three'

/**
 * Procedural low-poly floating island.
 * A cylinder with randomized top-face vertices for rolling terrain,
 * plus a darker underside to sell the "floating" look.
 */
export default function Island() {
  const meshRef = useRef<THREE.Mesh>(null)

  const geometry = useMemo(() => {
    const geo = new THREE.CylinderGeometry(15, 12, 3, 32, 4, false)
    const pos = geo.attributes.position
    const colors: number[] = []

    const grassTop = new THREE.Color('#6BAA75')
    const grassLight = new THREE.Color('#8FCB8B')
    const dirt = new THREE.Color('#8B7355')
    const rock = new THREE.Color('#C4B8A8')

    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i)
      const x = pos.getX(i)
      const z = pos.getZ(i)

      // Displace top vertices for rolling hills
      if (y > 0.5) {
        const dist = Math.sqrt(x * x + z * z)
        const noise =
          Math.sin(x * 0.5) * Math.cos(z * 0.4) * 1.2 +
          Math.sin(x * 1.2 + z * 0.8) * 0.5
        pos.setY(i, y + noise - dist * 0.02)

        // Grass color with variation
        const t = Math.random() * 0.4
        const col = grassTop.clone().lerp(grassLight, t)
        colors.push(col.r, col.g, col.b)
      } else if (y > -0.5) {
        // Edge — dirt
        colors.push(dirt.r, dirt.g, dirt.b)
      } else {
        // Underside — rocky
        // Pull bottom verts inward for tapered underside
        const scale = 0.6 + Math.random() * 0.2
        pos.setX(i, x * scale)
        pos.setZ(i, z * scale)
        colors.push(rock.r, rock.g, rock.b)
      }
    }

    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    geo.computeVertexNormals()
    return geo
  }, [])

  return (
    <group>
      {/* Main island body */}
      <mesh ref={meshRef} geometry={geometry} receiveShadow castShadow>
        <meshLambertMaterial vertexColors flatShading />
      </mesh>

      {/* Subtle footpath across the island */}
      <mesh position={[0, 1.7, 0]} rotation={[-Math.PI / 2, 0, 0.3]} receiveShadow>
        <planeGeometry args={[28, 1.2, 20, 1]} />
        <meshLambertMaterial color="#C4B8A8" transparent opacity={0.5} />
      </mesh>

      {/* Water plane far below for depth */}
      <mesh position={[0, -8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[200, 200]} />
        <meshBasicMaterial color="#1a3a5c" transparent opacity={0.3} />
      </mesh>
    </group>
  )
}
