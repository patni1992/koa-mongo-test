import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from './components/Header'
import ControllerList from './pages/Controller/ControllerList'

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/">
          <ControllerList />
        </Route>
      </Switch>
    </div>
  )
}

export default App
