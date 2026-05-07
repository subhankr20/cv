import { create } from 'zustand'
import * as THREE from 'three'
import { GROUND_Y } from '@/constants'

interface WorldState {
  characterPos: THREE.Vector3
  characterTarget: THREE.Vector3 | null
  isMoving: boolean
  activePanel: string | null
  mode: 'explore' | 'contact'
  setCharacterTarget: (target: THREE.Vector3) => void
  setCharacterPos: (pos: THREE.Vector3) => void
  setIsMoving: (moving: boolean) => void
  setActivePanel: (panel: string | null) => void
  setMode: (mode: 'explore' | 'contact') => void
}

export const useWorld = create<WorldState>((set) => ({
  characterPos: new THREE.Vector3(0, GROUND_Y, 0),
  characterTarget: null,
  isMoving: false,
  activePanel: null,
  mode: 'explore',
  setCharacterTarget: (target) => set({ characterTarget: target, isMoving: true }),
  setCharacterPos: (pos) => set({ characterPos: pos }),
  setIsMoving: (moving) => set({ isMoving: moving }),
  setActivePanel: (panel) => set({ activePanel: panel }),
  setMode: (mode) => set({ mode }),
}))
