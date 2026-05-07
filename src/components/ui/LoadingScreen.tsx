import { useProgress } from '@react-three/drei'
import { useEffect, useState } from 'react'

export default function LoadingScreen({ onLoaded }: { onLoaded: () => void }) {
  const { progress } = useProgress()
  const [faded, setFaded] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    // If things load instantly (e.g. cached), ensure we at least show it briefly
    // But since this is a portfolio, we want to let it transition smoothly.
    if (progress === 100) {
      const t1 = setTimeout(() => {
        setFaded(true)
        const t2 = setTimeout(() => {
          setHidden(true)
          onLoaded()
        }, 600)
        return () => clearTimeout(t2)
      }, 500)
      return () => clearTimeout(t1)
    }
  }, [progress, onLoaded])

  if (hidden) return null

  return (
    <div 
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-sky-top transition-opacity duration-700 ease-in-out"
      style={{ opacity: faded ? 0 : 1, pointerEvents: faded ? 'none' : 'auto' }}
    >
       <div className="w-24 h-24 bg-sun-core rounded-full mb-8 shadow-[0_0_60px_rgba(255,213,107,0.6)] animate-pulse" />
       <h1 className="font-display text-4xl text-ui-text tracking-widest mb-2">PATRA WORLD</h1>
       <p className="font-mono text-sm text-sun-core mb-8">loading the island... {Math.round(progress)}%</p>
       <div className="w-64 h-1 bg-midnight rounded-full overflow-hidden">
         <div 
            className="h-full bg-sunset-coral transition-all duration-300" 
            style={{ width: `${progress}%` }} 
         />
       </div>
    </div>
  )
}
