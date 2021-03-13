import React from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  container: {
    marginTop: '100px'
  }
}))

function Controllers() {
  const { container } = useStyles()
  return (
    <Container className={container}>
      <div className="App">Controllers</div>
    </Container>
  )
}

export default Controllers
