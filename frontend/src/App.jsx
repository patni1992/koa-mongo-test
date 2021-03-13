import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Header from './components/Header'
import ControllerList from './pages/Controller/ControllerList'
import ControllerDetail from './pages/Controller/ControllerDetail'

const useStyles = makeStyles(() => ({
  spaceTop: {
    marginTop: '100px'
  }
}))

function App() {
  const { spaceTop } = useStyles()
  return (
    <Box className="App">
      <Header />
      <Box className={spaceTop}>
        <Switch>
          <Route component={ControllerDetail} path="/controllers/:id" />
          <Route component={ControllerList} path="/controllers" />
          <Redirect from="/" to="/controllers" />
        </Switch>
      </Box>
    </Box>
  )
}

export default App
