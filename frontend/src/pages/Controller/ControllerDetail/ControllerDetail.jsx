import React from 'react'
import Container from '@material-ui/core/Container'
import { useParams } from 'react-router-dom'

function ControllerDetail() {
  const params = useParams()

  return <Container>controller show {params.id}</Container>
}

export default ControllerDetail
