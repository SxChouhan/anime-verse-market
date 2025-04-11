
import * as React from "react"

// More granular breakpoints for better responsiveness
const BREAKPOINTS = {
  mobile: 640,  // sm
  tablet: 768,  // md
  laptop: 1024, // lg
  desktop: 1280 // xl
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${BREAKPOINTS.mobile - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < BREAKPOINTS.mobile)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < BREAKPOINTS.mobile)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = React.useState<string>("desktop")
  
  React.useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth
      if (width < BREAKPOINTS.mobile) {
        setBreakpoint("mobile")
      } else if (width < BREAKPOINTS.tablet) {
        setBreakpoint("tablet")
      } else if (width < BREAKPOINTS.laptop) {
        setBreakpoint("laptop")
      } else {
        setBreakpoint("desktop")
      }
    }
    
    window.addEventListener("resize", updateBreakpoint)
    updateBreakpoint()
    
    return () => window.removeEventListener("resize", updateBreakpoint)
  }, [])
  
  return breakpoint
}
