import { useFrame } from '@react-three/fiber'
import { useWorld } from '@/store/useWorld'

/**
 * Triggers a panel when the character is within `radius` units on the XZ plane.
 * Uses XZ-only distance so Y differences don't break proximity.
 */
export function useLandmarkProximity(id: string, position: [number, number, number], radius: number = 4) {
  useFrame(() => {
    const { characterPos, activePanel, mode } = useWorld.getState()
    if (mode !== 'explore') return

    // XZ-only distance
    const dx = characterPos.x - position[0]
    const dz = characterPos.z - position[2]
    const dist = Math.sqrt(dx * dx + dz * dz)

    if (dist < radius) {
      if (activePanel !== id) useWorld.getState().setActivePanel(id)
    } else {
      if (activePanel === id) useWorld.getState().setActivePanel(null)
    }
  })
}
