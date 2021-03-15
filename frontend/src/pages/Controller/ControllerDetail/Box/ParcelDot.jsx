import Box from '@material-ui/core/Box'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
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

export default ParcelDot
