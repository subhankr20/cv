import { create } from 'zustand'
import * as THREE from 'three'

interface WorldState {
  // Character
  characterPos: THREE.Vector3
  characterTarget: THREE.Vector3 | null
  isMoving: boolean

  // Panels
  activePanel: string | null

  // Mode
  mode: 'explore' | 'contact'

  // Actions
  setCharacterTarget: (target: THREE.Vector3) => void
  setCharacterPos: (pos: THREE.Vector3) => void
  setIsMoving: (moving: boolean) => void
  setActivePanel: (panel: string | null) => void
  setMode: (mode: 'explore' | 'contact') => void
}

export const useWorld = create<WorldState>((set) => ({
  characterPos: new THREE.Vector3(0, 2, 0),
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
