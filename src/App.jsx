import './App.css'
import Links from './pages/Links'
import { AppContextProvider } from './context/DateRangeContext'
function App() {
  return (
    <AppContextProvider>
      <Links />
    </AppContextProvider>
  )
}

export default App
