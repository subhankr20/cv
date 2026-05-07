import { createContext, useContext } from 'react';

export const ScrollContext = createContext<gsap.core.Tween | null>(null);
export const useScrollTween = () => useContext(ScrollContext);
