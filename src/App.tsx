import { useState, Suspense } from 'react'
import World from '@/components/World'
import ControlsHint from '@/components/ui/ControlsHint'
import InfoPanel from '@/components/ui/InfoPanel'
import ContactModal from '@/components/ui/ContactModal'
import LoadingScreen from '@/components/ui/LoadingScreen'
import PlainCV from '@/components/ui/PlainCV'
import SoundToggle from '@/components/ui/SoundToggle'

export default function App() {
  const [showPlainCV, setShowPlainCV] = useState(false)

  return (
    <div className="w-full h-full relative">
      <LoadingScreen />

      <Suspense fallback={null}>
        <World />
      </Suspense>

      <ControlsHint />
      <InfoPanel />
      <ContactModal />
      <SoundToggle />

      {/* Title + Plain CV button */}
      <div className="fixed top-6 left-6 z-50 pointer-events-none flex flex-col gap-2">
        <h1 className="font-display text-2xl text-ui-text drop-shadow-lg tracking-wider">
          SUBHANKAR WORLD
        </h1>
        <button
          onClick={() => setShowPlainCV(true)}
          className="pointer-events-auto self-start px-3 py-1 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded border border-white/20 text-xs font-mono transition-colors"
        >
          📄 Plain CV
        </button>
      </div>

      {showPlainCV && <PlainCV onClose={() => setShowPlainCV(false)} />}
    </div>
  )
}
