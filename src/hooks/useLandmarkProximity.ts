import { useFrame } from '@react-three/fiber'
import { useWorld } from '@/store/useWorld'
import * as THREE from 'three'

export function useLandmarkProximity(id: string, position: THREE.Vector3 | [number, number, number], radius: number = 3) {
  const pos = Array.isArray(position) ? new THREE.Vector3(...position) : position

  useFrame(() => {
    const characterPos = useWorld.getState().characterPos
    const activePanel = useWorld.getState().activePanel
    const mode = useWorld.getState().mode

    // Don't trigger proximity changes while in contact modal or other modes
    if (mode !== 'explore') return 

    const dist = characterPos.distanceTo(pos)
    
    if (dist < radius) {
      if (activePanel !== id) {
        useWorld.getState().setActivePanel(id)
      }
    } else {
      if (activePanel === id) {
        useWorld.getState().setActivePanel(null)
      }
    }
  })
}
