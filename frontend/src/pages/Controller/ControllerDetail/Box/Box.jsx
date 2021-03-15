import React, { useState } from 'react'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import ParcelDot from './ParcelDot'
import InfoCard from './InfoCard'
import { getInfoValues, getReceiverValues } from './utils'
import { fetchBox } from '../../../../services/boxService'

function BoxDetail({ boxDetails }) {
  if (boxDetails && boxDetails.parcel && boxDetails.parcel.currentStatus) {
    return (
      <Grid container spacing={3}>
        <InfoCard title="Info" useKeysAsLabels topValues={getInfoValues(boxDetails)} />
        <InfoCard title="Receiver" {...getReceiverValues(boxDetails)} />
        <InfoCard title="Carrier" topValues={{ firstName: boxDetails.parcel.receiver.firstName }} />
      </Grid>
    )
  }

  return <Typography>No parcel attached</Typography>
}

function Box({ box }) {
  const [loading, setLoading] = useState(false)
  const [boxDetails, setBoxDetails] = useState(null)

  const fetchBoxData = async () => {
    setLoading(true)
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

export default Box
