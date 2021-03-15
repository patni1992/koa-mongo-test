import React, { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
import { fetchLocations } from '../../../services/locationService'

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: 'none'
  },
  title: {
    fontSize: 14
  }
}))

const mapControllers = (locations) =>
  locations.flatMap((location) =>
    location.controllers
      ? location.controllers.map((controller) => ({
          ...controller,
          address: location.address
        }))
      : []
  )

function ControllerList() {
  const [controllers, setControllers] = useState([])

  useEffect(() => {
    fetchLocations().then((response) => {
      setControllers(mapControllers(response))
    })
  }, [])

  const { link } = useStyles()

  return (
    <Container>
      <Grid container spacing={3}>
        {controllers.map((row) => (
          <Grid key={row.controllerId} item xs={12} md={4}>
            <Link data-testid={`controller-link-${row.controllerId}`} className={link} to={`/controllers/${row.id}`}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {row.id || '-'}
                  </Typography>
                  <Typography color="textSecondary">
                    {row.address.street}
                    <br />
                    {row.address.city}
                    <br />
                    {row.address.zip}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default ControllerList
