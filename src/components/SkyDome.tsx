import { useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

/**
 * A large inverted sphere with a vertical gradient shader
 * going from deep twilight (#2D2A4A) at the top to sunset coral (#FF8A5B)
 * at the horizon, with a warm gold band near the bottom.
 * Includes a fake sun disc.
 */
export default function SkyDome() {
  const sunRef = useRef<THREE.Mesh>(null)

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPos.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition).y;

          // Color stops
          vec3 skyTop     = vec3(0.176, 0.165, 0.290);  // #2D2A4A
          vec3 skyMid     = vec3(0.506, 0.388, 0.635);  // purple transition
          vec3 horizon    = vec3(1.0, 0.541, 0.357);     // #FF8A5B
          vec3 sunBand    = vec3(1.0, 0.835, 0.420);     // #FFD56B

          vec3 color;
          if (h > 0.3) {
            color = mix(skyMid, skyTop, smoothstep(0.3, 0.9, h));
          } else if (h > 0.05) {
            color = mix(horizon, skyMid, smoothstep(0.05, 0.3, h));
          } else if (h > -0.05) {
            color = mix(sunBand, horizon, smoothstep(-0.05, 0.05, h));
          } else {
            color = mix(vec3(0.1, 0.15, 0.25), sunBand, smoothstep(-0.4, -0.05, h));
          }

          gl_FragColor = vec4(color, 1.0);
        }
      `,
      side: THREE.BackSide,
      depthWrite: false,
    })
  }, [])

  // Gentle sun rotation
  useFrame(({ clock }) => {
    if (sunRef.current) {
      sunRef.current.rotation.y = clock.getElapsedTime() * 0.01
    }
  })

  return (
    <group>
      {/* Sky sphere */}
      <mesh material={material}>
        <sphereGeometry args={[80, 32, 32]} />
      </mesh>

      {/* Fake sun disc */}
      <mesh ref={sunRef} position={[40, 12, -30]}>
        <circleGeometry args={[5, 32]} />
        <meshBasicMaterial
          color="#FFD56B"
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Sun glow (larger, dimmer) */}
      <mesh position={[40, 12, -30]}>
        <circleGeometry args={[12, 32]} />
        <meshBasicMaterial
          color="#FF8A5B"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}
