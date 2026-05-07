import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useWorld } from '@/store/useWorld'

/**
 * Invisible ground plane for raycasting clicks.
 * On click: sets characterTarget in the store + spawns pulse ring.
 */
export default function useClickToMove() {
  const { camera, raycaster, pointer } = useThree()
  const groundRef = useRef<THREE.Mesh>(null)

  const handleClick = (e: any) => {
    e.stopPropagation()

    raycaster.setFromCamera(pointer, camera)

    if (!groundRef.current) return
    const intersects = raycaster.intersectObject(groundRef.current)

    if (intersects.length > 0) {
      const point = intersects[0].point.clone()
      // Clamp to island radius
      const dist = Math.sqrt(point.x ** 2 + point.z ** 2)
      if (dist > 14) {
        point.normalize().multiplyScalar(14)
      }
      point.y = 2 // Keep on surface
      useWorld.getState().setCharacterTarget(point)
    }
  }

  return { groundRef, handleClick }
}
