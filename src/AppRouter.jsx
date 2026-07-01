import { useEffect, useState } from 'react'
import Admin from './Admin.jsx'
import App from './App.jsx'

export default function AppRouter() {
  const [route, setRoute] = useState(window.location.hash)

  useEffect(() => {
    const handleRoute = () => setRoute(window.location.hash)
    window.addEventListener('hashchange', handleRoute)
    return () => window.removeEventListener('hashchange', handleRoute)
  }, [])

  return route === '#admin' ? <Admin /> : <App />
}
