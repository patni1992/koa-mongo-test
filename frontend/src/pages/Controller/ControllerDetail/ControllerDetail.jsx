import React, { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import { useParams } from 'react-router-dom'
import { fetchLocation } from '../../../services/locationService'
import Box from './Box'

function ControllerDetail() {
  const params = useParams()
  const [location, setLocation] = useState(null)
  useEffect(() => {
    fetchLocation(params.id).then((response) => {
      setLocation(response)
    })
  }, [])

  return <Container>{location && location.boxes.map((box) => <Box box={box} key={box.id} />)}</Container>
}

export default ControllerDetail
