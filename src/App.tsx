import World from '@/components/World'
import ControlsHint from '@/components/ui/ControlsHint'
import InfoPanel from '@/components/ui/InfoPanel'
import ContactModal from '@/components/ui/ContactModal'

export default function App() {
  return (
    <div className="w-full h-full relative">
      <World />
      <ControlsHint />
      <InfoPanel />
      <ContactModal />

      {/* Title overlay */}
      <div className="fixed top-6 left-6 z-50 pointer-events-none">
        <h1 className="font-display text-2xl text-ui-text drop-shadow-lg tracking-wider">
          PATRA WORLD
        </h1>
      </div>
    </div>
  )
}
