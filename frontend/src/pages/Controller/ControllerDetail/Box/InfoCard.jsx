/* eslint-disable react/prop-types */
import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

const useStyles = makeStyles(() => ({
  card: {
    height: '100%'
  },
  label: {
    fontWeight: 300
  }
}))

function ValueList({ values, useKeysAsLabels }) {
  const { label } = useStyles()
  return Object.entries(values).map(([key, value]) => (
    <>
      {useKeysAsLabels && <span className={label}>{`${key}:`}</span>}
      <span> {value}</span>
      <br />
    </>
  ))
}

function InfoCard({ title, topValues, bottomValues, useKeysAsLabels = false }) {
  const { card } = useStyles()
  return (
    <Grid item xs={12} md={4}>
      <Card className={card}>
        <CardContent>
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
          <Typography>
            <ValueList values={topValues} useKeysAsLabels={useKeysAsLabels} />
            {bottomValues && (
              <>
                <hr />
                <ValueList values={bottomValues} useKeysAsLabels={useKeysAsLabels} />
              </>
            )}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default InfoCard
