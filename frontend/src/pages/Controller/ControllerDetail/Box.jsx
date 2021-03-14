/* eslint-disable react/prop-types */
import React, { useState } from 'react'

import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'

import CardContent from '@material-ui/core/CardContent'

import { fetchBox } from '../../../services/boxService'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  parcelDot: {
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    display: 'inline-block',
    marginLeft: '8px'
  },
  notAvailable: {
    backgroundColor: theme.palette.warning.main
  },
  available: {
    backgroundColor: theme.palette.success.main
  }
}))

function BoxDetail({ boxDetails }) {
  const classes = useStyles()

  if (boxDetails && boxDetails.parcel && boxDetails.parcel.currentStatus) {
    return (
      <Grid container spacing={3}>
        {/* <Typography>{boxDetails.parcel.currentStatus}</Typography> */}
        <Grid item xs={12} md={4}>
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h6" component="h2">
                Info
              </Typography>
              <Typography className={classes.title}>
                Status: {boxDetails.parcel.currentStatus}
                <br />
                {`Date: ${boxDetails.parcel.created}`}
                <br />
                {`Consumer collected: ${boxDetails.parcel.access.consumerCollect}`}
                <br />
                {`Driver delivered: ${boxDetails.parcel.access.driverDeliver}`}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h6" component="h2">
                Receiver
              </Typography>
              <Typography className={classes.title}>
                {boxDetails.parcel.receiver.firstName}
                <br />
                {boxDetails.parcel.receiver.lastName}
                <br />
                {boxDetails.parcel.receiver.phoneNumber}
                <br />
                {boxDetails.parcel.receiver.email}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h6" component="h2">
                Carrier
              </Typography>
              <Typography className={classes.title}>{boxDetails.parcel.receiver.firstName}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  }

  return <Typography>No parcel attached</Typography>
}

function ParcelDot({ hasParcel }) {
  const { parcelDot, notAvailable, available } = useStyles()

  return (
    <div style={{ display: 'inline-block' }}>
      <Box display="flex" alignItems="center">
        <span>{hasParcel ? 'Not Available' : 'Available'} </span>
        <div className={`${parcelDot} ${hasParcel ? notAvailable : available}`} />
      </Box>
    </div>
  )
}

function ControllerDetail({ box }) {
  const [loading, setLoading] = useState(false)
  const [boxDetails, setBoxDetails] = useState(null)

  const fetchBoxData = async () => {
    setLoading(true)
    // eslint-disable-next-line no-underscore-dangle
    const response = await fetchBox(box._id)

    setLoading(false)
    setBoxDetails(response)
  }

  return (
    <Accordion
      onChange={(e, isExpanded) => {
        if (isExpanded) {
          fetchBoxData()
        }
      }}
      key={box.id}>
      <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
        <Typography variant="h6" component="h2">
          Box {box.port} - <ParcelDot hasParcel={!!box.parcel} />
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{loading ? <CircularProgress /> : <BoxDetail boxDetails={boxDetails} />}</AccordionDetails>
    </Accordion>
  )
}

export default ControllerDetail
