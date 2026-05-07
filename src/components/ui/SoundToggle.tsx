import { useState, useEffect } from 'react'

export default function SoundToggle() {
  const [enabled, setEnabled] = useState(false)

  // Sound logic will be wired up later with Howler, 
  // for now it just tracks state and displays a button.
  
  return (
    <button 
      onClick={() => setEnabled(!enabled)}
      className="fixed top-6 right-6 z-50 w-10 h-10 bg-ui-glass backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-ui-text hover:bg-white/10 transition-colors shadow-lg"
      aria-label="Toggle Sound"
      title={enabled ? "Mute Sound" : "Enable Sound"}
    >
      {enabled ? "🔊" : "🔈"}
    </button>
  )
}
