import { Main, SideBar } from './components'
import { TypeWiseProvider } from './context'

export function App() {

  return (
    <TypeWiseProvider>
      <div>
        <SideBar />
        <Main />
      </div>
    </TypeWiseProvider>
  )
}

export default App
